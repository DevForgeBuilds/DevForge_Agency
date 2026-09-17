import gsap from 'gsap';
import type * as THREE from 'three';


/* ============================================================
   UTILITY
============================================================ */

/** Clamp a number between min and max. */
export const clamp = (
    value: number,
    min: number,
    max: number
): number =>
    Math.min(
        Math.max(
            value,
            min
        ),
        max
    );


/** Linear interpolation. */
export const lerp = (
    start: number,
    end: number,
    factor: number
): number =>
    start +
    (end - start) *
    factor;


/** Map a value from one range to another. */
export const mapRange = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number => {

    const t =
        (value - inMin) /
        (inMax - inMin);

    return (
        outMin +
        clamp(
            t,
            0,
            1
        ) *
        (
            outMax -
            outMin
        )
    );
};


/** Detect reduced-motion preference. */
export const prefersReducedMotion =
    (): boolean =>

        typeof window !== 'undefined' &&
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;


/* ============================================================
   SHAKE
============================================================ */

export interface ShakeOffset {

    x: number;

    y: number;
}


/* ============================================================
   THREE REFERENCES
============================================================ */

export interface Strike3DRefs {

    /**
     * Hammer group.
     *
     * Owned by strike timeline:
     * - rotation.z
     */
    hammer:
        THREE.Object3D | null;


    /**
     * Anvil group.
     *
     * Owned by strike timeline:
     * - scale
     */
    anvil:
        THREE.Object3D | null;


    /**
     * Real Three.js impact light.
     */
    impactLight:
        THREE.PointLight | null;


    /**
     * Mutable shake object.
     *
     * Camera render loop reads this value.
     */
    shake:
        ShakeOffset;


    /**
     * Hammer resting Y position.
     */
    hammerRestY:
        number;


    /**
     * Anvil impact Y position.
     */
    impactY:
        number;
}


/* ============================================================
   OPTIONS
============================================================ */

export interface Strike3DOptions {

    reduced:
        boolean;


    /**
     * Called exactly at impact.
     */
    onImpact:
        () => void;
}


/* ============================================================
   HAMMER STRIKE
============================================================ */

export const createStrike3DTimeline = (
    refs: Strike3DRefs,
    options: Strike3DOptions
): gsap.core.Timeline => {

    const {
        hammer,
        anvil,
        impactLight,
        shake,
    } = refs;


    const {
        reduced,
        onImpact,
    } = options;


    /*
     * IMPORTANT
     *
     * Every strike gets its own timeline.
     *
     * No ScrollTrigger is used here because this is
     * an interaction / 3D event timeline.
     */

    const tl =
        gsap.timeline({
            paused: true,
            defaults: {
                overwrite:
                    'auto',
            },
        });


    /* ========================================================
       REDUCED MOTION
    ======================================================== */

    if (reduced) {

        tl.call(
            onImpact
        );


        if (impactLight) {

            tl.to(
                impactLight,
                {
                    intensity:
                        6,

                    duration:
                        0.08,

                    ease:
                        'power2.out',
                }
            );


            tl.to(
                impactLight,
                {
                    intensity:
                        0,

                    duration:
                        0.4,

                    ease:
                        'power3.out',
                }
            );

        }


        return tl;
    }


    /* ========================================================
       NO HAMMER
    ======================================================== */

    if (!hammer) {

        return tl;

    }


    /* ========================================================
       REST STATE
    ======================================================== */

    gsap.set(
        hammer.rotation,
        {
            z:
                -0.73,
        }
    );


    if (anvil) {

        gsap.set(
            anvil.scale,
            {
                x: 1,
                y: 1,
                z: 1,
            }
        );

    }


    if (impactLight) {

        gsap.set(
            impactLight,
            {
                intensity:
                    0,
            }
        );

    }


    shake.x = 0;
    shake.y = 0;


    /* ========================================================
       01 — ANTICIPATION
    ======================================================== */

    tl.to(
        hammer.rotation,
        {
            z:
                -0.88,

            duration:
                0.22,

            ease:
                'power2.out',
        }
    );


    /* ========================================================
       02 — MICRO PAUSE
    ======================================================== */

    tl.to(
        {},
        {
            duration:
                0.06,
        }
    );


    /* ========================================================
       03 — MASSIVE CROSS SWING
    ======================================================== */

    tl.to(
        hammer.rotation,
        {
            z:
                0.02,

            duration:
                0.18,

            ease:
                'power4.in',
        }
    );


    /* ========================================================
       04 — IMPACT
    ======================================================== */

    tl.call(
        onImpact
    );


    /* ========================================================
       05 — IMPACT FLASH
    ======================================================== */

    if (impactLight) {

        tl.to(
            impactLight,
            {
                intensity:
                    8,

                duration:
                    0.045,

                ease:
                    'power2.out',
            },

            '<'
        );


        tl.to(
            impactLight,
            {
                intensity:
                    0,

                duration:
                    0.5,

                ease:
                    'power3.out',
            }
        );

    }


    /* ========================================================
       06 — FORGE / CAMERA SHAKE
    ======================================================== */

    tl.to(
        shake,
        {
            keyframes: [

                {
                    x:
                        -0.055,

                    y:
                        0.025,

                    duration:
                        0.04,
                },

                {
                    x:
                        0.06,

                    y:
                        -0.035,

                    duration:
                        0.045,
                },

                {
                    x:
                        -0.04,

                    y:
                        0.02,

                    duration:
                        0.05,
                },

                {
                    x:
                        0.025,

                    y:
                        -0.015,

                    duration:
                        0.055,
                },

                {
                    x:
                        -0.01,

                    y:
                        0.006,

                    duration:
                        0.06,
                },

                {
                    x:
                        0,

                    y:
                        0,

                    duration:
                        0.08,
                },
            ],

            ease:
                'power1.inOut',
        },

        '<'
    );


    /* ========================================================
       07 — ANVIL VIBRATION
    ======================================================== */

    if (anvil) {

        tl.to(
            anvil.scale,
            {
                x:
                    1.025,

                y:
                    0.975,

                z:
                    1.025,

                duration:
                    0.055,

                ease:
                    'power2.out',
            },

            '<'
        );


        tl.to(
            anvil.scale,
            {
                x:
                    1,

                y:
                    1,

                z:
                    1,

                duration:
                    0.38,

                ease:
                    'elastic.out(1, 0.55)',
            }
        );

    }


    /* ========================================================
       08 — HAMMER REBOUND
    ======================================================== */

    tl.to(
        hammer.rotation,
        {
            z:
                -0.16,

            duration:
                0.15,

            ease:
                'power2.out',
        },

        '<0.04'
    );


    /* ========================================================
       09 — HAMMER SETTLE
    ======================================================== */

    tl.to(
        hammer.rotation,
        {
            z:
                -0.73,

            duration:
                0.48,

            ease:
                'elastic.out(1, 0.55)',
        }
    );


    /* ========================================================
       10 — FINAL RESET
       
       Guarantees that tiny residual values don't accumulate
       across repeated strikes.
    ======================================================== */

    tl.to(
        shake,
        {
            x:
                0,

            y:
                0,

            duration:
                0.08,

            ease:
                'power2.out',
        }
    );


    return tl;
};


/* ============================================================
   DEVFORGE EASING
============================================================ */

export const easeDf =
    'cubic-bezier(0.16, 1, 0.3, 1)';
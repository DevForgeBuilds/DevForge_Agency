import gsap from 'gsap';

import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import ForgeAnvil from './ForgeAnvil';
import ForgeHammer, { HAMMER_IMPACT_Y, HAMMER_REST_Y } from './ForgeHammer';
import ForgeParticles, { type ForgeParticlesHandle } from './ForgeParticles';
import DigitalLines, { type DigitalLinesHandle } from './DigitalLines';
import DigitalProduct, { type DigitalProductHandle } from './DigitalProduct';
import { createStrike3DTimeline, lerp, type ShakeOffset } from '../../animations/heroAnimation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useViewportTier, type ViewportTier } from '../../hooks/useViewportTier';
import './ForgeScene.css';

export interface ForgeSceneHandle {
    strike: () => void;
    setScroll: (progress: number) => void;
}

const IMPACT_ORIGIN: [number, number, number] = [0, 0.05, 0.1];
const DIGITAL_PRODUCT_POSITION: [number, number, number] = [1.05, 1.35, -0.5];
const LINE_TARGETS: Array<[number, number, number]> = [
    [0.55, 0.55, -0.05],
    [0.75, 0.85, -0.2],
    [0.9, 1.05, -0.35],
    [0.35, 0.3, 0.1],
    [1.05, 1.25, -0.45],
];

/** Sets opacity/transparent on every material in a group's mesh subtree. */
const setGroupOpacity = (group: THREE.Object3D | null, opacity: number) => {
    if (!group) return;
    group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            const mat = child.material as THREE.Material & { opacity?: number };
            if (mat && typeof mat.opacity === 'number') {
                mat.transparent = true;
                mat.opacity = opacity;
            }
        }
    });
};

interface SceneContentProps {
    reduced: boolean;
    tier: ViewportTier;
    pointer: React.RefObject<{ x: number; y: number }>;
    onLabelChange: (label: string) => void;
}

export interface SceneContentHandle {
    strike: () => void;
    setScroll: (p: number) => void;
}

const SceneContent = forwardRef<SceneContentHandle, SceneContentProps>(
    ({ reduced, tier, pointer, onLabelChange }, ref) => {
        const { camera } = useThree();
        const rigRef = useRef<THREE.Group>(null);
        const anvilRef = useRef<THREE.Group>(null);
        const hammerRef = useRef<THREE.Group>(null);
        const sceneGroupRef = useRef<THREE.Group>(null);
        const digitalGroupRef = useRef<THREE.Group>(null);
        const impactLightRef = useRef<THREE.PointLight>(null);
        const particlesRef = useRef<ForgeParticlesHandle>(null);
        const linesRef = useRef<DigitalLinesHandle>(null);
        const digitalProductRef = useRef<DigitalProductHandle>(null);

        const smoothedPointer = useRef({ x: 0, y: 0 });
        const shake = useRef<ShakeOffset>({ x: 0, y: 0 });
        const scrollProgress = useRef(0);
        const smoothedScroll = useRef(0);
        const strikeTl = useRef<gsap.core.Timeline | null>(null);

        const strike = useCallback(() => {
            strikeTl.current?.kill();
            strikeTl.current = createStrike3DTimeline(
                {
                    hammer: hammerRef.current,
                    anvil: anvilRef.current,
                    impactLight: impactLightRef.current,
                    shake: shake.current,
                    hammerRestY: HAMMER_REST_Y,
                    impactY: HAMMER_IMPACT_Y,
                },
                {
                    reduced,
                    onImpact: () => {
                        particlesRef.current?.burst();
                        linesRef.current?.draw();
                        digitalProductRef.current?.reveal();
                        onLabelChange('Forged →');
                    },
                }
            );
        }, [reduced, onLabelChange]);

        useImperativeHandle(
            ref,
            () => ({
                strike,
                setScroll: (p: number) => {
                    scrollProgress.current = p;
                },
            }),
            [strike]
        );

        useFrame((_state, _delta) => {
            // Mouse parallax — this rig contains only the camera, so rotating it
            // orbits the camera around the anvil (the fixed visual anchor) rather
            // than moving the world. Never touches position, so it never fights
            // the GSAP-driven shake offset (position) below.
            if (!reduced && tier !== 'mobile' && rigRef.current) {
                smoothedPointer.current.x = lerp(smoothedPointer.current.x, pointer.current.x, 0.06);
                smoothedPointer.current.y = lerp(smoothedPointer.current.y, pointer.current.y, 0.06);
                const { x, y } = smoothedPointer.current;

                rigRef.current.rotation.y = x * THREE.MathUtils.degToRad(6);
                rigRef.current.rotation.x = -y * THREE.MathUtils.degToRad(4);

                if (hammerRef.current) {
                    hammerRef.current.position.x = x * 0.09;
                }
                if (digitalGroupRef.current) {
                    digitalGroupRef.current.position.x = DIGITAL_PRODUCT_POSITION[0] - x * 0.14;
                    digitalGroupRef.current.position.y = DIGITAL_PRODUCT_POSITION[1] - y * 0.08;
                }
            }

            // Shake offset — a plain data object GSAP tweens; applied here so it
            // never collides with the rotation-only parallax above.
            if (rigRef.current) {
                rigRef.current.position.x = shake.current.x;
                rigRef.current.position.y = shake.current.y;
            }

            // Scroll-driven cinematic zoom: dolly the camera in, grow the digital
            // product toward the viewer, and fade the physical forge back.
            smoothedScroll.current = lerp(smoothedScroll.current, scrollProgress.current, 0.08);
            const p = smoothedScroll.current;

            camera.position.z = lerp(4.6, 2.4, Math.min(p * 1.3, 1));
            camera.position.y = lerp(0.5, 0.85, p);

            if (digitalGroupRef.current) {
                const scale = lerp(1, 2.3, Math.pow(p, 1.4));
                digitalGroupRef.current.scale.setScalar(scale);
            }

            if (sceneGroupRef.current) {
                const opacity = lerp(1, 0.15, Math.min(p * 1.6, 1));
                setGroupOpacity(sceneGroupRef.current, opacity);
            }
        });

        return (
            <>
                <group ref={rigRef}>
                    <PerspectiveCamera makeDefault fov={40} position={[0, 0.5, 4.6]} />
                </group>

                <ambientLight intensity={0.55} color="#f5f3ec" />
                <directionalLight position={[2.5, 3.5, 2]} intensity={1.1} color="#fff3df" castShadow={false} />
                <pointLight position={[-1.8, 1.2, -1]} intensity={0.35} color="#9fd331" />
                <pointLight
                    ref={impactLightRef}
                    position={IMPACT_ORIGIN}
                    intensity={0}
                    distance={3.5}
                    color="#ff8a24"
                />

                <group ref={sceneGroupRef}>
                    <ForgeAnvil ref={anvilRef} />
                    <ForgeHammer ref={hammerRef} />
                </group>

                <ForgeParticles
                    ref={particlesRef}
                    tier={tier}
                    reduced={reduced}
                    origin={IMPACT_ORIGIN}
                    target={DIGITAL_PRODUCT_POSITION}
                />

                <DigitalLines ref={linesRef} origin={IMPACT_ORIGIN} targets={LINE_TARGETS} reduced={reduced} />

                <group ref={digitalGroupRef} position={DIGITAL_PRODUCT_POSITION}>
                    <DigitalProduct ref={digitalProductRef} position={[0, 0, 0]} reduced={reduced} />
                </group>
            </>
        );
    }
);

SceneContent.displayName = 'SceneContent';

const ForgeScene = forwardRef<ForgeSceneHandle>((_props, ref) => {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const innerRef = useRef<SceneContentHandle>(null);
    const pointer = useRef({ x: 0, y: 0 });
    const [label, setLabel] = useState('Click to forge →');
    const reduced = useReducedMotion();
    const tier = useViewportTier();

    const dpr = useMemo<[number, number]>(() => (tier === 'desktop' ? [1, 1.75] : [1, 1.3]), [tier]);

    useImperativeHandle(
        ref,
        () => ({
            strike: () => innerRef.current?.strike(),
            setScroll: (p: number) => innerRef.current?.setScroll(p),
        }),
        []
    );

    const handleStrike = useCallback(() => {
        innerRef.current?.strike();
    }, []);

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (reduced || tier === 'mobile') return;
        const bounds = wrapRef.current?.getBoundingClientRect();
        if (!bounds) return;
        pointer.current.x = ((e.clientX - bounds.left) / bounds.width - 0.5) * 2;
        pointer.current.y = ((e.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };

    useEffect(() => {
        if (reduced) setLabel('Forged →');
    }, [reduced]);

    return (
        <div
            ref={wrapRef}
            className="forge-scene"
            onPointerMove={handlePointerMove}
            onClick={handleStrike}
            role="button"
            tabIndex={0}
            aria-label="Strike the forge to see DevForge build a digital product"
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStrike();
                }
            }}
        >
            <Canvas
                dpr={dpr}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                style={{ pointerEvents: 'none' }}
            >
                <SceneContent
                    ref={innerRef}
                    reduced={reduced}
                    tier={tier}
                    pointer={pointer}
                    onLabelChange={setLabel}
                />
            </Canvas>
            <span className="forge-scene__hint df-eyebrow">{label}</span>
        </div>
    );
});

ForgeScene.displayName = 'ForgeScene';

export default ForgeScene;
import { forwardRef, useImperativeHandle, useMemo } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

const SAMPLES = 22;
const LIME = '#b7f34a';

export interface DigitalLinesHandle {
    draw: () => void;
}

interface DigitalLinesProps {
    origin: [number, number, number];
    targets: Array<[number, number, number]>;
    reduced: boolean;
}

interface LineRefBundle {
    geometry: THREE.BufferGeometry;
    material: THREE.LineBasicMaterial;
    object: THREE.Line;
}

/**
 * Each connection line is a pre-sampled curve from the impact point toward
 * a point near the digital product. "Drawing" is implemented by animating
 * the geometry's drawRange with GSAP, rather than a shader — simple, cheap,
 * and easy to reason about for a handful of short-lived lines.
 *
 * Built with `new THREE.Line(...)` + `<primitive>` rather than the JSX
 * `<line>` intrinsic — the latter collides with React DOM's SVG `<line>`
 * type when both are in scope, which breaks ref typing.
 */
const DigitalLines = forwardRef<DigitalLinesHandle, DigitalLinesProps>(
    ({ origin, targets, reduced }, ref) => {
        const bundles = useMemo<LineRefBundle[]>(() => {
            const start = new THREE.Vector3(...origin);
            return targets.map((t) => {
                const end = new THREE.Vector3(...t);
                const mid = start
                    .clone()
                    .lerp(end, 0.5)
                    .add(new THREE.Vector3(0, 0.35 + Math.random() * 0.25, 0.1));
                const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
                const points = curve.getPoints(SAMPLES - 1);

                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                geometry.setDrawRange(0, 0);
                const material = new THREE.LineBasicMaterial({
                    color: LIME,
                    transparent: true,
                    opacity: 0,
                    toneMapped: false,
                });
                const object = new THREE.Line(geometry, material);
                return { geometry, material, object };
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [origin, targets]);

        useImperativeHandle(
            ref,
            () => ({
                draw: () => {
                    bundles.forEach(({ geometry, material }, i) => {
                        geometry.setDrawRange(0, 0);
                        material.opacity = 0;
                        const progress = { n: 0 };
                        const delay = reduced ? 0 : i * 0.045;

                        gsap
                            .timeline({ delay })
                            .set(material, { opacity: 1 })
                            .to(progress, {
                                n: SAMPLES,
                                duration: reduced ? 0.25 : 0.42,
                                ease: 'power2.out',
                                onUpdate: () => {
                                    geometry.setDrawRange(0, Math.floor(progress.n));
                                },
                            })
                            .to(material, { opacity: 0, duration: 0.7, ease: 'power2.in' }, '+=0.5');
                    });
                },
            }),
            [reduced, bundles]
        );

        return (
            <group>
                {bundles.map((bundle, i) => (
                    <primitive key={i} object={bundle.object} />
                ))}
            </group>
        );
    }
);

DigitalLines.displayName = 'DigitalLines';

export default DigitalLines;
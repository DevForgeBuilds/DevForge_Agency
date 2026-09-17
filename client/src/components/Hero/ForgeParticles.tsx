import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ViewportTier } from '../../hooks/useViewportTier';

interface Particle {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    life: number;
    maxLife: number;
    size: number;
    kind: 'spark' | 'digital';
    target?: THREE.Vector3;
}

const SPARK_HOT = new THREE.Color('#ffe3a8');
const SPARK_ORANGE = new THREE.Color('#ff8a24');
const LIME_2 = new THREE.Color('#9fd331');
const LIME = new THREE.Color('#c7ff6e');

const COUNTS: Record<ViewportTier, { sparks: number; digital: number }> = {
    desktop: { sparks: 90, digital: 46 },
    tablet: { sparks: 54, digital: 26 },
    mobile: { sparks: 26, digital: 12 },
};

export interface ForgeParticlesHandle {
    burst: () => void;
}

interface ForgeParticlesProps {
    tier: ViewportTier;
    reduced: boolean;
    origin: [number, number, number];
    target: [number, number, number];
}

/**
 * Two particle behaviors sharing one buffer:
 * - "spark": fast, chaotic, gravity-affected, orange → cooling to a dull ember.
 * - "digital": slower, drifts in a controlled arc toward the digital product,
 *   transitioning from orange to lime as it "becomes" digital energy.
 */
const ForgeParticles = forwardRef<ForgeParticlesHandle, ForgeParticlesProps>(
    ({ tier, reduced, origin, target }, ref) => {
        const geometryRef = useRef<THREE.BufferGeometry | null>(null);
        const particles = useRef<Particle[]>([]);
        const targetVec = useMemo(() => new THREE.Vector3(...target), [target]);
        const originVec = useMemo(() => new THREE.Vector3(...origin), [origin]);

        const counts = COUNTS[tier];
        const total = counts.sparks + counts.digital;

        const { positions, colors, sizes } = useMemo(
            () => ({
                positions: new Float32Array(total * 3),
                colors: new Float32Array(total * 3),
                sizes: new Float32Array(total),
            }),
            [total]
        );

        useEffect(() => {
            const list: Particle[] = [];
            for (let i = 0; i < total; i++) {
                list.push({
                    x: origin[0],
                    y: origin[1],
                    z: origin[2],
                    vx: 0,
                    vy: 0,
                    vz: 0,
                    life: 0,
                    maxLife: 0,
                    size: 0,
                    kind: i < counts.sparks ? 'spark' : 'digital',
                });
            }
            particles.current = list;
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [tier]);

        useImperativeHandle(
            ref,
            () => ({
                burst: () => {
                    const list = particles.current;
                    const sparkCount = reduced ? Math.round(counts.sparks * 0.4) : counts.sparks;
                    const digitalCount = reduced ? Math.round(counts.digital * 0.4) : counts.digital;

                    list.forEach((p, i) => {
                        const isSpark = p.kind === 'spark';
                        const activeCount = isSpark ? sparkCount : digitalCount;
                        const localIndex = isSpark ? i : i - counts.sparks;

                        if (localIndex >= activeCount) {
                            p.life = 0;
                            return;
                        }

                        p.x = origin[0];
                        p.y = origin[1];
                        p.z = origin[2];

                        if (isSpark) {
                            const angle = Math.random() * Math.PI * 2;
                            const spread = Math.random() * Math.PI * 0.5;
                            const speed = 1.1 + Math.random() * 1.8;
                            p.vx = Math.cos(angle) * Math.sin(spread) * speed;
                            p.vy = Math.abs(Math.cos(spread)) * speed * 1.3 + 0.4;
                            p.vz = Math.sin(angle) * Math.sin(spread) * speed;
                            p.maxLife = 0.5 + Math.random() * 0.5;
                            p.size = 0.045 + Math.random() * 0.05;
                        } else {
                            const dir = targetVec.clone().sub(originVec);
                            dir.x += THREE.MathUtils.randFloatSpread(1.1);
                            dir.y += THREE.MathUtils.randFloatSpread(0.6) + 0.3;
                            dir.z += THREE.MathUtils.randFloatSpread(1.1);
                            dir.normalize();
                            const speed = 0.9 + Math.random() * 0.7;
                            p.vx = dir.x * speed;
                            p.vy = dir.y * speed + 0.5;
                            p.vz = dir.z * speed;
                            p.maxLife = 1.1 + Math.random() * 0.7;
                            p.size = 0.035 + Math.random() * 0.04;
                        }

                        p.life = p.maxLife;
                    });
                },
            }),
            [reduced, counts, origin, targetVec, originVec]
        );

        useFrame((_, delta) => {
            const list = particles.current;
            const geo = geometryRef.current;
            if (!geo || !list.length) return;
            const dt = Math.min(delta, 0.05);

            for (let i = 0; i < list.length; i++) {
                const p = list[i];
                const idx = i * 3;

                if (p.life > 0) {
                    if (p.kind === 'spark') {
                        p.vy -= 2.6 * dt; // gravity
                        p.vx *= 0.98;
                        p.vz *= 0.98;
                    } else {
                        // gentle easing toward the digital product, geometric not chaotic
                        p.vx *= 0.99;
                        p.vz *= 0.99;
                        p.vy -= 0.15 * dt;
                    }

                    p.x += p.vx * dt;
                    p.y += p.vy * dt;
                    p.z += p.vz * dt;
                    p.life -= dt;

                    const t = 1 - Math.max(p.life, 0) / p.maxLife;
                    const fade = Math.max(p.life, 0) / p.maxLife;

                    const col =
                        p.kind === 'spark'
                            ? SPARK_HOT.clone().lerp(SPARK_ORANGE, Math.min(1, t * 1.6))
                            : SPARK_ORANGE.clone().lerp(t < 0.4 ? LIME_2 : LIME, Math.min(1, t * 1.3));

                    positions[idx] = p.x;
                    positions[idx + 1] = p.y;
                    positions[idx + 2] = p.z;
                    colors[idx] = col.r;
                    colors[idx + 1] = col.g;
                    colors[idx + 2] = col.b;
                    sizes[i] = p.size * (0.35 + fade * 0.65);
                } else {
                    sizes[i] = 0;
                }
            }

            geo.attributes.position.needsUpdate = true;
            geo.attributes.color.needsUpdate = true;
            geo.attributes.size.needsUpdate = true;
        });

        return (
            <points frustumCulled={false}>
                <bufferGeometry ref={geometryRef}>
                    <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                    <bufferAttribute attach="attributes-color" args={[colors, 3]} />
                    <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
                </bufferGeometry>
                <pointsMaterial
                    vertexColors
                    size={0.06}
                    sizeAttenuation
                    transparent
                    opacity={0.95}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        );
    }
);

ForgeParticles.displayName = 'ForgeParticles';

export default ForgeParticles;
import { forwardRef } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

const HEAD_COLOR = '#20262a';
const FACE_COLOR = '#2a322d';
const HANDLE_COLOR = '#3a2c22';
const COLLAR_COLOR = '#171d18';

export const HAMMER_REST_Y = 1.0;
export const HAMMER_IMPACT_Y = 0.02;

/**
 * The forwarded group is the HAMMER PIVOT.
 *
 * The pivot sits near the top of the handle.
 * The hammer head is positioned below it, so rotation.z creates
 * a real cross-body swinging motion instead of a vertical drop.
 */
const ForgeHammer = forwardRef<THREE.Group>((_props, ref) => {
    return (
        <group
            ref={ref}
            position={[0, HAMMER_REST_Y, 0.12]}
            rotation={[0, 0, -0.58]}
        >
            {/* Hammer body is offset from the pivot */}
            <group position={[0, -0.67, 0]}>
                {/* Handle */}
                <mesh
                    position={[0, 0.67, 0]}
                    castShadow
                >
                    <cylinderGeometry
                        args={[0.045, 0.065, 1.35, 16]}
                    />

                    <meshStandardMaterial
                        color={HANDLE_COLOR}
                        roughness={0.72}
                        metalness={0.05}
                    />
                </mesh>

                {/* Grip */}
                <mesh
                    position={[0, 0.25, 0]}
                    castShadow
                >
                    <cylinderGeometry
                        args={[0.052, 0.052, 0.38, 16]}
                    />

                    <meshStandardMaterial
                        color="#2d2119"
                        roughness={0.82}
                        metalness={0.03}
                    />
                </mesh>

                {/* Metal collar */}
                <mesh
                    position={[0, 0.12, 0]}
                    castShadow
                >
                    <cylinderGeometry
                        args={[0.095, 0.085, 0.12, 16]}
                    />

                    <meshStandardMaterial
                        color={COLLAR_COLOR}
                        metalness={0.78}
                        roughness={0.35}
                    />
                </mesh>

                {/* Main hammer head */}
                <RoundedBox
                    args={[0.72, 0.34, 0.38]}
                    radius={0.07}
                    smoothness={5}
                    position={[0, 0, 0]}
                    castShadow
                    receiveShadow
                >
                    <meshStandardMaterial
                        color={HEAD_COLOR}
                        metalness={0.88}
                        roughness={0.28}
                    />
                </RoundedBox>

                {/* Left striking face */}
                <mesh
                    position={[-0.39, 0, 0]}
                    rotation={[0, 0, Math.PI / 2]}
                    castShadow
                >
                    <cylinderGeometry
                        args={[0.135, 0.15, 0.12, 16]}
                    />

                    <meshStandardMaterial
                        color={FACE_COLOR}
                        metalness={0.92}
                        roughness={0.22}
                    />
                </mesh>

                {/* Right striking face */}
                <mesh
                    position={[0.39, 0, 0]}
                    rotation={[0, 0, Math.PI / 2]}
                    castShadow
                >
                    <cylinderGeometry
                        args={[0.135, 0.15, 0.12, 16]}
                    />

                    <meshStandardMaterial
                        color={FACE_COLOR}
                        metalness={0.92}
                        roughness={0.22}
                    />
                </mesh>
            </group>
        </group>
    );
});

ForgeHammer.displayName = 'ForgeHammer';

export default ForgeHammer;
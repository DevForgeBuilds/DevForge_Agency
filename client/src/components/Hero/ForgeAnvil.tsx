import { forwardRef } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

const METAL_COLOR = '#171d18';
const TOP_COLOR = '#202a23';
const EDGE_COLOR = '#9fd331';

const ForgeAnvil = forwardRef<THREE.Group>((_props, ref) => {
    return (
        <group ref={ref} position={[0, -1.37, 0]}>
            {/* Heavy base */}
            <RoundedBox
                args={[2.05, 0.34, 1.22]}
                radius={0.08}
                smoothness={4}
                position={[0, 0.17, 0]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    color={METAL_COLOR}
                    metalness={0.82}
                    roughness={0.38}
                />
            </RoundedBox>

            {/* Left/right base feet */}
            <RoundedBox
                args={[0.48, 0.18, 1.08]}
                radius={0.06}
                smoothness={3}
                position={[-0.62, 0.42, 0]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    color={METAL_COLOR}
                    metalness={0.78}
                    roughness={0.42}
                />
            </RoundedBox>

            <RoundedBox
                args={[0.48, 0.18, 1.08]}
                radius={0.06}
                smoothness={3}
                position={[0.62, 0.42, 0]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    color={METAL_COLOR}
                    metalness={0.78}
                    roughness={0.42}
                />
            </RoundedBox>

            {/* Forged waist */}
            <mesh
                position={[0, 0.7, 0]}
                scale={[1.08, 1, 0.88]}
                castShadow
                receiveShadow
            >
                <cylinderGeometry args={[0.43, 0.62, 0.68, 16]} />
                <meshStandardMaterial
                    color={METAL_COLOR}
                    metalness={0.84}
                    roughness={0.36}
                />
            </mesh>

            {/* Main shoulder/body */}
            <RoundedBox
                args={[1.58, 0.44, 0.96]}
                radius={0.07}
                smoothness={4}
                position={[0, 1.08, 0]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    color={METAL_COLOR}
                    metalness={0.84}
                    roughness={0.32}
                />
            </RoundedBox>

            {/* Striking plate */}
            <RoundedBox
                args={[1.72, 0.13, 1.05]}
                radius={0.035}
                smoothness={4}
                position={[0, 1.34, 0]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    color={TOP_COLOR}
                    metalness={0.9}
                    roughness={0.24}
                />
            </RoundedBox>

            {/* Horn */}
            <mesh
                position={[0.98, 1.16, 0]}
                rotation={[0, 0, -Math.PI / 2]}
                scale={[1, 0.92, 1]}
                castShadow
                receiveShadow
            >
                <coneGeometry args={[0.29, 0.9, 20]} />
                <meshStandardMaterial
                    color={METAL_COLOR}
                    metalness={0.84}
                    roughness={0.3}
                />
            </mesh>

            {/* Subtle digital rim */}
            <RoundedBox
                args={[1.7, 0.018, 1.035]}
                radius={0.025}
                smoothness={3}
                position={[0, 1.415, 0]}
            >
                <meshStandardMaterial
                    color={EDGE_COLOR}
                    emissive={EDGE_COLOR}
                    emissiveIntensity={0.22}
                    metalness={0.15}
                    roughness={0.5}
                    transparent
                    opacity={0.55}
                />
            </RoundedBox>
        </group>
    );
});

ForgeAnvil.displayName = 'ForgeAnvil';

export default ForgeAnvil;
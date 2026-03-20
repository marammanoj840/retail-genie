import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Interactive } from '@react-three/xr';
import { Text, Image, RoundedBox, Html } from '@react-three/drei';

export default function Product3DCard({ position, rotation, product, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
    }
  });

  return (
    <Interactive
      onSelect={() => onSelect(product)}
      onHover={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <group ref={groupRef} position={position} rotation={rotation}>
        {/* Card Background */}
        <RoundedBox args={[1.5, 2.2, 0.1]} radius={0.05} receiveShadow castShadow>
          <meshStandardMaterial color={hovered ? "#4648d4" : "#ffffff"} roughness={0.2} metalness={0.1} />
        </RoundedBox>

        {/* Product Image placeholder - using a generic URL or color if url fails */}
        {product.imageUrl ? (
          <Image url={product.imageUrl} position={[0, 0.3, 0.06]} scale={[1.3, 1.3]} />
        ) : (
          <mesh position={[0, 0.3, 0.06]}>
            <planeGeometry args={[1.3, 1.3]} />
            <meshStandardMaterial color="#e0e3e5" />
          </mesh>
        )}

        {/* Product Details */}
        <Text
          position={[0, -0.6, 0.06]}
          fontSize={0.12}
          color={hovered ? "white" : "#191c1e"}
          anchorX="center"
          maxWidth={1.3}
          font="https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRgguxz-ZjwA.woff"
        >
          {product.name}
        </Text>
        
        <Text
          position={[0, -0.85, 0.06]}
          fontSize={0.14}
          color={hovered ? "#c0c1ff" : "#4648d4"}
          anchorX="center"
          fontWeight="bold"
        >
          ${product.price.toFixed(2)}
        </Text>

        {/* Add to Cart Button */}
        <group position={[0, -1.05, 0.06]}>
          <RoundedBox args={[0.8, 0.2, 0.02]} radius={0.05}>
            <meshStandardMaterial color={hovered ? "white" : "#4648d4"} />
          </RoundedBox>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.08}
            color={hovered ? "#4648d4" : "white"}
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            ADD TO CART
          </Text>
        </group>
      </group>
    </Interactive>
  );
}

'use client';

import { Text } from "@react-three/drei";

import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import CloudContainer from "./models/Cloud";
import WindowModel from "./models/WindowModel";
import TextWindow from "./TextWindow";

const Hero = () => {
  const titleRef1 = useRef<THREE.Mesh>(null);
  const titleRef2 = useRef<THREE.Mesh>(null);
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      // First text animation
      if (titleRef1.current) {
        // Set initial opacity
        if (titleRef1.current.material) {
          (titleRef1.current.material as THREE.Material).opacity = 0;
          (titleRef1.current.material as THREE.Material).transparent = true;
        }
        
        gsap.fromTo(titleRef1.current.position, {
          y: -10,
        }, {
          y: 2,
          duration: 1.5,
          ease: "power2.out"
        });
        
        if (titleRef1.current.material) {
          gsap.to(titleRef1.current.material, {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out"
          });
        }
      }

      // Second text animation (starts after first one)
      if (titleRef2.current) {
        // Set initial opacity
        if (titleRef2.current.material) {
          (titleRef2.current.material as THREE.Material).opacity = 0;
          (titleRef2.current.material as THREE.Material).transparent = true;
        }
        
        gsap.fromTo(titleRef2.current.position, {
          y: -10,
        }, {
          y: 0,
          duration: 1.5,
          delay: 1.5,
          ease: "power2.out"
        });
        
        if (titleRef2.current.material) {
          gsap.to(titleRef2.current.material, {
            opacity: 1,
            duration: 1.5,
            delay: 1.5,
            ease: "power2.out"
          });
        }
      }
    }
  }, [progress]);

  const fontProps = {
    font: "./soria-font.ttf",
    fontSize: 1.2,
  };

  return (
    <>
      <Text position={[0, 2, -10]} color="#ef882b" {...fontProps} ref={titleRef1}>
        Hi, I am Ranjith.T.
      </Text>
      <Text position={[0, 0, -10]} color="#ef882b" {...fontProps} ref={titleRef2}>
        Software Engineer...😎
      </Text>
      <CloudContainer />
      <group position={[0, -25, 5.69]}>
        <pointLight castShadow position={[1, 1, -2.5]} intensity={60} distance={10} />
        <WindowModel receiveShadow />
        <TextWindow />
      </group>
    </>
  );
};

export default Hero;

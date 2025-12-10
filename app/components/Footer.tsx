import { Text, useCursor, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FOOTER_LINKS } from "../constants";
import { FooterLink } from "../types";

const FooterLinkItem = ({ link, fontSize }: { link: FooterLink; fontSize: number }) => {
  const textRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const onPointerOver = () => setHovered(true);
  const onPointerOut = () => setHovered(false);
  const fontProps = {
    font: "./Vercetti-Regular.woff",
    fontSize: fontSize,
    color: 'white',
    onPointerOver,
    onPointerOut,
    onClick: () => window.open(link.url, '_blank'),
  };

  useEffect(() => {
    gsap.to(textRef.current, {
      letterSpacing: hovered ? 0.3 : 0,
      duration: 0.3,
    });
  }, [hovered]);

  useCursor(hovered);

  return (
    <Text ref={textRef} {...fontProps} >
      {link.name.toUpperCase()}
    </Text>
  )
}

const Footer = () => {
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
  });

  // Effect to update dimensions on window resize
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame(() => {
    const d = data.range(0.8, 0.2);
    if (groupRef.current) {
      groupRef.current.visible = d > 0;
    }
  });

  // Calculate responsive values based on screen width
  const getResponsiveValues = () => {
    const width = windowSize.width;
    
    // Mobile: < 640px
    if (width < 640) {
      return {
        spacing: 0.9,
        startPosition: -1.5,
        scale: 0.75,
        fontSize: 0.15,
      };
    }
    // Small tablet: 640px - 768px
    else if (width < 768) {
      return {
        spacing: 1.1,
        startPosition: -2,
        scale: 0.85,
        fontSize: 0.17,
      };
    }
    // Tablet: 768px - 1024px
    else if (width < 1024) {
      return {
        spacing: 1.5,
        startPosition: -3,
        scale: 0.9,
        fontSize: 0.18,
      };
    }
    // Desktop: 1024px - 1440px
    else if (width < 1440) {
      return {
        spacing: 1.8,
        startPosition: -3.5,
        scale: 0.95,
        fontSize: 0.19,
      };
    }
    // Large desktop: >= 1440px
    else {
      return {
        spacing: 2,
        startPosition: -4,
        scale: 1,
        fontSize: 0.2,
      };
    }
  };

  const responsiveValues = getResponsiveValues();

  const getLinks = () => {
    return FOOTER_LINKS.map((link, i) => {
      return (
        <group key={i} position={[i * responsiveValues.spacing, 0, 0]}>
          <FooterLinkItem link={link} fontSize={responsiveValues.fontSize}/>
        </group>
      );
    });
  };

  return (
    <group position={[0, -44, 18]} rotation={[-Math.PI / 2, 0, 0]} ref={groupRef}>
      <group position={[responsiveValues.startPosition, 0, 0]} scale={responsiveValues.scale}>
        { getLinks() }
      </group>
    </group>
  );
};

export default Footer;
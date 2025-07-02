import React, { useEffect, useRef } from "react";
import homeLayer1 from '@assets/client/images/home/home-layer-1_v2.webp';
import homeLayer2 from '@assets/client/images/home/home-layer-2_v2.webp';
import homeLayer3 from '@assets/client/images/home/home-layer-3_v2.webp';
import homeLayer4 from '@assets/client/images/home/home-layer-4_v2.webp';
import homeLayer5 from '@assets/client/images/home/home-layer-5_v2.webp';

export default function HeroBanner() {
  const containerRef = useRef(null);
  const layer4Ref = useRef(null);
  const layer5Ref = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const animFrame = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;
      mouse.current.x = (e.clientX - centerX) / centerX;
      mouse.current.y = (e.clientY - centerY) / centerY;
    };

    const animate = () => {
      if (layer4Ref.current) {
        layer4Ref.current.style.transform = `translateX(${mouse.current.x * 30}px)`;
      }
      if (layer5Ref.current) {
        layer5Ref.current.style.transform = `translateX(${-mouse.current.x * 30}px)`;
      }
      animFrame.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animFrame.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-banner-section"
    >
      <img
        src={homeLayer1}
        alt="Layer 1"
        className="layer hero-banner-img animate-layer-1"
        style={{ zIndex: 1, position: 'absolute', left: 0, top: 0 }}
      />
      <img
        src={homeLayer2}
        alt="Layer 2"
        className="layer hero-banner-img animate-layer-2"
        style={{ zIndex: 2, position: 'absolute', left: 0, top: 0 }}
      />
      <img
        src={homeLayer3}
        alt="Layer 3"
        className="layer hero-banner-img"
        style={{ zIndex: 3, position: 'absolute', left: 0, top: 0 }}
      />
      <img
        ref={layer4Ref}
        src={homeLayer4}
        alt="Layer 4"
        className="layer hero-banner-img"
        style={{ zIndex: 4, position: 'absolute', left: 0, top: 0 }}
      />
      <img
        ref={layer5Ref}
        src={homeLayer5}
        alt="Layer 5"
        className="layer hero-banner-img"
        style={{ zIndex: 5, position: 'absolute', left: 0, top: 0 }}
      />
    </div>
  );
}

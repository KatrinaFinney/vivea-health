// src/components/AnimatedGradientBackground.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedGradientBackground = ({ children }) => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    // Animate the CSS variables for the gradient colors
    gsap.to(backgroundRef.current, {
      duration: 8,
      "--color1": "#665191", // new color for the first stop
      "--color2": "#a05195", // new color for the second stop
      ease: "power1.inOut",
      repeat: -1,  // Loop indefinitely
      yoyo: true,  // Reverse animation on each cycle
    });
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="w-full h-screen flex items-center justify-center"
      style={{
        // Use CSS variables with fallback colors to define the gradient
        background: "linear-gradient(45deg, var(--color1, #003f5c), var(--color2, #2f4b7c))",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedGradientBackground;

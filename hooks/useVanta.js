import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.cells.min';

export const useVanta = () => {
  const [vantaEffect, setVantaEffect] = useState(undefined);
  const vantaRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          color1: '#14394F',
          color2: '#113144',
          size: 0.5,
          speed: 0.7,
        })
      );
    }
  }, [vantaEffect]);
  return {
    vantaRef,
  };
};

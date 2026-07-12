'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQuery.matches && !motionQuery.matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEnabled(true);
    }

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) {
        setVisible(true);
        document.documentElement.style.cursor = 'none';
      }
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-hoverable="true"]')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    // Restore pointer when mouse leaves browser window
    const onMouseLeaveWindow = () => {
      setVisible(false);
      document.documentElement.style.cursor = '';
    };

    // Restore pointer when tab loses focus (e.g. open DevTools, alert, new window)
    const onWindowBlur = () => {
      setVisible(false);
      document.documentElement.style.cursor = '';
    };

    const onWindowFocus = () => {
      if (mediaQuery.matches && !motionQuery.matches) {
        setVisible(true);
        document.documentElement.style.cursor = 'none';
      }
    };

    // Iframe Telemetry Pointer restore hook
    // Parent window cannot track cursor inside iframes. Restore default cursor inside them.
    const iframeCheckInterval = setInterval(() => {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((iframe) => {
        if (!iframe.dataset.cursorBound) {
          iframe.dataset.cursorBound = 'true';
          
          iframe.addEventListener('mouseenter', () => {
            setVisible(false);
            document.documentElement.style.cursor = '';
          });
          
          iframe.addEventListener('mouseleave', () => {
            setVisible(true);
            document.documentElement.style.cursor = 'none';
          });
        }
      });
    }, 1000);

    if (mediaQuery.matches && !motionQuery.matches) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('mouseover', onMouseOver);
      window.addEventListener('blur', onWindowBlur);
      window.addEventListener('focus', onWindowFocus);
      document.body.addEventListener('mouseleave', onMouseLeaveWindow);
      document.body.addEventListener('mouseenter', onWindowFocus);
      
      document.documentElement.style.cursor = 'none';
    }

    return () => {
      clearInterval(iframeCheckInterval);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('blur', onWindowBlur);
      window.removeEventListener('focus', onWindowFocus);
      if (document.body) {
        document.body.removeEventListener('mouseleave', onMouseLeaveWindow);
        document.body.removeEventListener('mouseenter', onWindowFocus);
      }
      document.documentElement.style.cursor = '';
    };
  }, [cursorX, cursorY, visible]);

  if (!enabled || !visible) return null;

  return (
    <>
      {/* Inner Dot: Orange laser dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-orange-500 pointer-events-none z-50 shadow-[0_0_8px_#ff7a00]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: clicked ? 0.7 : hovered ? 1.4 : 1,
          backgroundColor: hovered ? '#ffffff' : '#ff7a00',
        }}
        transition={{ type: 'spring', damping: 15, stiffness: 300 }}
      />

      {/* Trailing Radar Ring: White reticle ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-white/40 bg-white/5 pointer-events-none z-50 flex items-center justify-center"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: clicked ? 1.3 : hovered ? 1.8 : 1,
          borderColor: hovered ? '#ff7a00' : 'rgba(255,255,255,0.4)',
          borderWidth: hovered ? '1.5px' : '1px',
        }}
      >
        {/* Reticle ticks */}
        <div className="absolute w-full h-[1px] bg-white/10" />
        <div className="absolute h-full w-[1px] bg-white/10" />

        {/* Hover ring animation */}
        {hovered && (
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="w-full h-full rounded-full border border-orange-500 absolute"
          />
        )}
      </motion.div>
    </>
  );
}

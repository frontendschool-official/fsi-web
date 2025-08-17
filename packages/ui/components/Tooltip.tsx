'use client';

import React, { ReactNode, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function Tooltip({
  children,
  content,
  position = 'top',
  delay = 200,
  className = '',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef?.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible && triggerRef?.current && tooltipRef?.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let x = 0;
      let y = 0;

      switch (position) {
        case 'top':
          x = triggerRect?.left + triggerRect?.width / 2 - tooltipRect?.width / 2;
          y = triggerRect?.top - tooltipRect?.height - 8;
          break;
        case 'bottom':
          x = triggerRect?.left + triggerRect?.width / 2 - tooltipRect?.width / 2;
          y = triggerRect?.bottom + 8;
          break;
        case 'left':
          x = triggerRect?.left - tooltipRect?.width - 8;
          y = triggerRect?.top + triggerRect?.height / 2 - tooltipRect?.height / 2;
          break;
        case 'right':
          x = triggerRect?.right + 8;
          y = triggerRect?.top + triggerRect?.height / 2 - tooltipRect?.height / 2;
          break;
      }

      // Ensure tooltip stays within viewport
      x = Math.max(8, Math.min(x, window?.innerWidth - tooltipRect?.width - 8));
      y = Math.max(8, Math.min(y, window?.innerHeight - tooltipRect?.height - 8));

      setCoords({ x, y });
    }
  }, [isVisible, position]);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-900 dark:border-t-gray-700',
    bottom:
      'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900 dark:border-b-gray-700',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-gray-900 dark:border-l-gray-700',
    right:
      'right-full top-1/2 transform -translate-y-1/2 border-r-gray-900 dark:border-r-gray-700',
  };

  const tooltipContent = isVisible ? (
    <div
      ref={tooltipRef}
      className={`fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 dark:bg-gray-700 rounded-md shadow-lg pointer-events-none transition-opacity duration-200 ${className}`}
      style={{
        left: coords?.x,
        top: coords?.y,
      }}
    >
      {content}
      <div
        className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`}
      />
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className='inline-block'
      >
        {children}
      </div>
      {tooltipContent &&
        createPortal(tooltipContent, document?.body || document?.documentElement || document)}
    </>
  );
}

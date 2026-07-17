import React, { forwardRef } from 'react';

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  tone: 'white' | 'tinted';
  children: React.ReactNode;
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ tone, children, className = "", ...props }, ref) => {
    // Subtle red-tinted warm background or solid white
    const bgClass = tone === 'tinted' 
      ? 'bg-gradient-to-b from-[#FFF5F5] via-[#FFF8F8] to-[#FFF5F5]' 
      : 'bg-white';

    return (
      <section
        ref={ref}
        className={`${bgClass} ${className}`}
        {...props}
      >
        {children}
      </section>
    );
  }
);

SectionWrapper.displayName = 'SectionWrapper';

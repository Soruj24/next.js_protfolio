import { useEffect, useRef,type DependencyList } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimations = (animations: () => void, dependencies: DependencyList = []) => {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    contextRef.current = gsap.context(animations);
    
    return () => {
      contextRef.current?.revert();
    };
  }, dependencies);
};
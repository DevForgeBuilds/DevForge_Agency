import { useEffect, useState } from 'react';

export type ViewportTier = 'mobile' | 'tablet' | 'desktop';

const getTier = (): ViewportTier => {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  if (w < 720) return 'mobile';
  if (w < 1080) return 'tablet';
  return 'desktop';
};

export const useViewportTier = (): ViewportTier => {
  const [tier, setTier] = useState<ViewportTier>(getTier);

  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setTier(getTier()));
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return tier;
};
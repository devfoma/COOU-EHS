export function createLandingMotion(prefersReducedMotion) {
  const distance = prefersReducedMotion ? 0 : 28;
  const duration = prefersReducedMotion ? 0.01 : 0.6;
  const staggerChildren = prefersReducedMotion ? 0 : 0.1;

  return {
    header: {
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : -12 },
      show: { opacity: 1, y: 0, transition: { duration, ease: 'easeOut' } }
    },
    section: {
      hidden: { opacity: 0, y: distance },
      show: { opacity: 1, y: 0, transition: { duration, ease: 'easeOut' } }
    },
    group: {
      hidden: { opacity: 1 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren,
          delayChildren: prefersReducedMotion ? 0 : 0.08
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
      show: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0.01 : 0.5, ease: 'easeOut' } }
    },
    card: {
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 22, scale: prefersReducedMotion ? 1 : 0.98 },
      show: { opacity: 1, y: 0, scale: 1, transition: { duration, ease: 'easeOut' } }
    }
  };
}

export function smoothScrollTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const navOffset = 80;
  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + window.scrollY - navOffset;
  const distance = targetY - startY;
  const duration = 900;
  let start: number | null = null;

  function easeInOutQuart(t: number) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  }

  function step(ts: number) {
    if (start === null) start = ts;
    const elapsed = ts - start;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutQuart(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

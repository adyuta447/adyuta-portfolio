type ScrollListener = (isScrolling: boolean) => void;

/** How long the page has to stay still before it counts as idle again. */
const IDLE_DELAY_MS = 180;

const listeners = new Set<ScrollListener>();

let isScrolling = false;
let idleTimer = 0;
let attached = false;

function notify(next: boolean) {
  if (isScrolling === next) return;
  isScrolling = next;
  listeners.forEach((listener) => listener(next));
}

function handleScroll() {
  notify(true);
  window.clearTimeout(idleTimer);
  idleTimer = window.setTimeout(() => notify(false), IDLE_DELAY_MS);
}

/**
 * A single shared answer to "is the page moving right now".
 *
 * Everything that wants to back off during a scroll subscribes here rather than
 * adding its own listener, so the scroll handler stays one passive callback no
 * matter how many features care.
 */
export function subscribeScrollActivity(listener: ScrollListener): () => void {
  listeners.add(listener);

  if (!attached) {
    attached = true;
    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0) {
      attached = false;
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(idleTimer);
      isScrolling = false;
    }
  };
}

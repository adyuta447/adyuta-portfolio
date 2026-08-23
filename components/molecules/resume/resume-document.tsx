"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ResumeBlock {
  id: string;
  node: ReactNode;
}

const MM_TO_PX = 96 / 25.4;
const PAGE_HEIGHT_MM = 297;
const PAGE_MARGIN_Y_MM = 12;
const PAGE_CONTENT_HEIGHT_PX = (PAGE_HEIGHT_MM - PAGE_MARGIN_Y_MM * 2) * MM_TO_PX;

const PAGE_WIDTH_MM = 210;
const PAGE_MARGIN_X_MM = 16;
export const PAGE_CONTENT_WIDTH_PX = (PAGE_WIDTH_MM - PAGE_MARGIN_X_MM * 2) * MM_TO_PX;

const PAGE_WIDTH_PX = PAGE_WIDTH_MM * MM_TO_PX;
const PAGE_HEIGHT_PX = PAGE_HEIGHT_MM * MM_TO_PX;

function paginateBlocks(
  blocks: ResumeBlock[],
  heights: Map<string, number>,
): ResumeBlock[][] {
  const pages: ResumeBlock[][] = [];
  let current: ResumeBlock[] = [];
  let currentHeight = 0;

  for (const block of blocks) {
    const height = heights.get(block.id) ?? 0;
    if (current.length > 0 && currentHeight + height > PAGE_CONTENT_HEIGHT_PX) {
      pages.push(current);
      current = [];
      currentHeight = 0;
    }
    current.push(block);
    currentHeight += height;
  }
  if (current.length > 0) pages.push(current);
  return pages;
}

export function ResumeDocument({ blocks }: { blocks: ResumeBlock[] }) {
  const measureRefs = useRef(new Map<string, HTMLDivElement>());
  const [pages, setPages] = useState<ResumeBlock[][] | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      const heights = new Map<string, number>();
      blocks.forEach((block) => {
        const el = measureRefs.current.get(block.id);
        if (el) heights.set(block.id, el.getBoundingClientRect().height);
      });
      setPages(paginateBlocks(blocks, heights));
    };

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure);
    } else {
      measure();
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  // The sheet keeps its real A4 pixel size internally (that's what the
  // pagination math above measures against) — on narrow screens it's
  // shrunk visually with a CSS transform instead, which doesn't affect
  // how the content inside wraps.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const updateScale = () => {
      const available = el.clientWidth;
      setScale(available > 0 ? Math.min(1, available / PAGE_WIDTH_PX) : 1);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const displayPages = pages ?? [blocks];
  const pageCount = displayPages.length;

  const scrollToIndex = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const clamped = Math.max(0, Math.min(index, pageCount - 1));
    scroller.scrollTo({ left: clamped * scroller.clientWidth, behavior: "smooth" });
  }, [pageCount]);

  const handleScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || scroller.clientWidth === 0) return;
    const index = Math.round(scroller.scrollLeft / scroller.clientWidth);
    setActiveIndex(Math.max(0, Math.min(index, pageCount - 1)));
  }, [pageCount]);

  return (
    <div ref={frameRef} className="w-full">
      <div className="relative">
        {pageCount > 1 && (
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous page"
            className="no-print absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm backdrop-blur transition-opacity hover:bg-secondary disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        {pages === null && (
          <div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 -z-10"
            style={{ width: PAGE_CONTENT_WIDTH_PX, visibility: "hidden" }}
          >
            {blocks.map((block) => (
              <div
                key={block.id}
                ref={(el) => {
                  if (el) measureRefs.current.set(block.id, el);
                }}
              >
                {block.node}
              </div>
            ))}
          </div>
        )}

        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="resume-stack flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
        >
          {displayPages.map((pageBlocks, index) => (
            <div
              key={index}
              className="resume-page-wrap flex w-full shrink-0 snap-center flex-col items-center"
            >
              <div
                className="a4-sheet-frame"
                style={{
                  width: PAGE_WIDTH_PX * scale,
                  height: PAGE_HEIGHT_PX * scale,
                }}
              >
                <div
                  className="a4-sheet resume-page w-[210mm] min-h-[297mm] rounded-2xl border border-border bg-white px-[16mm] py-[12mm] font-serif text-black shadow-sm"
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                >
                  {pageBlocks.map((block) => (
                    <div key={block.id}>{block.node}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {pageCount > 1 && (
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === pageCount - 1}
            aria-label="Next page"
            className="no-print absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm backdrop-blur transition-opacity hover:bg-secondary disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {pages !== null && pageCount > 1 && (
        <p className="no-print mt-3 text-center font-mono text-[11px] text-muted-foreground">
          Page {activeIndex + 1} of {pageCount} — swipe or use the arrows to
          turn pages
        </p>
      )}
    </div>
  );
}

import { useCallback, useRef } from "react";

interface UseDragOptions {
  onDragEnd?: (pos: { x: number; y: number }) => void;
  bounds?: () => { minX: number; minY: number; maxX: number; maxY: number };
}

/**
 * Provides pointer-event based drag for window repositioning.
 * Returns a ref to attach to the drag handle element.
 */
export function useDrag(
  currentPos: { x: number; y: number },
  onPositionChange: (pos: { x: number; y: number }) => void,
  options: UseDragOptions = {}
) {
  const dragging = useRef(false);
  const startPointer = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      dragging.current = true;
      startPointer.current = { x: e.clientX, y: e.clientY };
      startPos.current = { ...currentPos };

      const onMove = (ev: PointerEvent) => {
        if (!dragging.current) return;
        let x = startPos.current.x + ev.clientX - startPointer.current.x;
        let y = startPos.current.y + ev.clientY - startPointer.current.y;

        if (options.bounds) {
          const b = options.bounds();
          x = Math.max(b.minX, Math.min(b.maxX, x));
          y = Math.max(b.minY, Math.min(b.maxY, y));
        } else {
          // Keep title bar visible
          x = Math.max(-200, x);
          y = Math.max(0, y);
        }
        onPositionChange({ x, y });
      };

      const onUp = (ev: PointerEvent) => {
        dragging.current = false;
        let x = startPos.current.x + ev.clientX - startPointer.current.x;
        let y = startPos.current.y + ev.clientY - startPointer.current.y;
        y = Math.max(0, y);
        options.onDragEnd?.({ x, y });
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [currentPos, onPositionChange, options]
  );

  return { onPointerDown };
}

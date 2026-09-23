import { useEffect, useRef } from 'react';

/**
 * Remembers which element had focus when `open` becomes true, and
 * restores focus to it when `open` becomes false (or the component
 * unmounts). Used by every modal/drawer/overlay (mobile menu, search,
 * cart drawer, filter drawer, Quick Add) so closing one returns a
 * keyboard user to wherever they triggered it from, instead of
 * dropping focus back to the top of the page.
 */
export default function useFocusReturn(open) {
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    previouslyFocused.current = document.activeElement;

    return () => {
      if (previouslyFocused.current && typeof previouslyFocused.current.focus === 'function') {
        previouslyFocused.current.focus();
      }
    };
  }, [open]);
}

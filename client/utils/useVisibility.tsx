import { useEffect, useState } from "react";

export const useVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!element) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].intersectionRatio > 0);
      },
      { threshold: [0, 0.5, 1] }
    );
    intersectionObserver.observe(element);

    return () => intersectionObserver.disconnect();
  }, [element]);

  return [isVisible, setElement];
};

import { useMemo, useRef } from "react";
import { useSize } from "../../hooks/useSize";
import { Size } from "@/types/Size.types";

interface PlotWrapperProps {
  children: (size: Size) => React.ReactNode;
}

export function PlotWrapper({ children }: PlotWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const size = useSize(containerRef);

  const validSize = useMemo(() => {
    return (
      size &&
      size.width !== undefined &&
      size.width > 0 &&
      size.height !== undefined &&
      size.height > 0
    );
  }, [size]);

  return (
    <div
      ref={containerRef}
      className="plot_wrapper"
      style={{ width: "100%", height: "100%" }}
    >
      {validSize && children(size)}
    </div>
  );
}

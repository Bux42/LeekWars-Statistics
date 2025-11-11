import dynamic from "next/dynamic";
import { PointsCluster2DProps } from "./PointsCluster2D.types";
import { normalizeLog, findMin, findMax } from "@/utils/MathHelpers";
import { useRef } from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export function PointsCluster2D(props: PointsCluster2DProps) {
  const { leeks, key1, key2, colorKey } = props;
  const { width, height } = props;
  const { colorScale } = props;

  const xData = leeks.map((leek) => leek[key1] as number);
  const yData = leeks.map((leek) => leek[key2] as number);

  const summedColorValues = leeks.map(
    (leek) => (leek[key1] as number) + (leek[key2] as number)
  );

  // Normalize color values between 0 and 1 using log scale
  const colorValues = summedColorValues;
  const minColor = findMin(colorValues);
  const maxColor = findMax(colorValues);
  const normalizedColors = colorValues.map((val) =>
    normalizeLog(val, minColor, maxColor)
  );

  const customData = leeks.map((leek) => [leek.leek_name, leek.leek_id]);

  // Highlight points matching the search
  const sizes = leeks.map((leek) => {
    if (leek.focused) {
      return 24; // Larger size for highlighted points
    }
    return 6; // Default size
  });

  const lastClickTime = useRef<number>(0);

  const handlePlotClick = (event: Readonly<Plotly.PlotMouseEvent>) => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;

    // Double-click detection: two clicks within 200ms
    if (timeSinceLastClick < 200) {
      if (event.points && event.points.length > 0) {
        const point = event.points[0];
        if (point.customdata && Array.isArray(point.customdata)) {
          const leekId = point.customdata[1];
          window.open(`https://leekwars.com/leek/${leekId}`, "_blank");
        }
      }
      lastClickTime.current = 0; // Reset after double-click
    } else {
      lastClickTime.current = now;
    }
  };

  return (
    <Plot
      style={{ width: width, height: height, background: "transparent" }}
      onClick={handlePlotClick}
      data={[
        {
          x: xData,
          y: yData,
          type: "scatter",
          mode: "markers",
          marker: {
            size: sizes,
            color: normalizedColors,
            colorscale: colorScale,
            line: { width: 0.5, color: "rgba(0,0,0,1)" },
          },
          customdata: customData,
          name: `${String(key1)} vs ${String(key2)}`,
          hovertemplate:
            "<b>%{customdata[0]}</b><br>" +
            `${String(key1)}: %{x}<br>` +
            `${String(key2)}: %{y}<br>` +
            "<i>Double-click to open profile</i>" +
            "<extra></extra>",
        },
      ]}
      layout={{
        plot_bgcolor: "transparent",
        paper_bgcolor: "transparent",
        width: width,
        height: height,
        xaxis: { title: { text: String(key1) } },
        yaxis: { title: { text: String(key2) } },
        showlegend: true,
        legend: {
          x: 1,
          xanchor: "right",
          y: 1,
        },
      }}
    />
  );
}

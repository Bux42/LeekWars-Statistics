import { ScrappedLeek } from "@/types/ScrappedLeek.types";
import dynamic from "next/dynamic";
import { PointsCluster3DProps } from "./PointsCluster3D.types";
import { generatePointColors } from "@/utils/ColorHelpers";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export function PointsCluster3D(props: PointsCluster3DProps) {
  const { leeks, key1, key2, key3 } = props;
  const { width, height } = props;

  const xData = leeks.map((leek) => leek[key1] as number);
  const yData = leeks.map((leek) => leek[key2] as number);
  const zData = leeks.map((leek) => leek[key3] as number);
  const colors = generatePointColors(leeks, key1, key2, key3);

  return (
    <Plot
      style={{ width: width, height: height, background: "transparent" }}
      data={[
        {
          x: xData,
          y: yData,
          z: zData,
          type: "scatter3d",
          mode: "markers",
          marker: {
            size: 5,
            color: colors,
          },
          name: `${String(key1)} vs ${String(key2)} vs ${String(key3)}`,
        },
      ]}
      layout={{
        plot_bgcolor: "transparent",
        paper_bgcolor: "transparent",
        width: width,
        height: height,
        scene: {
          xaxis: { title: { text: String(key1) } },
          yaxis: { title: { text: String(key2) } },
          zaxis: { title: { text: String(key3) } },
        },
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

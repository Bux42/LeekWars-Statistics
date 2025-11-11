import { IBasePlot } from "@/types/BasePlot";
import { ScrappedLeek } from "@/types/ScrappedLeek.types";
import { Size } from "@/types/Size.types";

export interface PointsCluster2DProps extends Size, IBasePlot {
  leeks: ScrappedLeek[];
  key1: keyof ScrappedLeek;
  key2: keyof ScrappedLeek;
  colorKey: keyof ScrappedLeek;
}

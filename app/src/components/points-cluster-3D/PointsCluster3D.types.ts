import { ScrappedLeek } from "@/types/ScrappedLeek.types";
import { Size } from "@/types/Size.types";

export interface PointsCluster3DProps extends Size {
  leeks: ScrappedLeek[];
  key1: keyof ScrappedLeek;
  key2: keyof ScrappedLeek;
  key3: keyof ScrappedLeek;
}

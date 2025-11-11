import { ScrappedLeek } from "@/types/ScrappedLeek.types";

export type PlotMode = "2D" | "3D";

export const NumberKeys: (keyof ScrappedLeek)[] = [
  "level",
  "talent",
  "total_tp",
  "total_life",
  "total_wisdom",
  "total_strength",
  "total_agility",
  "total_resistance",
  "total_science",
  "total_magic",
  "total_frequency",
  "total_cores",
  "total_ram",
  "total_mp",
  "xp",
  "lines_of_code",
  "defeats",
  "victories",
  "draws",
  "ratio",
];

export const PlotModeToAllowedKeys: Record<PlotMode, (keyof ScrappedLeek)[]> = {
  "3D": NumberKeys,
  "2D": NumberKeys,
};

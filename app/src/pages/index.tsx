import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import { PointsCluster3D } from "@/components/points-cluster-3D/PointsCluster3D";
import leeksData from "@/data/scrapped_leeks.json";
import { ScrappedLeek } from "@/types/ScrappedLeek.types";
import { getDateDeltaString } from "@/utils/DateHelpers";
import { useState } from "react";
import { PlotWrapper } from "@/components/plot-wrapper/PlotWrapper";
import { homeStyles } from "./Home.styles";

const leeks: ScrappedLeek[] = leeksData as ScrappedLeek[];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

console.log("Loaded leeks:", leeks.length);

export default function Home() {
  const [plotMode, setPlotMode] = useState<"2d" | "3d">("3d");
  const [nameSearchText, setNameSearchText] = useState<string>("");
  // now
  const lastScrappedDate = getDateDeltaString(
    new Date(),
    new Date("2025-11-11")
  );

  console.log("Last scrapped date:", lastScrappedDate);
  return (
    <>
      <Head>
        <title>Leekwars Statistics</title>
        <meta name="description" content="Leekwars Statistics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={homeStyles.container}
      >
        <main style={homeStyles.main}>
          <h1>Leekwars Statistics</h1>
          <div style={homeStyles.plotContainer}>
            <PlotWrapper>
              {(size) => (
                <PointsCluster3D
                  leeks={leeks}
                  key1="level"
                  key2="talent"
                  key3="total_life"
                  width={size.width}
                  height={size.height}
                />
              )}
            </PlotWrapper>
          </div>
        </main>
      </div>
    </>
  );
}

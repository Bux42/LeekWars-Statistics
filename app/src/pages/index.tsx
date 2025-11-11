import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import { PointsCluster3D } from "@/components/points-cluster-3D/PointsCluster3D";
import leeksData from "@/data/scrapped_leeks.json";
import { ScrappedLeek } from "@/types/ScrappedLeek.types";
import { getDateDeltaString } from "@/utils/DateHelpers";
import { useEffect, useState } from "react";
import { PlotWrapper } from "@/components/plot-wrapper/PlotWrapper";
import { homeStyles } from "./Home.styles";
import {
  PlotMode,
  PlotModeToAllowedKeys,
} from "@/constants/PlotModes.constants";
import { COLOR_SCALES } from "@/constants/ColorScales.constants";
import { PointsCluster2D } from "@/components/points-cluster-2D/PointsCluster2D";

const all_leeks: ScrappedLeek[] = leeksData as ScrappedLeek[];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [plotMode, setPlotMode] = useState<PlotMode>("3D");
  const [availableKeys, setAvailableKeys] = useState<string[]>(
    PlotModeToAllowedKeys[plotMode]
  );

  const [nameSearchText, setNameSearchText] = useState<string>("");
  const [leeks, setLeeks] = useState<ScrappedLeek[]>(all_leeks);

  const [key1, setKey1] = useState<keyof ScrappedLeek>("level");
  const [key2, setKey2] = useState<keyof ScrappedLeek>("talent");
  const [key3, setKey3] = useState<keyof ScrappedLeek>("total_life");

  const [selectedColorScale, setSelectedColorScale] =
    useState<string>("Rainbow");

  const lastScrappedDate = getDateDeltaString(
    new Date(),
    new Date("2025-11-11")
  );

  console.log("Last scrapped date:", lastScrappedDate);

  useEffect(() => {
    if (nameSearchText.trim() === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLeeks(all_leeks);
    } else {
      const leeksCopy = [...all_leeks].map((leek) => ({
        ...leek,
        focused: leek.leek_name
          .toLowerCase()
          .includes(nameSearchText.toLowerCase()),
      }));
      setLeeks(leeksCopy);
    }
  }, [nameSearchText]);

  const onChangePlotMode = (mode: PlotMode) => {
    setPlotMode(mode);
    setAvailableKeys(PlotModeToAllowedKeys[mode]);
  };

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
          <h1 style={{ marginBlockStart: 0, marginBlockEnd: 0 }}>
            Leekwars Statistics (last scrapped {lastScrappedDate}) on the top
            5000 leeks
          </h1>
          <p style={{ marginBlockStart: 0, marginBlockEnd: 0 }}>
            Double / triple click node to open leek profile
          </p>

          <div style={homeStyles.topMenuContainer} className="topMenuContainer">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h2>Mode</h2>
              <div
                style={homeStyles.modeButtonsContainer}
                className="modeButtonsContainer"
              >
                <button
                  style={homeStyles.modeButton}
                  onClick={() => onChangePlotMode("2D")}
                >
                  2D
                </button>
                <button
                  style={homeStyles.modeButton}
                  onClick={() => onChangePlotMode("3D")}
                >
                  3D
                </button>
              </div>
            </div>
            <input
              type="text"
              id="name-search"
              placeholder="Search leek name..."
              value={nameSearchText}
              onChange={(e) => setNameSearchText(e.target.value)}
              style={homeStyles.searchInput}
            />
            <div style={{ display: "flex" }} className="keyDropdownsContainer">
              <h2>X</h2>
              <select
                style={homeStyles.selectInput}
                onChange={(e) => setKey1(e.target.value as keyof ScrappedLeek)}
              >
                {availableKeys
                  .filter(
                    (key) =>
                      key !== key2 && (plotMode == "3D" ? key !== key3 : true)
                  )
                  .map((key) => (
                    <option key={key} value={key} selected={key === key1}>
                      {key}
                    </option>
                  ))}
              </select>
              <h2>Y</h2>
              <select
                style={homeStyles.selectInput}
                onChange={(e) => setKey2(e.target.value as keyof ScrappedLeek)}
              >
                {availableKeys
                  .filter(
                    (key) =>
                      key !== key1 && (plotMode == "3D" ? key !== key3 : true)
                  )
                  .map((key) => (
                    <option key={key} value={key} selected={key === key2}>
                      {key}
                    </option>
                  ))}
              </select>
              {plotMode === "3D" && (
                <>
                  <h2>Z</h2>
                  <select
                    style={homeStyles.selectInput}
                    onChange={(e) =>
                      setKey3(e.target.value as keyof ScrappedLeek)
                    }
                  >
                    {availableKeys
                      .filter((key) => key !== key1 && key !== key2)
                      .map((key) => (
                        <option key={key} value={key} selected={key === key3}>
                          {key}
                        </option>
                      ))}
                  </select>
                </>
              )}
            </div>
            <h2>Color</h2>
            <select
              style={homeStyles.selectInput}
              onChange={(e) => setSelectedColorScale(e.target.value)}
            >
              {COLOR_SCALES.map((key) => (
                <option
                  key={key}
                  value={key}
                  selected={key === selectedColorScale}
                >
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div style={homeStyles.plotContainer}>
            {plotMode == "3D" && (
              <PlotWrapper>
                {(size) => (
                  <PointsCluster3D
                    leeks={leeks}
                    key1={key1}
                    key2={key2}
                    key3={key3}
                    width={size.width}
                    height={size.height}
                    colorScale={selectedColorScale}
                  />
                )}
              </PlotWrapper>
            )}
            {plotMode == "2D" && (
              <PlotWrapper>
                {(size) => (
                  <PointsCluster2D
                    leeks={leeks}
                    key1={key1}
                    key2={key2}
                    colorKey="total_life"
                    width={size.width}
                    height={size.height}
                    colorScale={selectedColorScale}
                  />
                )}
              </PlotWrapper>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

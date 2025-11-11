/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import { PointsCluster3D } from "@/components/points-cluster-3D/PointsCluster3D";
import leeksData from "@/data/scrapped_leeks.json";
import { ScrappedLeek } from "@/types/ScrappedLeek.types";
import { getDateDeltaString } from "@/utils/DateHelpers";
import { useEffect, useState } from "react";
import { PlotWrapper } from "@/components/plot-wrapper/PlotWrapper";
import { homeStyles } from "@/styles/Home.styles";
import {
  PlotMode,
  PlotModeToAllowedKeys,
} from "@/constants/PlotModes.constants";
import { COLOR_SCALES } from "@/constants/ColorScales.constants";
import { PointsCluster2D } from "@/components/points-cluster-2D/PointsCluster2D";

const all_leeks: ScrappedLeek[] = (leeksData as ScrappedLeek[]).map((leek) => ({
  ...leek,
  weapon_count: leek.weapons ? leek.weapons.length : 0,
  chip_count: leek.chips ? leek.chips.length : 0,
  component_count: leek.components ? leek.components.length : 0,
}));

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
        <a
          style={homeStyles.githubLink}
          target="_blank"
          href="https://github.com/Bux42/LeekWars-Statistics"
        >
          <img
            alt="github"
            height={32}
            width={32}
            src="https://cdn3.iconfinder.com/data/icons/social-media-2169/24/social_media_social_media_logo_github-512.png"
          />
        </a>
        <main style={homeStyles.main}>
          <h1 style={homeStyles.title}>
            Leekwars Statistics (last scrapped {lastScrappedDate}) on the top
            5000 leeks
          </h1>
          <p style={homeStyles.subtitle}>
            Double-click any point to open leek profile
          </p>

          <div style={homeStyles.topMenuContainer} className="topMenuContainer">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <h3 style={homeStyles.label}>Mode</h3>
              <div
                style={homeStyles.modeButtonsContainer}
                className="modeButtonsContainer"
              >
                <button
                  style={
                    plotMode === "2D"
                      ? homeStyles.modeButtonActive
                      : homeStyles.modeButton
                  }
                  onClick={() => onChangePlotMode("2D")}
                >
                  2D
                </button>
                <button
                  style={
                    plotMode === "3D"
                      ? homeStyles.modeButtonActive
                      : homeStyles.modeButton
                  }
                  onClick={() => onChangePlotMode("3D")}
                >
                  3D
                </button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <h3 style={homeStyles.label}>Search</h3>
              <input
                type="text"
                id="name-search"
                placeholder="Search leek name..."
                value={nameSearchText}
                onChange={(e) => setNameSearchText(e.target.value)}
                style={homeStyles.searchInput}
              />
            </div>

            <div
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
              className="keyDropdownsContainer"
            >
              <h3 style={homeStyles.label}>Axes</h3>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span style={{ fontSize: "14px", fontWeight: "600" }}>X:</span>
                <select
                  style={homeStyles.selectInput}
                  onChange={(e) =>
                    setKey1(e.target.value as keyof ScrappedLeek)
                  }
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
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span style={{ fontSize: "14px", fontWeight: "600" }}>Y:</span>
                <select
                  style={homeStyles.selectInput}
                  onChange={(e) =>
                    setKey2(e.target.value as keyof ScrappedLeek)
                  }
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
              </div>
              {plotMode === "3D" && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    Z:
                  </span>
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
                </div>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <h3 style={homeStyles.label}>Color Scale</h3>
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

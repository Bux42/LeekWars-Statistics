import { CSSProperties } from "react";

export interface IHomeStyles {
  container: CSSProperties;
  main: CSSProperties;
  plotContainer: CSSProperties;
  searchInput: CSSProperties;
  selectInput: CSSProperties;
  modeButtonsContainer: CSSProperties;
  modeButton: CSSProperties;
  topMenuContainer: CSSProperties;
}

export const homeStyles: IHomeStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    color: "#333333",
    textAlign: "center",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflow: "hidden",
  },
  plotContainer: {
    flex: 1,
    minHeight: 0,
  },
  searchInput: {
    padding: "12px 16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    margin: "16px",
    width: "calc(100% - 64px)",
    maxWidth: "200px",
  },
  selectInput: {
    padding: "12px 16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    margin: "16px",
    width: "calc(100% - 64px)",
    maxWidth: "150px",
  },
  modeButtonsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: "16px",
  },
  modeButton: {
    padding: "8px 16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
  },
  topMenuContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: "16px",
  },
};

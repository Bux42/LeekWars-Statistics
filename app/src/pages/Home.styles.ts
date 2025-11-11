import { CSSProperties } from "react";

export interface IHomeStyles {
  container: CSSProperties;
  main: CSSProperties;
  plotContainer: CSSProperties;
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
    backgroundColor: "#333333",
    color: "#dadadaff",
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
};

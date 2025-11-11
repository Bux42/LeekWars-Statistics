import { CSSProperties } from "react";

export interface IHomeStyles {
  container: CSSProperties;
  main: CSSProperties;
  plotContainer: CSSProperties;
  searchInput: CSSProperties;
  selectInput: CSSProperties;
  modeButtonsContainer: CSSProperties;
  modeButton: CSSProperties;
  modeButtonActive: CSSProperties;
  topMenuContainer: CSSProperties;
  title: CSSProperties;
  subtitle: CSSProperties;
  label: CSSProperties;
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
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    fontFamily: "var(--font-geist-sans)",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflow: "hidden",
    padding: "24px",
    gap: "16px",
  },
  plotContainer: {
    flex: 1,
    minHeight: 0,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    padding: "16px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  searchInput: {
    padding: "12px 16px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "#333",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    minWidth: "200px",
  },
  selectInput: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "#333",
    fontSize: "14px",
    outline: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    minWidth: "120px",
  },
  modeButtonsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: "12px",
    padding: "4px",
  },
  modeButton: {
    padding: "10px 24px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "transparent",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  modeButtonActive: {
    padding: "10px 24px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    color: "#667eea",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  topMenuContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
    fontSize: "28px",
    fontWeight: "700",
    textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
    fontSize: "14px",
    fontWeight: "400",
    opacity: 0.9,
    textShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    margin: 0,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    opacity: 0.95,
  },
};

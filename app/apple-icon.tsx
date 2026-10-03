import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0e12",
          borderRadius: "36px",
          border: "4px solid #c4512b",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: "96px",
            fontWeight: 800,
          }}
        >
          <span style={{ color: "#c4512b" }}>F</span>
          <span style={{ fontSize: "64px", color: "#9aa3ad" }}>.</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

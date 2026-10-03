import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0e12",
          borderRadius: "7px",
          border: "1.5px solid #c4512b",
          fontFamily: "monospace",
          fontWeight: 800,
          fontSize: "20px",
        }}
      >
        <span style={{ color: "#c4512b" }}>F</span>
        <span style={{ fontSize: "14px", color: "#9aa3ad" }}>.</span>
      </div>
    ),
    {
      ...size,
    }
  );
}

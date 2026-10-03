import { ImageResponse } from "next/og";

export const alt = "Muhammad Fakhri Rizaldi — Full Stack Engineer & Data Science";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b0e12",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(196, 81, 43, 0.08) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(36, 43, 52, 0.3) 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          padding: "64px 72px",
          border: "8px solid #141920",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Brand Monogram */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: "#141920",
                border: "1.5px solid #c4512b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "monospace",
                fontWeight: 800,
                fontSize: "24px",
                color: "#c4512b",
              }}
            >
              F
            </div>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "18px",
                color: "#9aa3ad",
                letterSpacing: "1px",
              }}
            >
              // PORTOFOLIO RESMI
            </span>
          </div>

          {/* Status Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "24px",
              backgroundColor: "rgba(196, 81, 43, 0.12)",
              border: "1px solid rgba(196, 81, 43, 0.4)",
              fontFamily: "monospace",
              fontSize: "14px",
              color: "#fff6f1",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#c4512b",
              }}
            />
            <span>Open to Work / Internship</span>
          </div>
        </div>

        {/* Center / Headline Block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "960px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#e8eaed",
              letterSpacing: "-2px",
              lineHeight: 1.08,
            }}
          >
            Muhammad Fakhri Rizaldi
          </div>
          <div
            style={{
              fontSize: "26px",
              fontWeight: 500,
              color: "#c4512b",
              letterSpacing: "-0.5px",
            }}
          >
            Informatics Undergraduate at UNIKOM • Full Stack Engineer • Data Science
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#9aa3ad",
              lineHeight: 1.5,
              maxWidth: "800px",
            }}
          >
            Membangun sistem web modern berbasis Laravel &amp; MySQL, pipeline NLP &amp; analitik data Python, serta visualisasi wawasan bisnis Looker Studio.
          </div>
        </div>

        {/* Bottom tags & URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #242b34",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {["Laravel", "Python", "NLP / SVM", "MySQL", "Looker Studio"].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "6px",
                    backgroundColor: "#141920",
                    border: "1px solid #242b34",
                    fontFamily: "monospace",
                    fontSize: "13px",
                    color: "#9aa3ad",
                  }}
                >
                  {tech}
                </div>
              )
            )}
          </div>

          <span
            style={{
              fontFamily: "monospace",
              fontSize: "16px",
              color: "#c4512b",
              fontWeight: 600,
            }}
          >
            fakhridev.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

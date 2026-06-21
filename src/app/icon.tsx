import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          background: "#16243F",
          borderRadius: 13,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Suitcase body — fills most of the icon */}
        <div
          style={{
            position: "relative",
            width: 44,
            height: 36,
            background: "#E8742C",
            borderRadius: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Handle */}
          <div
            style={{
              position: "absolute",
              top: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 18,
              height: 10,
              border: "3px solid #E8742C",
              borderBottom: "none",
              borderRadius: "5px 5px 0 0",
            }}
          />
          {/* S cutout */}
          <span
            style={{
              color: "#16243F",
              fontSize: 22,
              fontWeight: 900,
              fontFamily: "Georgia, serif",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              marginTop: 1,
            }}
          >
            S
          </span>
          {/* Luggage tag */}
          <div
            style={{
              position: "absolute",
              right: -6,
              top: 8,
              width: 7,
              height: 12,
              background: "#ffffff",
              borderRadius: 2,
              opacity: 0.9,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

/* Fills the og:image / twitter:image slot that layout.tsx's metadata
   used to point at a /og-image.png that never existed in public/.
   Next auto-wires the meta tags from this file — no manual `images: []`
   needed in the metadata object. */

export const alt = "Stow — Luggage Storage Da Nang";
export const size = { width: 1200, height: 630 };
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
          justifyContent: "center",
          padding: "80px 96px",
          background: "#16243F",
          backgroundImage:
            "radial-gradient(circle at 82% 14%, rgba(232,116,44,0.35), transparent 55%)",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 44 }}>
          <div
            style={{
              width: 68,
              height: 56,
              background: "#E8742C",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 18,
            }}
          >
            <span style={{ color: "#16243F", fontSize: 32, fontWeight: 900 }}>
              S
            </span>
          </div>
          <span
            style={{
              display: "flex",
              color: "#F4F4F0",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            STOW
          </span>
        </div>

        <div
          style={{
            display: "flex",
            color: "#E8742C",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Luggage Storage · Da Nang
        </div>

        <div
          style={{
            display: "flex",
            color: "#FFFFFF",
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.12,
            maxWidth: 920,
            marginBottom: 26,
          }}
        >
          Drop your bags. Explore Da Nang freely.
        </div>

        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.65)",
            fontSize: 25,
          }}
        >
          From 15,000 VND/hr · Flat rates for expats · Open 7am–10pm daily
        </div>
      </div>
    ),
    { ...size }
  );
}

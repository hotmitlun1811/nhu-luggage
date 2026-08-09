import { ImageResponse } from "next/og";

/* Next's file-convention routing serves this for /trust-safety instead of
   the root opengraph-image.tsx — no wiring needed in metadata. Same visual
   system as the root image (same colors, same wordmark block) so the brand
   stays consistent across shares; only the headline/eyebrow change to match
   this page's own title (see 2026-08-09-trust-safety-copy-pass.md). */

export const alt = "Safe & Trustworthy Luggage Storage in Da Nang | Stow";
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
          Trust &amp; Safety · Da Nang
        </div>

        <div
          style={{
            display: "flex",
            color: "#FFFFFF",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.12,
            maxWidth: 940,
            marginBottom: 26,
          }}
        >
          Safe, trustworthy luggage storage. Clear rules, no surprises.
        </div>

        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.65)",
            fontSize: 25,
          }}
        >
          Unique ID tag · Photo receipt · CCTV coverage · Open 7am–10pm daily
        </div>
      </div>
    ),
    { ...size }
  );
}

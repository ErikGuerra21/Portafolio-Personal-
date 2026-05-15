import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Erik Guerra — Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080e",
          padding: "60px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: index tag */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: "#555570", fontSize: 14, fontFamily: "monospace" }}>
            01 / intro
          </span>
          <div style={{ flex: 1, height: 1, background: "#1e1e2e" }} />
          <span style={{ color: "#2dc653", fontSize: 14, fontFamily: "monospace", display: "flex", alignItems: "center", gap: 6 }}>
            ● disponible
          </span>
        </div>

        {/* Center: name + role */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-4px",
              color: "#f0f0f8",
            }}
          >
            Erik
            <br />
            <span style={{ color: "#f5c518" }}>Guerra</span>
            <span style={{ color: "#555570" }}>.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 12 }}>
            <span
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: "#f0f0f8",
                background: "#12121e",
                border: "1px solid #1e1e2e",
                borderRadius: 10,
                padding: "8px 20px",
              }}
            >
              Frontend Developer
            </span>
            <span style={{ color: "#555570", fontSize: 14, fontFamily: "monospace" }}>
              React · Next.js · TypeScript
            </span>
          </div>
        </div>

        {/* Bottom: stats */}
        <div style={{ display: "flex", gap: 48 }}>
          {[
            { value: "3+", label: "Años exp.", color: "#f5c518" },
            { value: "20+", label: "Proyectos", color: "#2dc653" },
            { value: "360°", label: "Trabajo en equipo", color: "#a855f7" },
          ].map(({ value, label, color }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 36, fontWeight: 900, color }}>{value}</span>
              <span style={{ fontSize: 13, color: "#555570", fontFamily: "monospace" }}>{label}</span>
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 14, color: "#555570", fontFamily: "monospace", alignSelf: "flex-end" }}>
            erikguerra.dev
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}

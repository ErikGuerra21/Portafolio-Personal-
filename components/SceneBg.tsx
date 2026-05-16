"use client";

/* Animated background: blurred tech symbols + comet streaks */

const SYMBOLS = [
  { content: "⚛",  color: "#61dafb", size: 260, blur: 52, opacity: 0.13, top: "8%",  left: "4%",   anim: "float-a 22s ease-in-out infinite" },
  { content: "⚛",  color: "#61dafb", size: 200, blur: 60, opacity: 0.08, top: "62%", left: "78%",  anim: "float-b 28s ease-in-out infinite" },
  { content: "TS",  color: "#3178c6", size: 220, blur: 55, opacity: 0.11, top: "28%", left: "82%",  anim: "float-c 19s ease-in-out infinite" },
  { content: "JS",  color: "#f5c518", size: 240, blur: 58, opacity: 0.10, top: "72%", left: "10%",  anim: "float-a 25s ease-in-out infinite 3s" },
  { content: "▲",   color: "#ffffff", size: 200, blur: 48, opacity: 0.07, top: "18%", left: "55%",  anim: "float-b 20s ease-in-out infinite 6s" },
  { content: "{ }",color: "#a855f7", size: 190, blur: 52, opacity: 0.09, top: "50%", left: "40%",  anim: "float-c 24s ease-in-out infinite 2s" },
  { content: "⚛",  color: "#61dafb", size: 170, blur: 64, opacity: 0.06, top: "85%", left: "55%",  anim: "float-a 30s ease-in-out infinite 8s" },
  { content: "TS",  color: "#3178c6", size: 180, blur: 56, opacity: 0.07, top: "42%", left: "-2%",  anim: "float-b 23s ease-in-out infinite 4s" },
];


export default function SceneBg() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* ── Tech symbols ── */}
      {SYMBOLS.map((s, i) => (
        <div
          key={i}
          className="scene-symbol"
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            fontSize: s.size,
            fontWeight: 900,
            lineHeight: 1,
            color: s.color,
            filter: `blur(${s.blur}px)`,
            opacity: s.opacity,
            animation: s.anim,
            userSelect: "none",
            fontFamily: "var(--font-geist-mono), monospace",
          }}
        >
          {s.content}
        </div>
      ))}

    </div>
  );
}

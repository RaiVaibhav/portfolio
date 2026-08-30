import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.firstName} ${site.lastName} — ${site.role}`;

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
          background: "#f9f9f7",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              background: "#42655b",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            VR
          </div>
          <div style={{ fontSize: 26, color: "#414845" }}>{site.url.replace("https://", "")}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, color: "#1a1c1b", letterSpacing: -2 }}>
            {`${site.firstName} ${site.lastName}`}
          </div>
          <div style={{ fontSize: 38, color: "#42655b", marginTop: 8 }}>{site.role}</div>
          <div style={{ fontSize: 27, color: "#414845", marginTop: 26, maxWidth: 900, lineHeight: 1.4 }}>
            React, Next.js and TypeScript. Design systems, data-heavy UI, and the migrations that
            touch every screen.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["Design systems", "Micro frontends", "Web performance"].map((t) => (
            <div
              key={t}
              style={{
                fontSize: 22,
                color: "#2a4d43",
                background: "#e8f3f0",
                padding: "10px 22px",
                borderRadius: 999,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

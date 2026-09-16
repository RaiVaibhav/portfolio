"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { playClick, playPop, toggleAudio, isAudioMuted } from "@/lib/audio";
import { showToast } from "./Toast";

const LINKS = [
  { href: "#demos", label: "Demos" },
  { href: "#architecture", label: "Architecture" },
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader({
  onOpenCommandPalette,
}: {
  onOpenCommandPalette?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [muted, setMuted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMuted(isAudioMuted());
  }, []);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // Keyboard and outside-click dismissal
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close(true);
    }
    function onPointer(e: PointerEvent) {
      const target = e.target as Node;
      if (navRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      close();
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  // Section observer for active dock link
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    const sections = document.querySelectorAll("section[id], footer[id]");
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  function handleSoundToggle() {
    const next = toggleAudio();
    setMuted(next);
    showToast(next ? "Sound muted" : "Sound enabled");
  }

  return (
    <header className="site">
      <div className="wrap bar">
        <a
          className="mark"
          href="#top"
          onClick={() => {
            playClick();
            close();
          }}
        >
          <span className="mark-dot" aria-hidden="true">VR</span>
          <span className="mark-text">
            <b>Vaibhav Rai</b>
            <span className="mark-sub">Staff Frontend</span>
          </span>
        </a>

        <nav
          id="site-nav"
          ref={navRef}
          className="site-nav"
          data-open={open ? "true" : "false"}
          aria-label="Sections"
        >
          {LINKS.map((l) => {
            const isActive = activeSection === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                className={isActive ? "active" : ""}
                onClick={() => {
                  playPop();
                  close();
                }}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="bar-actions">
          {onOpenCommandPalette && (
            <button
              type="button"
              className="icon-btn cmd-dock-btn"
              onClick={() => {
                playClick();
                onOpenCommandPalette();
              }}
              title="Command Palette (⌘K)"
              aria-label="Open command palette"
            >
              <kbd>⌘K</kbd>
            </button>
          )}

          <button
            type="button"
            className="icon-btn audio-btn"
            onClick={handleSoundToggle}
            title={muted ? "Unmute sound effects" : "Mute sound effects"}
            aria-label="Toggle sound effects"
          >
            {muted ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>

          <ThemeToggle />

          <button
            ref={buttonRef}
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => {
              playClick();
              setOpen((v) => !v);
            }}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </header>
  );
}

function ThemeToggle() {
  function toggle() {
    playClick();
    const root = document.documentElement;
    const stamped = root.getAttribute("data-theme");
    const isDark =
      stamped === "dark" ||
      (!stamped && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const next = isDark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("vkr-theme", next);
    } catch {
      // ignore
    }
  }

  return (
    <button type="button" className="icon-btn theme" onClick={toggle} aria-label="Toggle colour theme">
      <span className="to-light">Light</span>
      <span className="to-dark">Dark</span>
    </button>
  );
}

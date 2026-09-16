"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { playClick, playPop, toggleAudio, isAudioMuted } from "@/lib/audio";
import { showToast } from "./Toast";
import { site } from "@/content/site";

type Item = {
  id: string;
  category: "Navigation" | "Actions" | "Links";
  title: string;
  subtitle?: string;
  badge?: string;
  action: () => void;
};

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items: Item[] = useMemo(
    () => [
      {
        id: "nav-demos",
        category: "Navigation",
        title: "Jump to Live Demos",
        subtitle: "100k Virtual table & Token studio",
        badge: "D",
        action: () => {
          window.location.hash = "#demos";
          onClose();
        },
      },
      {
        id: "nav-arch",
        category: "Navigation",
        title: "Jump to Architecture Blueprint",
        subtitle: "Interactive system topologies",
        badge: "A",
        action: () => {
          window.location.hash = "#architecture";
          onClose();
        },
      },
      {
        id: "nav-work",
        category: "Navigation",
        title: "Jump to Work Experience",
        subtitle: "Scrut, Kami, Klinify, Appknox",
        badge: "W",
        action: () => {
          window.location.hash = "#work";
          onClose();
        },
      },
      {
        id: "nav-proj",
        category: "Navigation",
        title: "Jump to Projects",
        subtitle: "AgentGate, Svelte Core, Open Source",
        badge: "P",
        action: () => {
          window.location.hash = "#projects";
          onClose();
        },
      },
      {
        id: "nav-toolkit",
        category: "Navigation",
        title: "Jump to Toolkit & Skills",
        subtitle: "React, Next.js, FastAPI, pgvector",
        badge: "T",
        action: () => {
          window.location.hash = "#toolkit";
          onClose();
        },
      },
      {
        id: "nav-contact",
        category: "Navigation",
        title: "Jump to Contact",
        subtitle: "Email, LinkedIn, GitHub",
        badge: "C",
        action: () => {
          window.location.hash = "#contact";
          onClose();
        },
      },
      {
        id: "act-copy-email",
        category: "Actions",
        title: "Copy Email to Clipboard",
        subtitle: site.email,
        badge: "↵",
        action: () => {
          navigator.clipboard?.writeText(site.email);
          showToast("Copied email to clipboard");
          onClose();
        },
      },
      {
        id: "act-resume",
        category: "Actions",
        title: "Download Resume",
        subtitle: "PDF · Vaibhav Kumar Rai",
        badge: "PDF",
        action: () => {
          const a = document.createElement("a");
          a.href = site.resume;
          a.download = "Vaibhav-Kumar-Rai-Resume.pdf";
          a.click();
          showToast("Downloading resume");
          onClose();
        },
      },
      {
        id: "act-theme",
        category: "Actions",
        title: "Toggle Light / Dark Theme",
        subtitle: "Switch appearance mode",
        badge: "Theme",
        action: () => {
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
          showToast(`Theme switched to ${next} mode`);
          onClose();
        },
      },
      {
        id: "act-audio",
        category: "Actions",
        title: "Toggle Sound Effects",
        subtitle: isAudioMuted() ? "Currently muted" : "Currently enabled",
        badge: "Audio",
        action: () => {
          const muted = toggleAudio();
          showToast(muted ? "Sound muted" : "Sound enabled");
          onClose();
        },
      },
      {
        id: "link-agentgate",
        category: "Links",
        title: "Open AgentGate Source (GitHub)",
        subtitle: "Permission control for AI agents over MCP",
        action: () => {
          window.open(site.github + "/agentgate", "_blank");
          onClose();
        },
      },
      {
        id: "link-svelte",
        category: "Links",
        title: "View Merged Svelte Core PRs",
        subtitle: "5 compiler & reactivity fixes",
        action: () => {
          window.open("https://github.com/sveltejs/svelte/pulls?q=is%3Apr+author%3ARaiVaibhav+is%3Amerged", "_blank");
          onClose();
        },
      },
      {
        id: "link-github",
        category: "Links",
        title: "Visit GitHub Profile",
        subtitle: site.github,
        action: () => {
          window.open(site.github, "_blank");
          onClose();
        },
      },
      {
        id: "link-linkedin",
        category: "Links",
        title: "Visit LinkedIn Profile",
        subtitle: site.linkedin,
        action: () => {
          window.open(site.linkedin, "_blank");
          onClose();
        },
      },
    ],
    [onClose],
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      playPop();
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        playClick();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
        playPop();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
        playPop();
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = filtered[selectedIndex];
        if (selected) {
          playClick();
          selected.action();
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, selectedIndex, onClose]);

  if (!open) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="cmd-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-head">
          <svg className="cmd-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section..."
            aria-autocomplete="list"
          />
          <kbd className="cmd-esc" onClick={onClose}>ESC</kbd>
        </div>

        <div className="cmd-list" ref={listRef} role="listbox">
          {filtered.length === 0 ? (
            <div className="cmd-empty">No results found for &ldquo;{query}&rdquo;</div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`cmd-item ${isSelected ? "selected" : ""}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    playClick();
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="cmd-item-left">
                    <span className="cmd-cat">{item.category}</span>
                    <span className="cmd-title">{item.title}</span>
                    {item.subtitle && <span className="cmd-sub">{item.subtitle}</span>}
                  </div>
                  {item.badge && <kbd className="cmd-badge">{item.badge}</kbd>}
                </div>
              );
            })
          )}
        </div>

        <div className="cmd-footer">
          <div className="cmd-hints">
            <span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span>
            <span><kbd>↵</kbd> select</span>
            <span><kbd>esc</kbd> dismiss</span>
          </div>
          <span className="cmd-brand">VKR Spotlight</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#demos", label: "Demos" },
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

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

  return (
    <header className="site">
      <div className="wrap bar">
        <a className="mark" href="#top">
          <span className="mark-dot" aria-hidden="true">VR</span>
          Vaibhav Rai
        </a>

        <nav
          id="site-nav"
          ref={navRef}
          className="site-nav"
          data-open={open ? "true" : "false"}
          aria-label="Sections"
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => close()}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="bar-actions">
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </header>
  );
}

/**
 * Both labels are rendered and CSS picks the right one from the active theme.
 * That keeps the button correct on the very first paint, with no stored state
 * to read and no hydration mismatch to suppress.
 */
function ThemeToggle() {
  function toggle() {
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
      /* private mode, or site data blocked — the toggle still works for this visit */
    }
  }

  return (
    <button type="button" className="icon-btn theme" onClick={toggle} aria-label="Toggle colour theme">
      <span className="to-light">Light</span>
      <span className="to-dark">Dark</span>
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import { playSuccess } from "@/lib/audio";

type ToastMessage = {
  id: number;
  text: string;
};

type Listener = (msg: string) => void;
const listeners = new Set<Listener>();

export function showToast(message: string) {
  listeners.forEach((fn) => fn(message));
  playSuccess();
}

export default function Toast() {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    function handleShow(text: string) {
      const id = Date.now();
      setToast({ id, text });
      setTimeout(() => {
        setToast((current) => (current?.id === id ? null : current));
      }, 2400);
    }

    listeners.add(handleShow);
    return () => {
      listeners.delete(handleShow);
    };
  }, []);

  if (!toast) return null;

  return (
    <div className="toast-portal" role="status" aria-live="polite">
      <div className="toast-pill">
        <span className="toast-icon">✓</span>
        <span className="toast-text">{toast.text}</span>
      </div>
    </div>
  );
}

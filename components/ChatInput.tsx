"use client";
import { useState } from "react";

export function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [text, setText] = useState("");

  function handleSend() {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  }

  return (
    <div className="border-t bg-white p-3">
      <div className="flex gap-2">
        <textarea
          className="flex-1 min-h-[56px] max-h-48 border rounded-xl p-3 outline-none resize-none"
          placeholder="Écrivez votre message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && text.trim()) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={disabled}
        />
        <button
          className="px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-700 transition-colors"
          onClick={handleSend}
          disabled={disabled || !text.trim()}
        >
          Envoyer
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        Astuce : <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl/⌘</kbd>+<kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> pour envoyer
      </div>
    </div>
  );
}
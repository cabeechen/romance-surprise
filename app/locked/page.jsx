// app/locked/page.jsx
"use client";
import { useState } from "react";

export default function Locked() {
  const [key, setKey] = useState("");
  return (
    <div className="min-h-screen grid place-items-center bg-black text-white">
      <div className="max-w-sm text-center space-y-4">
        <h1 className="text-2xl font-semibold">這個頁面受保護</h1>
        <p className="text-white/70 text-sm">請使用專屬連結或輸入分享金鑰。</p>

        <div className="flex gap-2 justify-center">
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="輸入分享金鑰"
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 outline-none"
          />
          <button
            onClick={() => {
              if (key) window.location.href = `/unlock?key=${encodeURIComponent(key)}`;
            }}
            className="px-4 py-2 rounded-lg bg-white text-black font-semibold"
          >
            送出
          </button>
        </div>

        <p className="text-xs text-white/50">有專屬連結的話，點了就會自動進入。</p>
      </div>
    </div>
  );
}

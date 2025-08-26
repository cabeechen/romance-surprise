"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";

// FileList -> 可預覽 URL
const filesToUrls = (files) =>
  Array.from(files || []).map((f) => ({
    url: URL.createObjectURL(f),
    name: f.name,
    type: f.type || "",
  }));

// 打字機
function useTypewriter(text, speed = 28, start = false) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      setOut((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return out;
}

// 煙火
function useFireworks() {
  const canvasRef = useRef(null);
  const rafRef = useRef();
  const particles = useRef([]);
  const spawn = (x, y) => {
    const colors = ["#ffffff", "#ffd1dc", "#ffb3c1", "#ffe29f", "#c7e9ff"];
    const n = 80;
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n + Math.random() * 0.5;
      const speed = 2 + Math.random() * 4;
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 60 + Math.random() * 30,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  };
  const launch = () => {
    const c = canvasRef.current;
    if (!c) return;
    const { clientWidth: w, clientHeight: h } = c;
    for (let k = 0; k < 3; k++) {
      spawn(Math.random() * w * 0.8 + w * 0.1, Math.random() * h * 0.5 + h * 0.2);
    }
  };
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    const loop = () => {
      const w = c.clientWidth, h = c.clientHeight;
      ctx.clearRect(0, 0, w, h);
      particles.current.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.life -= 1;
        ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
      });
      particles.current = particles.current.filter((p) => p.life > 0);
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", onResize); };
  }, []);
  return { canvasRef, launch };
}

export default function RomanceSurprisePage() {
  // 密碼改為兩個字：生日
  const PASSWORD = "1211";
  const [text, setText] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  // 背景媒體與輪播
  const [bgMedia, setBgMedia] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const currentBg = bgMedia[bgIndex];
  useEffect(() => {
    if (bgMedia.length === 0 || !autoPlay) return;
    const id = setInterval(() => setBgIndex((i) => (i + 1) % bgMedia.length), 4000);
    return () => clearInterval(id);
  }, [bgMedia, autoPlay]);

  // 相簿
  const [gallery, setGallery] = useState([]);

  // 煙火 + 打字機
  const { canvasRef, launch } = useFireworks();
  const [showMsg, setShowMsg] = useState(false);
  const message =
    "謝謝妳出現在我生命裡。上週的美式館、晚上的煙火，還有妳笑起來的樣子，" +
    "都讓我更確定：把日常過成儀式，不需要理由，因為妳就是我想珍惜的理由。";
  const typed = useTypewriter(message, 26, showMsg);

  const bgStyle = useMemo(() => {
    if (currentBg && currentBg.type?.startsWith("image")) {
      return { backgroundImage: `url(${currentBg.url})` };
    }
    return {};
  }, [currentBg]);

  return (
    <div className="relative min-h-screen w-full text-white bg-gradient-to-b from-[#0b0b0f] via-[#0e0d14] to-[#14121c]">
      {/* 背景媒體 */}
      {currentBg?.type?.startsWith("video") ? (
        <video src={currentBg.url} className="absolute inset-0 w-full h-full object-cover opacity-60" autoPlay loop muted playsInline />
      ) : (
        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={bgStyle} />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_60%)]" />
      <div className="absolute inset-0 bg-black/40" />

      {/* 煙火 */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 頂部工具列 */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 pt-6 flex items-center justify-between">
        <div className="text-sm tracking-widest uppercase text-white/70">Night of Little Surprises</div>
        <div className="flex items-center gap-3">
          <label className="inline-flex">
            <Input type="file" multiple accept="image/*,video/*" className="hidden" onChange={(e) => setBgMedia(filesToUrls(e.target.files))} />
            <Button variant="secondary" className="rounded-xl">上傳背景媒體</Button>
          </label>
          <label className="inline-flex">
            <Input type="file" multiple accept="image/*,video/*" className="hidden" onChange={(e) => setGallery(filesToUrls(e.target.files))} />
            <Button variant="secondary" className="rounded-xl">上傳相簿</Button>
          </label>
          {bgMedia.length > 1 && (
            <Button variant="outline" className="rounded-xl" onClick={() => setAutoPlay((v) => !v)}>
              {autoPlay ? "暫停輪播" : "啟動輪播"}
            </Button>
          )}
        </div>
      </div>

      {/* Hero / 密碼區 */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-center text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-white">
            給妳的一個小驚喜
          </span>
        </h1>

        {!unlocked ? (
          <div className="mx-auto mt-10 max-w-md">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-center">請輸入兩個字才能進入</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="輸入：生日"
                  value={text}
                  onChange={(e) => setText((e.target.value || "").trim())}
                  className="text-center tracking-widest"
                />
                <Button
                  className="w-full rounded-xl"
                  onClick={() => {
                    if (text === PASSWORD) {
                      setUnlocked(true);
                      setTimeout(() => { launch(); setShowMsg(true); }, 200);
                    }
                  }}
                >
                  進入
                </Button>
                <p className="text-center text-xs text-white/60">（沒有提示喔，要想一想 😉）</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-3xl">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 leading-8 shadow-xl border border-white/20">
              <pre className="whitespace-pre-wrap font-sans text-base">{typed}</pre>
            </div>
          </div>
        )}
      </div>

      {/* 相簿 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
        <h2 className="text-xl mb-4 font-semibold text-white/90">我們的相簿 / 影片</h2>
        {gallery.length === 0 ? (
          <p className="text-white/70 text-sm">先用上方按鈕上傳一些照片或影片吧（美式館、煙火都可以）。</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((g, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow transition-transform duration-200 hover:scale-[1.02]">
                {g.type?.startsWith("video") ? (
                  <video src={g.url} controls className="w-full h-44 object-cover" playsInline />
                ) : (
                  <img src={g.url} alt={g.name} className="w-full h-44 object-cover" />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

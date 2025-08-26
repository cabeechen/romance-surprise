import { useState, useEffect, useMemo } from "react";

// 改成相對路徑
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import useFireworks from "../../hooks/useFireworks";
import useTypewriter from "../../hooks/useTypewriter";

// 相簿路徑（放在 public/slides 裡）
const SLIDES = [
  "/DSC08914.jpg",
  "/DSC08949.jpg",
  "/DSC08993.jpg",
  "/DSC08995.jpg",
  "/DSC08937.jpg",
  "/DSC08938.jpg",
  "/DSC08941.jpg",
  "/DSC08982.jpg",
  "/IMG_6730.jpg",
  "/DSC08992.jpg",
  "/DSC08959.jpg",
  "/DSC08951.jpg",
  "/DSC08957.jpg",
  "/DSC08959.jpg",
];


export default function RomanceSurprisePage() {
  // 密碼（兩個字）
  const PASSWORD = "1211";
  const [text, setText] = useState("");
  const [unlocked, setUnlocked] = useState(false);

// 煙火 + 打字機
const { canvasRef, launch } = useFireworks();
const [showMsg, setShowMsg] = useState(false);

const message = `
第一次見到妳的時候，我就有一種說不出的感覺。我心裡想，如果之後妳的性格和想法跟我合，我一定會慢慢愛上妳。
在我們的聊天、爬山的相處裡，我越來越確定這一點。所以我才選擇勇敢告訴妳，不想留下遺憾。
有時候因為緊張和害羞，我話不多，卻總覺得時間過得特別快。跟妳相處的感覺，對我來說真的很特別。
我很想知道妳的心意，但妳不用急著回答。我只是想讓妳知道，這是我真心的心意。
也真的很開心，妳願意陪我去美術館，還有一起去看煙火。那天妳的打扮真的很漂亮，整個人散發的氣質，甚至讓我覺得像大學生一樣充滿活力。這些都是真心話。
我也有注意到妳下午就會快沒電一樣。但妳從不會因此擺臉色或冷下來，依然能好好相處、繼續聊天。這樣的妳，反而讓我更欣賞，因為那是一種溫柔和體貼。
`;

const typed = useTypewriter(message.trim(), 26, showMsg);

  // 相簿自動出現
  const [showSlides, setShowSlides] = useState(false);
  useEffect(() => {
    if (unlocked) {
      // 延遲一點，等煙火打字先跑
      const timer = setTimeout(() => setShowSlides(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [unlocked]);

  return (
    <div className="relative min-h-screen w-full text-white bg-gradient-to-b from-[#0b0b0f] via-[#0e0d14] to-[#14121c]">
      {/* 煙火背景 */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 內容 */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-center text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-white">
            {unlocked ? "慢慢看應該不會嚇到了吧" : "想對妳說的話"}
          </span>
        </h1>

        {/* 未解鎖 */}
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
                      setTimeout(() => {
                        launch();
                        setShowMsg(true);
                      }, 200);
                    }
                  }}
                >
                  進入
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* 打字訊息 */}
            <div className="mx-auto mt-10 max-w-3xl">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 leading-8 shadow-xl border border-white/20">
                <pre className="whitespace-pre-wrap font-sans text-base">{typed}</pre>
              </div>
            </div>

            {/* 自動出現相簿 */}
            {showSlides && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
                {SLIDES.map((url, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-white/10 shadow"
                  >
                    <img src={url} alt={`slide-${idx}`} className="w-full h-44 object-cover" />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

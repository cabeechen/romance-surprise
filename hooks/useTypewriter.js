import { useEffect, useState } from "react";

export default function useTypewriter(text = "", speed = 30, start = true) {
  // ✅ 一開始就給空字串，避免 undefined
  const [out, setOut] = useState("");

  useEffect(() => {
    if (!start) return;
    setOut(""); // 重新開始時先清空
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);

  return out; // ✅ 永遠回傳字串
}

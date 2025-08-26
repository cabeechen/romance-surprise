// app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "秘密",
  description: "專屬於妳的小小互動頁",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}

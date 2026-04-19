"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodeDisplay() {
  const [menuUrl, setMenuUrl] = useState<string | null>(null);

  useEffect(() => {
    setMenuUrl(`${window.location.origin}/menu`);
  }, []);

  // Don't render anything until we have the real URL — prevents hydration mismatch
  if (!menuUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[140px] h-[140px] bg-surface-container-low rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-inner">
      <QRCodeSVG
        value={menuUrl}
        size={140}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"H"}
        includeMargin={false}
      />
    </div>
  );
}

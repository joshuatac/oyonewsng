"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Banner() {
  const [bannerUrl, setBannerUrl] = useState("");

  useEffect(() => {
    fetch("/api/banner")
      .then((res) => res.json())
      .then((data) => {
        setBannerUrl(data?.acf?.top_banner?.url); // Adjust this depending on your ACF field structure
      })
      .catch((err) => console.error("Failed to load banner", err));
  }, []);

  if (!bannerUrl) return null;

  return (
    <div className="w-full bg-white text-center py-2 border-gray-200">
      <div className="relative w-full h-[80px] sm:h-[100px]">
        <a href="https://oyonews.ng" target="_blank" rel="noopener noreferrer">
          <Image
            src={bannerUrl}
            alt="Top Advert Banner"
            fill
            className="object-contain"
            priority
          />
        </a>
      </div>
    </div>
  );
}

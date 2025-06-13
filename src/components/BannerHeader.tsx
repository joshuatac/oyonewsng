// components/BannerHeader.tsx
import { useEffect, useState } from "react";
import Image from "next/image";

export default function BannerHeader() {
  const [banner, setBanner] = useState<{ banner_image: string; banner_link: string } | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      const res = await fetch(
        "https://api.oyonews.com.ng/wp-json/wp/v2/pages?slug=site-settings&acf_format=standard"
      );
      const data = await res.json();
      setBanner(data[0]?.acf ?? null);
    };

    fetchBanner();
  }, []);

  if (!banner?.banner_image) return null;

  return (
    <a href={banner.banner_link} target="_blank" rel="noopener noreferrer">
      <Image
        src={banner.banner_image}
        alt="Banner"
        width={1200}
        height={300}
        layout="responsive"
      />
    </a>
  );
}

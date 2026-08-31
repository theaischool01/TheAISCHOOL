"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const match = document.cookie.match(/theaischool_region=([^;]+)/);
    const region = match ? match[1] : "in";
    router.replace(`/${region}/`);
  }, [router]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <p>Redirecting to The AI School...</p>
    </div>
  );
}

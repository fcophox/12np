"use client";

import ComingSoon from "@/components/ComingSoon";
import FullSiteHome from "@/components/FullSiteHome";

const SHOW_COMING_SOON = false;

export default function Home() {
  if (SHOW_COMING_SOON) {
    return <ComingSoon />;
  }

  return <FullSiteHome />;
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Wikimedia Commons — properly-licensed (CC0/CC-BY/CC-BY-SA) photos used
       on /guides/* pages. Never hotlink arbitrary Google Image results:
       most are copyrighted by a photographer/agency and not licensed for
       reuse on a commercial site — real infringement exposure for a real
       business, not a theoretical risk. Every guide image's exact license
       and required attribution is recorded in GuideImage's callers. */
    remotePatterns: [new URL("https://upload.wikimedia.org/wikipedia/commons/**")],
  },
};

export default nextConfig;

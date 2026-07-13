import SmoothScroll from "@/components/providers/SmoothScroll";
import Background from "@/components/three/Background";
import Loader from "@/components/ui/Loader";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import Trailer from "@/components/sections/Trailer";
import Gallery from "@/components/sections/Gallery";
import Team from "@/components/sections/Team";
import Storytelling from "@/components/sections/Storytelling";

// Toggle the animated WebGL background. Hidden for now while we make the site
// pixel-perfect to the design (per client). Flip back to true to re-enable —
// none of the 3D code was removed.
const ENABLE_3D = false;

export default function Home() {
  return (
    <SmoothScroll>
      <Loader />
      {ENABLE_3D && <Background />}
      <Nav />

      <main id="top" className="relative z-10">
        <Hero />
        <Trailer />
        <Gallery />
        <Team />
        <Storytelling />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

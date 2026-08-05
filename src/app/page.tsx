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
        {/* Trailer + Gallery share one continuous gradient so there's no seam at
            the section boundary (adjacent elements with matching gradient
            endpoints still show a hairline edge — separate rasterization). */}
        <div
          style={{
            background:
              "linear-gradient(to bottom, #030303 0%, #030406 5%, #03070a 11%, #030b10 17%, #031016 23%, #03171e 28%, #041e26 34%, #052830 40%, #06323b 45%, #073039 52%, #082e37 59%, #092c35 66%, #0a2932 73%, #0b262f 79%, #0d232b 86%, #0e2027 93%, #101d22 100%)",
          }}
        >
          <Trailer />
          <Gallery />
        </div>
        <Team />
        <Storytelling />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

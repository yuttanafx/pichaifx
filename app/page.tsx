import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Performance from "@/components/Performance";
import Products from "@/components/Products";
import HowItWorks from "@/components/HowItWorks";
import EADownload from "@/components/EADownload";
import ConnectAccount from "@/components/ConnectAccount";
import CopyTrading from "@/components/CopyTrading";
import LiveMarket from "@/components/LiveMarket";
import Pricing from "@/components/Pricing";
import Academy from "@/components/Academy";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <TrustBar />
      <Performance />
      <Products />
      <HowItWorks />
      <EADownload />
      <ConnectAccount />
      <CopyTrading />
      <LiveMarket />
      <Pricing />
      <Academy />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}

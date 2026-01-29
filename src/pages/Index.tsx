import Header from "@/components/Header";
import HeadphoneScroll from "@/components/HeadphoneScroll";
import FeaturesSection from "@/components/FeaturesSection";
import SpecsSection from "@/components/SpecsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-zenith-black min-h-screen">
      <Header />
      <main>
        <HeadphoneScroll />
        <FeaturesSection />
        <SpecsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

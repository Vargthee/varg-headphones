import Header from "@/components/Header";
import HeadphoneScroll from "@/components/HeadphoneScroll";
import Headphone3DSection from "@/components/Headphone3DSection";
import FeaturesSection from "@/components/FeaturesSection";
import SpecsSection from "@/components/SpecsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-varg-black min-h-screen">
      <Header />
      <main>
        <HeadphoneScroll />
        <Headphone3DSection />
        <FeaturesSection />
        <SpecsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

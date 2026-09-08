import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { MetricsSection } from '@/components/sections/MetricsSection';
import { ChartShowcase } from '@/components/sections/ChartShowcase';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { ContactSection } from '@/components/sections/ContactSection';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/layout/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <MetricsSection />
        <FeatureGrid />
        <ChartShowcase />
        <ContactSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

export default App;

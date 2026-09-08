import React from 'react';
import { ArrowRight, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion } from 'motion/react';

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-tr from-emerald-900/60 via-cyan-900/40 to-slate-900/90 border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 overflow-hidden text-center"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant eSIM Setup via App</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Experience the Future of Connectivity
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Download the Lattice eSIM profile today. Stop worrying about data caps and dead zones. Get a guaranteed 50 Mbps anywhere in the world.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Download eSIM</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <a
                href="#features"
                className="w-full sm:w-auto"
              >
                <Button size="lg" variant="outline" className="w-full border-emerald-500/50 text-emerald-100 hover:bg-emerald-500/10">
                  <span>View Coverage Map</span>
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

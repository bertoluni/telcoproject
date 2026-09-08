import React from 'react';
import { ArrowRight, Activity, Cpu, Globe, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'motion/react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden glow-mesh">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/20 blur-[130px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center"
          >
            <Badge variant="gradient" className="gap-2 px-4 py-1.5 shadow-sm border border-emerald-500/30">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>The best network is every network.</span>
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            Unbreakable Connectivity. <br />
            <span className="text-gradient-primary">Powered by AI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal"
          >
            We own no towers. We own no spectrum. Our AI routes your session across mobile, Wi-Fi, and satellite in real-time. Pay for outcomes—always 50 Mbps, anywhere—not gigabytes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-500"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Get eSIM Now</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => document.getElementById('analytics')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>How AI Routing Works</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-slate-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant eSIM Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Real-time Network Switching</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Drop Coverage</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 relative mx-auto max-w-5xl rounded-2xl p-2 sm:p-3 glass-panel border border-emerald-500/10 shadow-2xl shadow-emerald-950/50"
        >
          <div className="rounded-xl bg-slate-950/80 border border-slate-800/80 p-4 sm:p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-slate-400 font-mono ml-2">sys://lattice.routing.engine</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ROUTING ENGINE ACTIVE
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Current Link</span>
                  <Globe className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">Mobile (5G)</div>
                <p className="text-xs text-slate-500">Vodafone Network • 62 Mbps</p>
              </div>

              <div className="glass-card p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Capacity Market</span>
                  <Activity className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">$0.001/MB</div>
                <p className="text-xs text-slate-500">Purchasing via wholesale spot market</p>
              </div>

              <div className="glass-card p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Routing Logic</span>
                  <Cpu className="w-4 h-4 text-lime-400" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">Predictive</div>
                <p className="text-xs text-slate-500">Evaluating satellite fallback in 3s</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

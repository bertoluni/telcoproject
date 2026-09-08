import React from 'react';
import { Database, Zap, Shield, Smartphone, Globe2, Code2, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'motion/react';

export const FeatureGrid: React.FC = () => {
  const features = [
    {
      title: 'Cloudflare Pages & Edge Ready',
      desc: 'Built to deploy effortlessly to Cloudflare Pages via GitHub Actions. Global distribution across 310+ cities with sub-second asset delivery.',
      icon: Globe2,
      badge: 'Infrastructure',
      gradient: 'from-blue-500/20 to-indigo-500/5',
      iconColor: 'text-blue-400',
    },
    {
      title: 'Embedded SQLite (Cloudflare D1)',
      desc: 'Serverless SQLite persistence at the edge. Handle form submissions, user waitlists, and custom events without setting up external DB servers.',
      icon: Database,
      badge: 'Database',
      gradient: 'from-purple-500/20 to-pink-500/5',
      iconColor: 'text-purple-400',
    },
    {
      title: 'Sub-60fps Motion Animations',
      desc: 'Powered by Motion (Framer Motion engine) for hardware-accelerated animations, scroll reveals, and micro-interactions.',
      icon: Sparkles,
      badge: 'Animations',
      gradient: 'from-amber-500/20 to-orange-500/5',
      iconColor: 'text-amber-400',
    },
    {
      title: 'Mobile-First & Ultra Responsive',
      desc: 'Pixel-perfect typography, adaptive grid layouts, dynamic viewports, and clean responsive menus tested for all device widths.',
      icon: Smartphone,
      badge: 'Responsive',
      gradient: 'from-emerald-500/20 to-teal-500/5',
      iconColor: 'text-emerald-400',
    },
    {
      title: 'Zero Cold-Start Edge Functions',
      desc: 'Lightweight `/functions/api` endpoints running directly on Cloudflare V8 isolates for instant API response without container overhead.',
      icon: Zap,
      badge: 'Performance',
      gradient: 'from-indigo-500/20 to-cyan-500/5',
      iconColor: 'text-indigo-400',
    },
    {
      title: 'Type-Safe Modular Architecture',
      desc: 'Written in pure TypeScript with Tailwind CSS design tokens, reusable UI primitives, and clear modular structure for easy company customization.',
      icon: Code2,
      badge: 'Developer Experience',
      gradient: 'from-fuchsia-500/20 to-purple-500/5',
      iconColor: 'text-fuchsia-400',
    },
  ];

  return (
    <section id="features" className="py-20 relative bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="gradient" className="mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Architecture & Features</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Designed for Modern Edge Scale
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Every layer is tuned for velocity, developer agility, and world-class visitor experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card hoverEffect className="h-full flex flex-col justify-between p-6 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feature.gradient} rounded-bl-full pointer-events-none transition-all duration-300 group-hover:scale-110`} />
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                        <Icon className={`w-5 h-5 ${feature.iconColor}`} />
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800">
                        {feature.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                    <span>Edge Optimized</span>
                    <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

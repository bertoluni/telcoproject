import React from 'react';
import { Cpu, Zap, Activity, Smartphone, Globe2, ServerOff, Shield } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'motion/react';

export const FeatureGrid: React.FC = () => {
  const features = [
    {
      title: 'AI Real-Time Routing',
      desc: 'Seamless sub-millisecond switching between mobile, Wi-Fi, and satellite based on spot market capacity and latency.',
      icon: Cpu,
      badge: 'Core Tech',
      gradient: 'from-emerald-500/20 to-teal-500/5',
      iconColor: 'text-emerald-400',
    },
    {
      title: 'Guaranteed Outcomes',
      desc: 'Stop paying for gigabytes. You pay for guaranteed performance—always 50 Mbps, anywhere in the world.',
      icon: Zap,
      badge: 'Pricing',
      gradient: 'from-cyan-500/20 to-blue-500/5',
      iconColor: 'text-cyan-400',
    },
    {
      title: 'Union of All Networks',
      desc: 'Coverage that beats every incumbent. We combine the infrastructure of every major provider into one continuous grid.',
      icon: Activity,
      badge: 'Coverage',
      gradient: 'from-lime-500/20 to-green-500/5',
      iconColor: 'text-lime-400',
    },
    {
      title: 'eSIM Native',
      desc: 'Instant activation. No physical stores, no plastic SIM cards. Download the Lattice profile and connect in seconds.',
      icon: Smartphone,
      badge: 'Experience',
      gradient: 'from-teal-500/20 to-emerald-500/5',
      iconColor: 'text-teal-400',
    },
    {
      title: 'Zero Network Capex',
      desc: 'A pure software telco. We don\'t own towers or lay cables. We build intelligence and buy capacity on the spot market.',
      icon: ServerOff,
      badge: 'Business Model',
      gradient: 'from-blue-500/20 to-cyan-500/5',
      iconColor: 'text-blue-400',
    },
    {
      title: 'Global Footprint',
      desc: 'One global product live in 10 countries. At least two MNO partners per market, plus satellite fallback anywhere.',
      icon: Globe2,
      badge: 'Scale',
      gradient: 'from-green-500/20 to-lime-500/5',
      iconColor: 'text-green-400',
    },
  ];

  return (
    <section id="features" className="py-20 relative bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="gradient" className="mb-3 border border-emerald-500/30">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>The Lattice Advantage</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            A Software-Defined Telco
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            We replaced cell towers with code. Our intelligent routing engine gives you the best connection possible.
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
                <Card hoverEffect className="h-full flex flex-col justify-between p-6 relative overflow-hidden group border border-slate-800/80 hover:border-emerald-500/30">
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

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                    <span>Learn More</span>
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

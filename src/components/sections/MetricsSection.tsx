import React from 'react';
import { TrendingUp, ServerOff, Globe, SignalHigh } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { motion } from 'motion/react';

export const MetricsSection: React.FC = () => {
  const metrics = [
    {
      label: 'Guaranteed Speed',
      value: '50 Mbps',
      change: 'Always, anywhere.',
      icon: SignalHigh,
      trend: 'up',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Network Capex',
      value: '$0.00',
      change: 'Pure software telco.',
      icon: ServerOff,
      trend: 'up',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
    },
    {
      label: 'Active Countries',
      value: '10+',
      change: '+2 launching next month',
      icon: Globe,
      trend: 'up',
      color: 'text-lime-400',
      bg: 'bg-lime-500/10',
    },
    {
      label: 'Combined Networks',
      value: '32 MNOs',
      change: 'Union of all incumbents.',
      icon: TrendingUp,
      trend: 'up',
      color: 'text-teal-400',
      bg: 'bg-teal-500/10',
    },
  ];

  return (
    <section id="metrics" className="py-12 border-y border-slate-800/60 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card hoverEffect className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {metric.label}
                    </span>
                    <div className={`p-2 rounded-xl ${metric.bg}`}>
                      <Icon className={`w-4 h-4 ${metric.color}`} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-extrabold text-white tracking-tight font-mono">
                      {metric.value}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{metric.change}</span>
                    </div>
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

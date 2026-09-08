import React from 'react';
import { TrendingUp, Users, Cpu, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { motion } from 'motion/react';

export const MetricsSection: React.FC = () => {
  const metrics = [
    {
      label: 'Edge Availability',
      value: '99.99%',
      change: '+0.04% this month',
      icon: Cpu,
      trend: 'up',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
    },
    {
      label: 'Global Average Latency',
      value: '14.2 ms',
      change: '-3.8 ms improvement',
      icon: TrendingUp,
      trend: 'up',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Active Waitlist / Leads',
      value: '1,420+',
      change: '+28% weekly surge',
      icon: Users,
      trend: 'up',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      label: 'Data Integrity & Security',
      value: '100%',
      change: 'Zero Trust Guard',
      icon: ShieldCheck,
      trend: 'up',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
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

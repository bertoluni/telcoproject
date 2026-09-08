import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Activity, BarChart3, LineChart, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

const networkData = [
  { time: '00:00', mno1: 4200, mno2: 1200, satellite: 100 },
  { time: '04:00', mno1: 3800, mno2: 1900, satellite: 200 },
  { time: '08:00', mno1: 9400, mno2: 2800, satellite: 50 },
  { time: '12:00', mno1: 14200, mno2: 8100, satellite: 150 },
  { time: '16:00', mno1: 11500, mno2: 10500, satellite: 200 },
  { time: '20:00', mno1: 8200, mno2: 9800, satellite: 300 },
];

const spotPricingData = [
  { region: 'UK-Lon', mno1Price: 0.0012, mno2Price: 0.0015 },
  { region: 'EU-Fra', mno1Price: 0.0011, mno2Price: 0.0014 },
  { region: 'US-Nyc', mno1Price: 0.0018, mno2Price: 0.0016 },
  { region: 'AS-Sgp', mno1Price: 0.0022, mno2Price: 0.0019 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 rounded-xl border border-white/10 shadow-xl text-xs space-y-1">
        <p className="font-bold text-white font-mono">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="flex items-center gap-2" style={{ color: entry.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-300 capitalize">{entry.name}:</span>
            <span className="font-mono font-semibold text-white">
              {entry.value.toLocaleString()} {entry.name.includes('Price') ? '¢/MB' : 'TB'}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const ChartShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'network' | 'pricing'>('network');

  return (
    <section id="analytics" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="gradient" className="mb-3 border border-emerald-500/30">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Routing Intelligence</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Real-Time Network Selection
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Our AI constantly evaluates spot market capacity and latency, routing your packets across the best available network seamlessly.
          </p>

          <div className="mt-6 inline-flex p-1.5 rounded-xl glass-panel border border-white/10">
            <button
              onClick={() => setActiveTab('network')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'network'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LineChart className="w-4 h-4" />
              Traffic Allocation
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'pricing'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Spot Market Costs
            </button>
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-4 sm:p-8 relative border border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  {activeTab === 'network' ? 'Live Network Capacity Utilization' : 'Wholesale Data Pricing by Region'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {activeTab === 'network' ? 'Autonomous shifting between MNOs based on congestion' : 'Real-time spot market bidding for bandwidth'}
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Engine: Active
              </div>
            </div>

            <div className="h-[320px] sm:h-[400px] w-full">
              {activeTab === 'network' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={networkData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorMno1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorMno2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="top"
                      height={36}
                      formatter={(val) => <span className="text-xs text-slate-300 font-medium capitalize">{val}</span>}
                    />
                    <Area
                      type="monotone"
                      dataKey="mno1"
                      name="Primary MNO (TB)"
                      stroke="#10b981"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorMno1)"
                    />
                    <Area
                      type="monotone"
                      dataKey="mno2"
                      name="Secondary MNO (TB)"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorMno2)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spotPricingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                    <XAxis dataKey="region" stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="top"
                      height={36}
                      formatter={(val) => <span className="text-xs text-slate-300 font-medium capitalize">{val}</span>}
                    />
                    <Bar
                      dataKey="mno1Price"
                      name="MNO Alpha Price"
                      fill="#10b981"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="mno2Price"
                      name="MNO Beta Price"
                      fill="#06b6d4"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

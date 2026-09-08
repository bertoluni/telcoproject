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
import { Activity, BarChart3, LineChart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const growthData = [
  { month: 'Jan', requests: 4200, latency: 28, users: 1200 },
  { month: 'Feb', requests: 6800, latency: 24, users: 1900 },
  { month: 'Mar', requests: 9400, latency: 21, users: 2800 },
  { month: 'Apr', requests: 14200, latency: 18, users: 4100 },
  { month: 'May', requests: 21500, latency: 15, users: 6500 },
  { month: 'Jun', requests: 32000, latency: 14, users: 9800 },
  { month: 'Jul', requests: 46800, latency: 12, users: 14500 },
  { month: 'Aug', requests: 64200, latency: 11, users: 21000 },
];

const edgePerformanceData = [
  { region: 'US-East', edgeNodes: 96, avgLatency: 8.4 },
  { region: 'EU-West', edgeNodes: 84, avgLatency: 9.1 },
  { region: 'AP-South', edgeNodes: 72, avgLatency: 14.5 },
  { region: 'SA-East', edgeNodes: 48, avgLatency: 18.2 },
  { region: 'AF-South', edgeNodes: 32, avgLatency: 22.0 },
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
              {entry.value.toLocaleString()} {entry.name === 'latency' || entry.name === 'avgLatency' ? 'ms' : ''}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const ChartShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'growth' | 'performance'>('growth');

  return (
    <section id="analytics" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="gradient" className="mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-Time Visualization</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Built-in Responsive Chart Engine
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Visualize your business KPIs, system telemetry, and growth milestones with responsive, high-framerate SVG & Canvas charts.
          </p>

          <div className="mt-6 inline-flex p-1.5 rounded-xl glass-panel border border-white/10">
            <button
              onClick={() => setActiveTab('growth')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'growth'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LineChart className="w-4 h-4" />
              Growth & Traffic
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'performance'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Edge Benchmark
            </button>
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-4 sm:p-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-400" />
                  {activeTab === 'growth' ? 'Platform Scalability & Request Volume' : 'Global Edge Latency (Cloudflare PoPs)'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {activeTab === 'growth' ? 'Monthly incoming traffic and query performance' : 'Real-time response latency across regional clusters'}
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Stream: Active
              </div>
            </div>

            <div className="h-[320px] sm:h-[400px] w-full">
              {activeTab === 'growth' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="top"
                      height={36}
                      formatter={(val) => <span className="text-xs text-slate-300 font-medium capitalize">{val}</span>}
                    />
                    <Area
                      type="monotone"
                      dataKey="requests"
                      name="Requests (k)"
                      stroke="#6366f1"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRequests)"
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      name="Active Users"
                      stroke="#a855f7"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorUsers)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={edgePerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                      dataKey="edgeNodes"
                      name="Edge Nodes"
                      fill="#6366f1"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="avgLatency"
                      name="Avg Latency (ms)"
                      fill="#38bdf8"
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

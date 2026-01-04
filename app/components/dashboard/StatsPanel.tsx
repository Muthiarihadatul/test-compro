'use client';

import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Sector,
} from 'recharts';

/* =======================
   CONSTANTS
======================= */
const COLORS = [
  '#9D0009', // merah gelap
  '#C21C1C', // merah klasik
  '#E54B4B', // merah terang
  '#F08080', // coral
  '#F4B6B6', // pink muda
  '#FF4500', // oranye kemerahan
  '#FF7F50', // coral terang
  '#FF6347', // tomato
  '#CD5C5C', // indian red
  '#DC143C', // crimson
];


const cardClass = `
  rounded-xl
  p-4
  bg-red-50
  border border-red-100
  shadow-lg
  transition
  duration-300
  ease-out
  hover:shadow-xl
  hover:-translate-y-1
`;

const isMobile =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none)').matches;


/* =======================
   ACTIVE SLICE (DONUT)
======================= */
const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 8}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

/* =======================
   COMPONENT
======================= */
export default function StatsPanel() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);
  const [topics, setTopics] = useState<any[]>([]);
  const [jurnal, setJurnal] = useState<any[]>([]);
  const [yearData, setYearData] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);

    async function fetchStats() {
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE_URL;

        if (!base) {
          console.error('NEXT_PUBLIC_API_BASE_URL belum diset');
          return;
        }

        const res = await fetch(`${base}/statistic`);
        console.log("RAW RESPONSE:", res);
        const json = await res.json();

        if (!json.status) {
          console.error('API return status false');
          return;
        }

        /* =======================
           TOPICS
        ======================= */
        setTopics(
          (json.topTopics ?? []).map((t: any) => ({
            name: t.topic,
            value: t.count,
          }))
        );

        /* =======================
           DONUT - PUBLICATIONS (5 tahun terakhir)
        ======================= */
        const allJurnal = Object.entries(json.publicationsPerYear ?? {}).map(
          ([year, total]) => ({ name: year, value: total as number })
        );
        const lastJurnal = allJurnal
          .sort((a, b) => Number(b.name) - Number(a.name)) // urut descending
          .slice(0, 6) // ambil 5 terakhir
          .reverse(); // tampil dari lama ke baru
        setJurnal(lastJurnal);

        /* =======================
           BAR - CITATIONS (5 tahun terakhir)
        ======================= */
        const allYearData = Object.entries(json.citationsPerYear ?? {}).map(
          ([year, total]) => ({ year, total: total as number })
        );
        const lastYearData = allYearData
          .sort((a, b) => Number(b.year) - Number(a.year))
          .slice(0, 6)
          .reverse();
        setYearData(lastYearData);

      } catch (err) {
        console.error('Failed to fetch statistics:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <p className="text-xs text-gray-400 text-center">
        Loading statistics...
      </p>
    );
  }

  const maxValue =
    topics.length > 0 ? Math.max(...topics.map((t) => t.value)) : 1;

  return (
    <div className="space-y-4">
      {/* =======================
          TOPICS LIST
      ======================= */}
      <div className={cardClass}>
        <h3 className="text-sm font-semibold mb-4">
          Top 5 Telkom University Research Topics
        </h3>

        <ul className="space-y-3">
          {topics.map((topic) => {
            const percentage = (topic.value / maxValue) * 100;

            return (
              <li key={topic.name} className="flex items-center gap-3">
                <span className="w-20 text-xs truncate text-right">
                  {topic.name}
                </span>

                <div className="flex-1 bg-gray-200 rounded-lg h-6 overflow-hidden">
                  <div
                    className="h-full bg-red-700 rounded-lg transition-all duration-700"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="w-10 text-right text-xs text-gray-500">
                  {topic.value}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* =======================
          DONUT CHART
      ======================= */}
      <div className={cardClass}>
        <h3 className="text-sm font-semibold mb-3">
          Journal Publications by Telkom University per Year (Last 5 Years)
        </h3>

        <div className="w-full h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={jurnal}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                activeShape={renderActiveShape}
                onMouseEnter={(_, index) => !isMobile && setActiveIndex(index)}
                stroke="none"
              >
                {jurnal.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
              contentStyle={{
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#ffffff',
                  color: '#9D0009',
                  fontSize: '12px',
                }}
                itemStyle={{ color: '#9D0009' }}
                formatter={(value, name) => [`${value} publications`, ` ${name}`]}
                />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* LEGEND */}
          <ul className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
            {jurnal.map((item, i) => (
              <li key={item.name} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-gray-700">{item.name}</span>
              </li>
            ))}
          </ul>
      </div>

      {/* =======================
          BAR CHART
      ======================= */}
      <div className={cardClass}>
        <h3 className="text-sm font-semibold mb-2">
          Citations of Telkom University Journals per Year (Last 5 Years)
        </h3>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%" style={{ outline: 'none' }}>
            <BarChart data={yearData}>
              <XAxis tick={{ fontSize: 12, fill: '#6b7280' }} dataKey="year" />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip
                cursor={{ fill: 'rgba(157, 0, 9, 0.05)' }}
                contentStyle={{
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#ffffff',
                  fontSize: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                }}
                labelStyle={{ color: '#9D0009', fontWeight: 1200 }}
                itemStyle={{ color: '#9D0009' }}
                formatter={(value) => [`${value} citations`, 'Total']}
              />
              <Bar dataKey="total" fill="#9D0009" radius={[6, 6, 0, 0]} animationDuration={800} stroke="none" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

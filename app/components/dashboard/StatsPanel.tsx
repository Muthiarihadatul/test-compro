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
   DATA
======================= */
const topics = [
  { name: 'AI & Machine Learning', value: 520 },
  { name: 'Networking', value: 200 },
  { name: 'IoT', value: 390 },
  { name: 'Data Science', value: 450 },
  { name: 'Cyber Security', value: 250 },
];

const jurnal = [
  { name: '2020', value: 100 },
  { name: '2021', value: 50 },
  { name: '2022', value: 80 },
  { name: '2024', value: 20 },
  { name: '2025', value: 90 },
];

const yearData = [
  { year: '2020', total: 8 },
  { year: '2021', total: 12 },
  { year: '2022', total: 3 },
  { year: '2023', total: 22 },
  { year: '2024', total: 10 },
];

const COLORS = ['#9D0009', '#C21C1C', '#E54B4B', '#F08080', '#F4B6B6'];

/* =======================
   ACTIVE SLICE RENDER
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
      outerRadius={outerRadius + 8} // ⬅️ efek “menonjol”
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

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

/* =======================
   COMPONENT
======================= */
export default function StatsPanel() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const maxValue = Math.max(...topics.map((t) => t.value));

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
                <span className="w-32 text-xs truncate text-right">
                  {topic.name}
                </span>

                <div className="flex-1 bg-gray-200 rounded-lg h-6 overflow-hidden flex justify-end">
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
          Journal Publications by Telkom University per Year
        </h3>

        <div className="w-full h-[200px] recharts-clean">
          <ResponsiveContainer width="100%" height="100%" style={{ outline: 'none' }}>
            <PieChart>
              <Pie
                data={jurnal}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                stroke="none"
              >
                {jurnal.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i % COLORS.length]}
                    stroke="none"
                  />
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
                style={{
                  backgroundColor: COLORS[i % COLORS.length],
                }}
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
          Citations of Telkom University Journals per Year
        </h3>

        <div className="w-full h-[300px] recharts-clean">
          <ResponsiveContainer width="100%" height="100%" style={{ outline: 'none' }}>
            <BarChart data={yearData}>
            <XAxis dataKey="year" />
            <YAxis />

            <Tooltip
                cursor={{ fill: 'rgba(157, 0, 9, 0.05)' }}
                contentStyle={{
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#ffffff',
                    fontSize: '12px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                }}
                labelStyle={{
                    color: '#9D0009',
                    fontWeight: 600,
                }}
                itemStyle={{
                    color: '#9D0009',
                }}
                formatter={(value) => [`${value} citations`, 'Total']}
            />

            <Bar
                dataKey="total"
                fill="#9D0009"
                radius={[6, 6, 0, 0]}
                animationDuration={800}
                stroke="none"
            />
            </BarChart>

          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

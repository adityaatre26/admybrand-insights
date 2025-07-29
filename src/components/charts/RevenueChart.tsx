import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";

const data7Days = [
  { name: 'Mon', revenue: 2400, users: 1200 },
  { name: 'Tue', revenue: 1398, users: 1100 },
  { name: 'Wed', revenue: 9800, users: 1350 },
  { name: 'Thu', revenue: 3908, users: 1450 },
  { name: 'Fri', revenue: 4800, users: 1300 },
  { name: 'Sat', revenue: 3800, users: 1100 },
  { name: 'Sun', revenue: 4300, users: 1250 },
];

const data30Days = [
  { name: 'Week 1', revenue: 24000, users: 8200 },
  { name: 'Week 2', revenue: 13980, users: 7100 },
  { name: 'Week 3', revenue: 35600, users: 9350 },
  { name: 'Week 4', revenue: 45000, users: 11450 },
];

const dataYear = [
  { name: 'Jan', revenue: 45000, users: 25000 },
  { name: 'Feb', revenue: 52000, users: 28000 },
  { name: 'Mar', revenue: 48000, users: 26000 },
  { name: 'Apr', revenue: 61000, users: 32000 },
  { name: 'May', revenue: 55000, users: 30000 },
  { name: 'Jun', revenue: 67000, users: 35000 },
  { name: 'Jul', revenue: 72000, users: 38000 },
  { name: 'Aug', revenue: 69000, users: 36000 },
  { name: 'Sep', revenue: 75000, users: 40000 },
  { name: 'Oct', revenue: 78000, users: 41000 },
  { name: 'Nov', revenue: 82000, users: 43000 },
  { name: 'Dec', revenue: 85000, users: 45000 },
];

type TimeFilter = '7d' | '30d' | '1y';

const timeFilters = {
  '7d': { label: 'Last 7 days', data: data7Days },
  '30d': { label: 'Last month', data: data30Days },
  '1y': { label: 'Last year', data: dataYear },
};

export const RevenueChart = () => {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>('7d');
  const currentData = timeFilters[activeFilter].data;

  const handleDownload = (format: 'png' | 'svg' | 'pdf') => {
    // Simulate download functionality
    console.log(`Downloading chart as ${format}`);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          className="glass p-4 rounded-lg border border-card-border shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
        >
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-foreground-muted">
                {entry.dataKey === 'revenue' ? 'Revenue' : 'Users'}:
              </span>
              <span className="text-sm font-medium text-foreground">
                {entry.dataKey === 'revenue' 
                  ? `$${entry.value.toLocaleString()}`
                  : entry.value.toLocaleString()
                }
              </span>
            </div>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="card-premium h-96"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Revenue & Users</h3>
          <p className="text-sm text-foreground-muted">
            {timeFilters[activeFilter].label}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Time filters */}
          <div className="flex items-center space-x-1 glass rounded-lg p-1">
            {Object.entries(timeFilters).map(([key, filter]) => (
              <Button
                key={key}
                variant={activeFilter === key ? "default" : "ghost"}
                size="sm"
                className={`text-xs ${
                  activeFilter === key 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-card-hover'
                }`}
                onClick={() => setActiveFilter(key as TimeFilter)}
              >
                <Calendar className="w-3 h-3 mr-1" />
                {filter.label.split(' ').slice(-2).join(' ')}
              </Button>
            ))}
          </div>
          
          {/* Download menu */}
          <div className="flex items-center space-x-1 glass rounded-lg p-1">
            {['PNG', 'SVG', 'PDF'].map((format) => (
              <Button
                key={format}
                variant="ghost"
                size="sm"
                className="text-xs hover:bg-card-hover"
                onClick={() => handleDownload(format.toLowerCase() as any)}
              >
                <Download className="w-3 h-3 mr-1" />
                {format}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={currentData}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))"
            opacity={0.3}
          />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--foreground-muted))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="hsl(var(--foreground-muted))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ 
              paddingTop: '20px',
              fontSize: '12px',
              color: 'hsl(var(--foreground-muted))'
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--chart-1))"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: 'hsl(var(--chart-1))', strokeWidth: 2 }}
            name="Revenue"
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="hsl(var(--chart-2))"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: 'hsl(var(--chart-2))', strokeWidth: 2 }}
            name="Users"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
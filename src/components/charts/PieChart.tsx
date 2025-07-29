import { useState } from "react";
import { motion } from "framer-motion";
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from "recharts";
import { Button } from "@/components/ui/button";
import { Download, Eye, EyeOff } from "lucide-react";

const trafficData = [
  { name: 'Organic Search', value: 35, color: 'hsl(var(--chart-1))' },
  { name: 'Direct', value: 28, color: 'hsl(var(--chart-2))' },
  { name: 'Social Media', value: 18, color: 'hsl(var(--chart-3))' },
  { name: 'Email Campaigns', value: 12, color: 'hsl(var(--chart-4))' },
  { name: 'Referrals', value: 7, color: 'hsl(var(--chart-5))' },
];

const deviceData = [
  { name: 'Desktop', value: 52, color: 'hsl(var(--chart-1))' },
  { name: 'Mobile', value: 38, color: 'hsl(var(--chart-2))' },
  { name: 'Tablet', value: 10, color: 'hsl(var(--chart-3))' },
];

type DataType = 'traffic' | 'device';

export const PieChart = () => {
  const [activeData, setActiveData] = useState<DataType>('traffic');
  const [hiddenSegments, setHiddenSegments] = useState<string[]>([]);
  
  const currentData = activeData === 'traffic' ? trafficData : deviceData;
  const filteredData = currentData.filter(item => !hiddenSegments.includes(item.name));

  const handleDownload = (format: 'png' | 'svg' | 'pdf') => {
    console.log(`Downloading pie chart as ${format}`);
  };

  const toggleSegment = (name: string) => {
    setHiddenSegments(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <motion.div
          className="glass p-4 rounded-lg border border-card-border shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: data.payload.color }}
            />
            <span className="text-sm font-medium text-foreground">
              {data.name}
            </span>
          </div>
          <div className="text-lg font-bold text-foreground">
            {data.value}%
          </div>
          <div className="text-xs text-foreground-muted">
            of total {activeData === 'traffic' ? 'traffic' : 'device usage'}
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 40; // Position labels outside the pie
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="hsl(var(--foreground))" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <motion.div
      className="card-premium h-[500px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {activeData === 'traffic' ? 'Traffic Sources' : 'Device Distribution'}
          </h3>
          <p className="text-sm text-foreground-muted">
            {activeData === 'traffic' ? 'Where your visitors come from' : 'How users access your site'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Data type filters */}
          <div className="flex items-center space-x-1 glass rounded-lg p-1">
            <Button
              variant={activeData === 'traffic' ? "default" : "ghost"}
              size="sm"
              className={`text-xs ${
                activeData === 'traffic' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-card-hover'
              }`}
              onClick={() => setActiveData('traffic')}
            >
              Traffic
            </Button>
            <Button
              variant={activeData === 'device' ? "default" : "ghost"}
              size="sm"
              className={`text-xs ${
                activeData === 'device' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-card-hover'
              }`}
              onClick={() => setActiveData('device')}
            >
              Devices
            </Button>
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

      <div className="flex items-center h-[400px]">
        {/* Chart */}
        <div className="flex-1 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={120}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Interactive Legend */}
        <div className="w-64 ml-6">
          <h4 className="text-sm font-medium text-foreground mb-4">
            Interactive Legend
          </h4>
          <div className="space-y-3">
            {currentData.map((item, index) => {
              const isHidden = hiddenSegments.includes(item.name);
              return (
                <motion.div
                  key={item.name}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                    isHidden ? 'opacity-50 bg-card-hover/50' : 'hover:bg-card-hover'
                  }`}
                  onClick={() => toggleSegment(item.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {item.name}
                      </div>
                      <div className="text-xs text-foreground-muted">
                        {item.value}%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-mono text-foreground">
                      {item.value}%
                    </div>
                    {isHidden ? (
                      <EyeOff className="w-4 h-4 text-foreground-muted" />
                    ) : (
                      <Eye className="w-4 h-4 text-foreground-muted" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
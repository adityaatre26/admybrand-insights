import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import { downloadChartAsPNG } from "@/lib/chartDownload";

const monthlyData = [
  { month: "Jan", conversions: 156, clicks: 2400, impressions: 12000 },
  { month: "Feb", conversions: 198, clicks: 1398, impressions: 10500 },
  { month: "Mar", conversions: 234, clicks: 3200, impressions: 15600 },
  { month: "Apr", conversions: 189, clicks: 2800, impressions: 13400 },
  { month: "May", conversions: 267, clicks: 3908, impressions: 18200 },
  { month: "Jun", conversions: 298, clicks: 4100, impressions: 19800 },
  { month: "Jul", conversions: 245, clicks: 3600, impressions: 16900 },
  { month: "Aug", conversions: 312, clicks: 4300, impressions: 20100 },
  { month: "Sep", conversions: 289, clicks: 3900, impressions: 18500 },
  { month: "Oct", conversions: 334, clicks: 4600, impressions: 21200 },
  { month: "Nov", conversions: 378, clicks: 5200, impressions: 24100 },
  { month: "Dec", conversions: 423, clicks: 5800, impressions: 26800 },
];

const quarterlyData = [
  { period: "Q1 2024", conversions: 588, clicks: 7000, impressions: 38100 },
  { period: "Q2 2024", conversions: 754, clicks: 10808, impressions: 51400 },
  { period: "Q3 2024", conversions: 846, clicks: 11800, impressions: 55500 },
  { period: "Q4 2024", conversions: 1135, clicks: 15600, impressions: 72100 },
];

type Period = "monthly" | "quarterly";

export const BarChart = () => {
  const [activePeriod, setActivePeriod] = useState<Period>("monthly");
  const currentData = activePeriod === "monthly" ? monthlyData : quarterlyData;

  const handleDownload = async () => {
    await downloadChartAsPNG("bar-chart", "campaign-performance-chart");
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
            <div key={index} className="flex items-center space-x-2 mb-1">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-foreground-muted capitalize">
                {entry.dataKey}:
              </span>
              <span className="text-sm font-medium text-foreground">
                {entry.value.toLocaleString()}
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
      id="bar-chart"
      className="card-premium h-[550px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="mb-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-foreground">
            Campaign Performance
          </h3>
          <p className="text-sm text-foreground-muted">
            {activePeriod === "monthly"
              ? "Monthly breakdown"
              : "Quarterly overview"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          {/* Period filters */}
          <div className="flex items-center space-x-1 glass rounded-lg p-1">
            <Button
              variant={activePeriod === "monthly" ? "default" : "ghost"}
              size="sm"
              className={`text-xs min-h-[44px] touch-manipulation ${
                activePeriod === "monthly"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-card-hover"
              }`}
              onClick={() => setActivePeriod("monthly")}
            >
              <Calendar className="w-3 h-3 mr-1" />
              Monthly
            </Button>
            <Button
              variant={activePeriod === "quarterly" ? "default" : "ghost"}
              size="sm"
              className={`text-xs min-h-[44px] touch-manipulation ${
                activePeriod === "quarterly"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-card-hover"
              }`}
              onClick={() => setActivePeriod("quarterly")}
            >
              <Calendar className="w-3 h-3 mr-1" />
              Quarterly
            </Button>
          </div>

          {/* Download button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-xs hover:bg-card-hover glass rounded-lg p-2 min-h-[44px] min-w-[44px] touch-manipulation"
            onClick={handleDownload}
          >
            <Download className="w-3 h-3 mr-1" />
            PNG
          </Button>
        </div>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={currentData}
            barGap={8}
            margin={{ top: 20, right: 15, left: 10, bottom: 40 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              opacity={0.3}
            />
            <XAxis
              dataKey={activePeriod === "monthly" ? "month" : "period"}
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
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "12px",
                color: "hsl(var(--foreground-muted))",
              }}
            />
            <Bar
              dataKey="conversions"
              fill="hsl(var(--chart-1))"
              radius={[2, 2, 0, 0]}
              name="Conversions"
            />
            <Bar
              dataKey="clicks"
              fill="hsl(var(--chart-2))"
              radius={[2, 2, 0, 0]}
              name="Clicks"
            />
            <Bar
              dataKey="impressions"
              fill="hsl(var(--chart-3))"
              radius={[2, 2, 0, 0]}
              name="Impressions"
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

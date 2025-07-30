import { motion } from "framer-motion";
import {
  DollarSign,
  Users,
  MousePointer,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
} from "lucide-react";
import { Navigation } from "./Navigation";
import { MetricCard } from "./MetricCard";
import { RevenueChart } from "./charts/RevenueChart";
import { BarChart } from "./charts/BarChart";
import { PieChart } from "./charts/PieChart";
import { DataTable } from "./DataTable";

const metrics = [
  {
    title: "Total Revenue",
    value: "$84.2K",
    change: 12.5,
    changeLabel: "vs last month",
    icon: <DollarSign className="w-6 h-6 text-chart-1" />,
  },
  {
    title: "Active Users",
    value: "45.2K",
    change: 8.3,
    changeLabel: "vs last month",
    icon: <Users className="w-6 h-6 text-chart-2" />,
  },
  {
    title: "Conversions",
    value: "2.4K",
    change: -2.1,
    changeLabel: "vs last month",
    icon: <MousePointer className="w-6 h-6 text-chart-3" />,
  },
  {
    title: "Growth Rate",
    value: "15.8%",
    change: 5.2,
    changeLabel: "vs last quarter",
    icon: <TrendingUp className="w-6 h-6 text-chart-4" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const Dashboard = () => {
  return (
    <div className="min-h-screen mesh-bg-subtle">
      <Navigation />

      <motion.main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pt-20 sm:pt-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-6 sm:mb-8" variants={sectionVariants}>
          <div className="flex items-center space-x-3 mb-2">
            <BarChart3 className="w-6 sm:w-8 h-6 sm:h-8 text-chart-1" />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Analytics Overview
            </h1>
          </div>
          <p className="text-sm sm:text-base text-foreground-muted">
            Comprehensive insights into your digital marketing performance
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
          variants={sectionVariants}
        >
          {metrics.map((metric, index) => (
            <MetricCard key={metric.title} {...metric} delay={index * 0.1} />
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          className="space-y-6 sm:space-y-8 mb-6 sm:mb-8"
          variants={sectionVariants}
        >
          {/* Revenue Chart */}
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="w-5 h-5 text-chart-1" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">
              Performance Trends
            </h2>
          </div>
          <RevenueChart />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            <BarChart />
            <PieChart />
          </div>
        </motion.div>

        {/* Data Table Section */}
        <motion.div variants={sectionVariants}>
          <div className="flex items-center space-x-2 mb-4 sm:mb-6">
            <PieChartIcon className="w-5 h-5 text-chart-2" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">
              Detailed Analytics
            </h2>
          </div>
          <DataTable />
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-12 sm:mt-16 text-center py-6 sm:py-8 border-t border-card-border"
          variants={sectionVariants}
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-chart-1 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-foreground-muted text-sm">
              ADmyBRAND Insights &copy; 2024
            </span>
          </div>
          <p className="text-xs text-foreground-subtle">
            Advanced analytics platform for digital marketing optimization
          </p>
        </motion.footer>
      </motion.main>
    </div>
  );
};

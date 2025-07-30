import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  delay?: number;
}

export const MetricCard = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  delay = 0,
}: MetricCardProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const isPositive = change >= 0;

  // Extract numeric value for animation
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setAnimatedValue(numericValue);
          clearInterval(counter);
        } else {
          setAnimatedValue(current);
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [numericValue, delay]);

  const formatAnimatedValue = (val: number) => {
    if (value.includes("$") && value.includes("K")) {
      return `$${val.toFixed(1)}K`;
    } else if (value.includes("$")) {
      return `$${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    } else if (value.includes("K")) {
      return `${val.toFixed(1)}K`;
    } else if (value.includes("%")) {
      return `${val.toFixed(1)}%`;
    }
    return val.toLocaleString();
  };

  return (
    <motion.div
      className="metric-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground-muted mb-2">
            {title}
          </p>
          <motion.div
            className="text-3xl font-bold text-foreground mb-4 font-mono"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.2 }}
          >
            {formatAnimatedValue(animatedValue)}
          </motion.div>

          <div className="flex items-center space-x-2">
            <motion.div
              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                isPositive
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: delay + 0.4 }}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{Math.abs(change)}%</span>
            </motion.div>
            <span className="text-xs text-foreground-subtle">
              {changeLabel}
            </span>
          </div>
        </div>

        <motion.div
          className="p-3 bg-gradient-to-br from-chart-1/20 to-chart-2/20 rounded-lg"
          initial={{ rotate: -10, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.1 }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
};

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export const Skeleton = ({ className = "h-4 bg-card-hover rounded", count = 1 }: SkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          className={`${className} animate-pulse`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1
          }}
        />
      ))}
    </>
  );
};

export const MetricCardSkeleton = () => (
  <motion.div
    className="card-premium"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <Skeleton className="h-4 bg-card-hover rounded w-24 mb-2" />
        <Skeleton className="h-8 bg-card-hover rounded w-20 mb-4" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 bg-card-hover rounded w-16" />
          <Skeleton className="h-4 bg-card-hover rounded w-12" />
        </div>
      </div>
      <Skeleton className="w-12 h-12 bg-card-hover rounded-lg" />
    </div>
  </motion.div>
);

export const ChartSkeleton = ({ height = "h-96" }: { height?: string }) => (
  <motion.div
    className={`card-premium ${height}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center justify-between mb-6">
      <div>
        <Skeleton className="h-6 bg-card-hover rounded w-32 mb-2" />
        <Skeleton className="h-4 bg-card-hover rounded w-48" />
      </div>
      <div className="flex space-x-2">
        <Skeleton className="h-8 bg-card-hover rounded w-20" />
        <Skeleton className="h-8 bg-card-hover rounded w-20" />
      </div>
    </div>
    <Skeleton className="w-full h-64 bg-card-hover rounded" />
  </motion.div>
);

export const TableSkeleton = () => (
  <motion.div
    className="card-premium"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center justify-between mb-6">
      <div>
        <Skeleton className="h-6 bg-card-hover rounded w-48 mb-2" />
        <Skeleton className="h-4 bg-card-hover rounded w-64" />
      </div>
      <Skeleton className="h-8 bg-card-hover rounded w-24" />
    </div>
    
    <div className="flex items-center space-x-4 mb-6">
      <Skeleton className="h-10 bg-card-hover rounded w-64" />
      <Skeleton className="h-10 bg-card-hover rounded w-32" />
    </div>

    <div className="space-y-4">
      <div className="grid grid-cols-8 gap-4 mb-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-4 bg-card-hover rounded" />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="grid grid-cols-8 gap-4">
          {Array.from({ length: 8 }).map((_, j) => (
            <Skeleton key={j} className="h-4 bg-card-hover rounded" />
          ))}
        </div>
      ))}
    </div>
  </motion.div>
);
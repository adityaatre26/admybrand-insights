import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportToCSV } from "@/lib/csvExport";

interface DataRow {
  id: string;
  campaign: string;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  revenue: number;
  status: "active" | "paused" | "completed";
}

const mockData: DataRow[] = [
  {
    id: "1",
    campaign: "Summer Sale 2024",
    impressions: 125400,
    clicks: 3420,
    conversions: 234,
    ctr: 2.73,
    cpc: 1.25,
    revenue: 15680,
    status: "active",
  },
  {
    id: "2",
    campaign: "Brand Awareness Q2",
    impressions: 89320,
    clicks: 2130,
    conversions: 156,
    ctr: 2.38,
    cpc: 0.95,
    revenue: 9340,
    status: "active",
  },
  {
    id: "3",
    campaign: "Product Launch",
    impressions: 156780,
    clicks: 4890,
    conversions: 567,
    ctr: 3.12,
    cpc: 2.15,
    revenue: 34560,
    status: "completed",
  },
  {
    id: "4",
    campaign: "Holiday Special",
    impressions: 98450,
    clicks: 2340,
    conversions: 189,
    ctr: 2.38,
    cpc: 1.45,
    revenue: 12450,
    status: "paused",
  },
  {
    id: "5",
    campaign: "Mobile App Promo",
    impressions: 203560,
    clicks: 6780,
    conversions: 890,
    ctr: 3.33,
    cpc: 0.75,
    revenue: 45670,
    status: "active",
  },
  {
    id: "6",
    campaign: "Local Services",
    impressions: 67890,
    clicks: 1560,
    conversions: 123,
    ctr: 2.3,
    cpc: 1.85,
    revenue: 8970,
    status: "active",
  },
];

type SortKey = keyof DataRow;
type SortDirection = "asc" | "desc";

export const DataTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("revenue");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 4;

  const filteredAndSortedData = useMemo(() => {
    const filtered = mockData.filter((row) => {
      const matchesSearch = row.campaign
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || row.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return filtered;
  }, [searchTerm, sortKey, sortDirection, statusFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
    setCurrentPage(1);
  };

  const handleExport = async () => {
    setIsLoading(true);
    try {
      // Prepare data for export with cleaner column names
      const exportData = filteredAndSortedData.map((row) => ({
        "Campaign Name": row.campaign,
        Impressions: row.impressions,
        Clicks: row.clicks,
        Conversions: row.conversions,
        "CTR (%)": row.ctr,
        "CPC ($)": row.cpc,
        "Revenue ($)": row.revenue,
        Status: row.status,
      }));

      exportToCSV(exportData, "campaign-performance");
    } catch (error) {
      console.error("Error exporting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-success bg-success/10";
      case "paused":
        return "text-warning bg-warning/10";
      case "completed":
        return "text-foreground-muted bg-muted/10";
      default:
        return "text-foreground-muted bg-muted/10";
    }
  };

  return (
    <motion.div
      className="card-premium"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="mb-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-foreground">
            Campaign Performance
          </h3>
          <p className="text-sm text-foreground-muted">
            Detailed breakdown of all marketing campaigns
          </p>
        </div>

        {/* Export button moved here like other charts */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs hover:bg-card-hover glass rounded-lg p-2 min-h-[44px] min-w-[44px] touch-manipulation"
            onClick={handleExport}
            disabled={isLoading}
          >
            <Download className="w-3 h-3 mr-1" />
            {isLoading ? "Exporting..." : "CSV"}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-muted" />
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass border-card-border"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="glass-hover">
              <Filter className="w-4 h-4 mr-2" />
              Status: {statusFilter === "all" ? "All" : statusFilter}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="glass border-card-border">
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>
              All Statuses
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("active")}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("paused")}>
              Paused
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
              Completed
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-card-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-card-hover">
              <tr>
                {[
                  { key: "campaign" as SortKey, label: "Campaign" },
                  { key: "impressions" as SortKey, label: "Impressions" },
                  { key: "clicks" as SortKey, label: "Clicks" },
                  { key: "conversions" as SortKey, label: "Conversions" },
                  { key: "ctr" as SortKey, label: "CTR (%)" },
                  { key: "cpc" as SortKey, label: "CPC ($)" },
                  { key: "revenue" as SortKey, label: "Revenue ($)" },
                  { key: "status" as SortKey, label: "Status" },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="px-6 py-4 text-left text-sm font-medium text-foreground-muted cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{label}</span>
                      {sortKey === key && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {sortDirection === "asc" ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </motion.div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {isLoading
                  ? // Loading skeleton
                    Array.from({ length: itemsPerPage }).map((_, index) => (
                      <motion.tr
                        key={`skeleton-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-t border-card-border"
                      >
                        {Array.from({ length: 8 }).map((_, cellIndex) => (
                          <td key={cellIndex} className="px-6 py-4">
                            <div className="h-4 bg-card-hover rounded animate-pulse" />
                          </td>
                        ))}
                      </motion.tr>
                    ))
                  : paginatedData.map((row, index) => (
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="border-t border-card-border hover:bg-card-hover/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-foreground">
                            {row.campaign}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-foreground-muted">
                          {row.impressions.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-foreground-muted">
                          {row.clicks.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-foreground-muted">
                          {row.conversions.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-foreground-muted">
                          {row.ctr.toFixed(2)}%
                        </td>
                        <td className="px-6 py-4 text-foreground-muted">
                          ${row.cpc.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 font-medium text-foreground">
                          ${row.revenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                              row.status
                            )}`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-card-border pt-4 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-foreground-muted">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(
                currentPage * itemsPerPage,
                filteredAndSortedData.length
              )}{" "}
              of {filteredAndSortedData.length} campaigns
            </div>

            <div className="flex items-center justify-center sm:justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="glass-hover"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 p-0 ${
                        currentPage === page ? "" : "glass-hover"
                      }`}
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="glass-hover"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

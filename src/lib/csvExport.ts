import Papa from "papaparse";

export const exportToCSV = (
  data: Record<string, unknown>[],
  filename: string
): void => {
  try {
    // Convert data to CSV format
    const csv = Papa.unparse(data, {
      header: true,
      skipEmptyLines: true,
    });

    // Create blob and download link
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting to CSV:", error);
  }
};

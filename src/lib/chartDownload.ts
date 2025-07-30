import html2canvas from "html2canvas";

export const downloadChartAsPNG = async (
  elementId: string,
  filename: string
): Promise<void> => {
  try {
    // Find the chart container element
    const element = document.getElementById(elementId);
    if (!element) {
      console.error("Chart element not found");
      return;
    }

    // Create canvas from the element
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
      logging: false,
    });

    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error("Failed to create blob");
        return;
      }

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `${filename}.png`;
      link.href = url;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, "image/png");
  } catch (error) {
    console.error("Error downloading chart:", error);
  }
};

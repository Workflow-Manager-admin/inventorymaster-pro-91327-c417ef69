import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
function Reports() {
  // Dummy download logic - replace with real file/download from backend
  const download = (type) => {
    const content =
      type === "csv"
        ? "Name,Quantity,Category,Supplier\nPrinter Paper,3,Office,ABC\nBlack Pens,1,Stationary,PaperCo"
        : "Inventory Report (PDF Mock)\n\nItem: Printer Paper Qty: 3\nItem: Black Pens Qty: 1\n";
    const blob = new Blob([content], { type: type === "csv" ? "text/csv" : "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = type === "csv" ? "inventory_report.csv" : "inventory_report.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="reports-page">
      <h2>Download Reports</h2>
      <div className="report-buttons">
        <button className="btn" onClick={() => download("csv")}>
          Download CSV
        </button>
        <button className="btn" onClick={() => download("pdf")}>
          Download PDF
        </button>
      </div>
      <div className="report-info">
        <span>
          These are sample report downloads. Integrate with the backend API for real-time reporting.
        </span>
      </div>
    </div>
  );
}
export default Reports;

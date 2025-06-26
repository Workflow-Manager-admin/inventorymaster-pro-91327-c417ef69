const { generateItemReportData } = require('../services/report');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const stream = require('stream');

// PUBLIC_INTERFACE
/**
 * @swagger
 * tags:
 *   - name: Reports
 *     description: Inventory reporting
 */
class ReportController {
  /**
   * GET /reports/csv
   * Download inventory report CSV
   */
  csv(req, res) {
    const data = generateItemReportData();
    const json2csv = new Parser();
    const csv = json2csv.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment('inventory_report.csv');
    res.send(csv);
  }

  /**
   * GET /reports/pdf
   * Download inventory report PDF
   */
  pdf(req, res) {
    const data = generateItemReportData();
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    const passthrough = new stream.PassThrough();
    res.header('Content-Type', 'application/pdf');
    res.attachment('inventory_report.pdf');
    doc.pipe(passthrough);
    passthrough.pipe(res);

    doc.fontSize(16).text('Inventory Report', { align: 'center' });
    doc.moveDown();

    // Draw table header
    doc.fontSize(11);
    const cols = ['ID', 'Name', 'Quantity', 'Category', 'Supplier', 'Low Stock'];
    doc.text(cols.join(' | '));
    doc.moveDown(0.5);

    data.forEach(row => {
      doc.text(
        [row.id, row.name, row.quantity, row.category, row.supplier, row.lowStock].join(' | ')
      );
    });

    doc.end();
  }
}
module.exports = new ReportController();

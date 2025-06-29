import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generatePDFReport(jobs) {
  const doc = new jsPDF();

  // Set font before adding any text
  doc.setFont('helvetica');
  doc.setFontSize(18);

  // Use plain text title to avoid encoding issues
  doc.text('Log Job Analysis Report', 14, 22);

  const tableData = jobs.map(job => [
    job.pid,
    job.description,
    job.duration,
    job.status,
  ]);

  autoTable(doc, {
    startY: 30,
    head: [['PID', 'Description', 'Duration', 'Status']],
    body: tableData,
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 80 },
      2: { halign: 'center' },
      3: { halign: 'center' },
    }
  });

  return doc.output('arraybuffer');
}

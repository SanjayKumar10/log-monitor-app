import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { readFileSync } from 'fs';
import PDFDocument from 'pdfkit';
import { parseLogLines, analyzeJobs } from './monitor.js';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/upload', upload.single('logfile'), (req, res) => {
  const content = readFileSync(req.file.path, 'utf-8').trim().split('\n');
  const jobs = parseLogLines(content);
  const result = analyzeJobs(jobs);
  res.json({ result });
});

app.post('/report/pdf', upload.single('logfile'), (req, res) => {
  const content = readFileSync(req.file.path, 'utf-8').trim().split('\n');
  const jobs = parseLogLines(content);
  const result = analyzeJobs(jobs);

  const doc = new PDFDocument();
  res.setHeader('Content-Disposition', 'attachment; filename=log-report.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);

  doc.fontSize(20).text('Log Monitor Report', { underline: true });
  doc.moveDown();

  result.forEach(line => {
    if (line.startsWith('✅')) {
      doc.fillColor('green').text(line);
    } else if (line.startsWith('⚠️')) {
      doc.fillColor('orange').text(line);
    } else if (line.startsWith('❌')) {
      doc.fillColor('red').text(line);
    } else {
      doc.fillColor('black').text(line);
    }
  });

  doc.end();
});


app.listen(4000, () => console.log('✅ Server running on http://localhost:4000'));
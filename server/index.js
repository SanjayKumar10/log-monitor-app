import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { readFileSync } from 'fs';
import { generatePDFReport } from './report.js';
import { parseLogLines, analyzeJobs, analyzeJobsDetailed } from './monitor.js';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/upload', upload.single('logfile'), (req, res) => {
  const content = readFileSync(req.file.path, 'utf-8').trim().split('\n');
  const jobs = parseLogLines(content);
  const result = analyzeJobs(jobs);
  res.json({ result });
});

app.post('/report/pdf', upload.single('logfile'), async (req, res) => {
  const lines = readFileSync(req.file.path, 'utf-8').trim().split('\n');
  const jobs = parseLogLines(lines);
  const detailedJobs = analyzeJobsDetailed(jobs); // <- this should exist
  const pdfBuffer = generatePDFReport(detailedJobs);
  res.setHeader('Content-Type', 'application/pdf');
  res.send(Buffer.from(pdfBuffer));
});




app.listen(4000, () => console.log('✅ Server running on http://localhost:4000'));
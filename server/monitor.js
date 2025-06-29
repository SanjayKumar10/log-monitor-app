export function parseLogLines(lines) {
  const jobs = {};

  lines.forEach((line) => {
    const [timeStr, description, status, pid] = line.trim().split(',');

    const timestamp = parseTime(timeStr);
    const job = {
      time: timestamp,
      description: description.trim(),
      status: status.trim(),
      pid: pid.trim()
    };

    if (!jobs[pid]) {
      jobs[pid] = {};
    }

    if (job.status === 'START') {
      jobs[pid].start = job;
    } else if (job.status === 'END') {
      jobs[pid].end = job;
    }
  });

  return jobs;
}

export function analyzeJobs(jobs) {
  const results = [];

  for (const pid in jobs) {
    const job = jobs[pid];

    if (!job.start || !job.end) {
      results.push(`⚠️ Job ${pid} (${job.start?.description || job.end?.description || 'Unknown'}) has incomplete log entries.`);
      continue;
    }

    const durationSec = (job.end.time - job.start.time) / 1000;
    const minutes = Math.floor(durationSec / 60);
    const seconds = Math.floor(durationSec % 60);
    const durationStr = `${minutes}m ${seconds}s`;

    if (durationSec > 600) {
      results.push(`❌ ERROR: Job ${pid} (${job.start.description}) took ${durationStr} — Exceeds 10 minutes`);
    } else if (durationSec > 300) {
      results.push(`⚠️ WARNING: Job ${pid} (${job.start.description}) took ${durationStr} — Exceeds 5 minutes`);
    } else {
      results.push(`✅ Job ${pid} (${job.start.description}) took ${durationStr} — OK`);
    }
  }

  return results;
}

function parseTime(hhmmss) {
  const [h, m, s] = hhmmss.trim().split(':').map(Number);
  const now = new Date();
  now.setHours(h, m, s, 0);
  return now;
}
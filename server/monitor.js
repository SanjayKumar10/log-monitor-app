// Parses raw log lines into a structured format grouped by process ID (pid)
export function parseLogLines(lines) {
  const jobs = {};

  lines.forEach((line) => {
    const [timeStr, description, status, pid] = line.trim().split(',');

    // Parse the time and construct a job object
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

    // Store job under start or end based on status
    if (job.status === 'START') {
      jobs[pid].start = job;
    } else if (job.status === 'END') {
      jobs[pid].end = job;
    }
  });

  return jobs;
}

// Analyzes each job's duration and classifies it as OK, WARNING, or ERROR
export function analyzeJobs(jobs) {
  const results = [];

  for (const pid in jobs) {
    const job = jobs[pid];

    // Handle jobs with missing start or end logs
    if (!job.start || !job.end) {
      results.push(`⚠️ Job ${pid} (${job.start?.description || job.end?.description || 'Unknown'}) has incomplete log entries.`);
      continue;
    }

    // Calculate job duration in seconds
    const durationSec = (job.end.time - job.start.time) / 1000;
    const minutes = Math.floor(durationSec / 60);
    const seconds = Math.floor(durationSec % 60);
    const durationStr = `${minutes}m ${seconds}s`;

    // Classify job based on duration thresholds
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

// Similar to analyzeJobs, but returns structured data for use in tables or PDFs
export function analyzeJobsDetailed(jobs) {
  const results = [];

  for (const pid in jobs) {
    const job = jobs[pid];
    const description = job.start?.description || job.end?.description || 'Unknown';

    // Handle incomplete jobs
    if (!job.start || !job.end) {
      results.push({
        pid,
        description,
        duration: '-',
        status: 'INCOMPLETE',
      });
      continue;
    }

    // Calculate duration and format it
    const durationSec = (job.end.time - job.start.time) / 1000;
    const minutes = Math.floor(durationSec / 60);
    const seconds = Math.floor(durationSec % 60);
    const durationStr = `${minutes}m ${seconds}s`;

    // Classify job
    let status = 'OK';
    if (durationSec > 600) status = 'ERROR';
    else if (durationSec > 300) status = 'WARNING';

    results.push({
      pid,
      description,
      duration: durationStr,
      status,
    });
  }

  return results;
}

// Converts a "HH:MM:SS" string into a Date object (today's date with given time)
function parseTime(hhmmss) {
  const [h, m, s] = hhmmss.trim().split(':').map(Number);
  const now = new Date();
  now.setHours(h, m, s, 0); // Set time on current date
  return now;
}
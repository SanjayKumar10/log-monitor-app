import { parseLogLines, analyzeJobs } from '../monitor.js';

describe('Log Monitor', () => {
  const Logs = [
    '11:35:23,scheduled task 032, START,37980',
    '11:35:56,scheduled task 032, END,37980',
    '11:36:11,scheduled task 796, START,57672',
    '11:36:18,scheduled task 796, END,57672',
    '11:38:33,scheduled task 999, START,12345'
  ];

  test('parseLogLines correctly parses log entries', () => {
    const jobs = parseLogLines(Logs);
    expect(jobs['37980'].start.description).toBe('scheduled task 032');
    expect(jobs['37980'].end.description).toBe('scheduled task 032');
    expect(jobs['57672'].start.description).toBe('scheduled task 796');
    expect(jobs['12345'].end).toBeUndefined();
  });

  test('analyzeJobs calculates durations and identifies issues', () => {
    const jobs = parseLogLines(Logs);
    const results = analyzeJobs(jobs);

    expect(results).toContainEqual(expect.stringContaining('✅ Job 37980'));
    expect(results).toContainEqual(expect.stringContaining('✅ Job 57672'));
    expect(results).toContainEqual(expect.stringContaining('⚠️ Job 12345'));
  });
});

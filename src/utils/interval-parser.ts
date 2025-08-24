import { Interval } from '../types/interval.js';
import { isValidInteger } from './validator.js';

/**
 * Parses a string interval into an Interval object
 * @param intervalStr - String in format "start-end"
 * @returns Parsed Interval object
 * @throws Error if parsing fails
 */
export function parseInterval(intervalStr: string): Interval {
  const trimmed = intervalStr.trim();

  if (!trimmed) {
    throw new Error('Empty interval string');
  }

  const parts = trimmed.split('-');
  let start: string, end: string;

  if (trimmed.startsWith('-')) {
    if (parts.length < 3) {
      throw new Error(`Invalid interval format: ${intervalStr}`);
    }
    start = '-' + parts[1];
    end = parts.slice(2).join('-');
  } else {
    if (parts.length === 3 && parts[1] === '') {
      start = parts[0];
      end = '-' + parts[2];
    } else if (parts.length === 2) {
      start = parts[0];
      end = parts[1];
    } else {
      throw new Error(`Invalid interval format: ${intervalStr}`);
    }
  }

  if (!isValidInteger(start) || !isValidInteger(end)) {
    throw new Error(`Non-integer values in interval: ${intervalStr}`);
  }

  const startNum = parseInt(start, 10);
  const endNum = parseInt(end, 10);

  // Ensure start <= end
  return {
    start: Math.min(startNum, endNum),
    end: Math.max(startNum, endNum)
  };
}

/**
 * Parses an array of interval strings
 */
export function parseIntervals(intervalStrings: string[]): Interval[] {
  return intervalStrings.map(parseInterval);
}

/**
 * Formats an interval back to string representation
 */
export function formatInterval(interval: Interval): string {
  return `${interval.start}-${interval.end}`;
}

/**
 * Formats an array of intervals to string array
 */
export function formatIntervals(intervals: Interval[]): string[] {
  return intervals.map(formatInterval);
}
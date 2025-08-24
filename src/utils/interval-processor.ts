import { Interval } from '../types/interval.js';

/**
 * Merges overlapping and adjacent intervals
 * Time Complexity: O(n log n) - due to sorting
 * Space Complexity: O(n) - for the result array
 */
export function mergeIntervals(intervals: Interval[]): Interval[] {
  if (intervals.length <= 1) {
    return [...intervals];
  }
  
  // Sort intervals by start point
  const sorted = [...intervals].sort((a, b) => a.start - b.start);
  const merged: Interval[] = [];
  let current = { ...sorted[0] };
  
  for (let i = 1; i < sorted.length; i++) {
    const next = sorted[i];
    
    // Check if intervals overlap or are adjacent
    if (next.start <= current.end + 1) {
      // Merge intervals
      current.end = Math.max(current.end, next.end);
    } else {
      // No overlap, add current to result and move to next
      merged.push(current);
      current = { ...next };
    }
  }
  
  merged.push(current);
  return merged;
}

/**
 * Subtracts exclude intervals from include intervals
 * Time Complexity: O(n + m) where n = includes.length, m = excludes.length
 * Space Complexity: O(n + m) for the result
 */
export function subtractIntervals(includes: Interval[], excludes: Interval[]): Interval[] {
  if (includes.length === 0) {
    return [];
  }
  
  if (excludes.length === 0) {
    return [...includes];
  }
  
  const result: Interval[] = [];
  let excludeIndex = 0;
  
  for (const include of includes) {
    let currentStart = include.start;
    const includeEnd = include.end;
    
    // Skip excludes that end before current include starts
    while (excludeIndex < excludes.length && excludes[excludeIndex].end < currentStart) {
      excludeIndex++;
    }
    
    // Process all excludes that might intersect with current include
    let tempExcludeIndex = excludeIndex;
    while (tempExcludeIndex < excludes.length && excludes[tempExcludeIndex].start <= includeEnd) {
      const exclude = excludes[tempExcludeIndex];
      
      // If exclude starts after current position, add the gap
      if (exclude.start > currentStart) {
        result.push({
          start: currentStart,
          end: Math.min(exclude.start - 1, includeEnd)
        });
      }
      
      // Move current position past the exclude
      currentStart = Math.max(currentStart, exclude.end + 1);
      
      // If we've moved past the include, break
      if (currentStart > includeEnd) {
        break;
      }
      
      tempExcludeIndex++;
    }
    
    // Add remaining part of include if any
    if (currentStart <= includeEnd) {
      result.push({
        start: currentStart,
        end: includeEnd
      });
    }
  }
  
  return result;
}

/**
 * Main processing function
 * Overall Time Complexity: O((n + m) log(n + m)) - dominated by sorting
 * Overall Space Complexity: O(n + m)
 */
export function processIntervals(includes: Interval[], excludes: Interval[]): Interval[] {
  const mergedIncludes = mergeIntervals(includes);
  const mergedExcludes = mergeIntervals(excludes);
  return subtractIntervals(mergedIncludes, mergedExcludes);
}
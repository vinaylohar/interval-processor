/**
 * Validates if a string represents a valid integer
 */
export function isValidInteger(str: string): boolean {
    const num = Number(str);
    return Number.isInteger(num) && !Number.isNaN(num);
  }
  
  /**
   * Validates interval format (e.g., "10-20", "-5-15")
   */
  export function isValidIntervalFormat(intervalStr: string): boolean {
    const regex = /^\s*-?\d+\s*-\s*-?\d+\s*$/;
    return regex.test(intervalStr);
  }
  
  /**
   * Validates an array of interval strings
   */
  export function validateIntervalStrings(intervals: string[]): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!Array.isArray(intervals)) {
      errors.push('Intervals must be an array');
      return { isValid: false, errors };
    }
    
    for (const interval of intervals) {
      if (!interval || typeof interval !== 'string') {
        errors.push(`Invalid interval: ${interval}`);
        continue;
      }
      
      if (!isValidIntervalFormat(interval)) {
        errors.push(`Invalid input interval format: ${interval}. Expected format: 'start-end'`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
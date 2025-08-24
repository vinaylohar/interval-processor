/**
 * Represents an inclusive interval [start, end]
 */
export interface Interval {
    start: number;
    end: number;
}

/**
 * Request payload for REST API
 */
export interface IntervalRequest {
    includes: string[];
    excludes: string[];
}

/**
 * Response payload for REST API
 */
export interface IntervalResponse {
    result: string[];
    executionTime: number;
}

/**
 * Error response for API
 */
export interface ErrorResponse {
    error: string;
    details?: string;
}
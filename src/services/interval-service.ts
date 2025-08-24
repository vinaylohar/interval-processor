import { IntervalRequest, IntervalResponse } from '../types/interval.js';
import { parseIntervals, formatIntervals } from '../utils/interval-parser.js';
import { processIntervals } from '../utils/interval-processor.js';
import { validateIntervalStrings } from '../utils/validator.js';

/**
 * Service class for handling interval operations
 */
export class IntervalService {
    /**
     * Processes interval request and returns formatted result
     */
    static async processIntervalRequest(request: IntervalRequest): Promise<IntervalResponse> {
        const startTime = Date.now();

        // Validate input format
        const includesValidation = validateIntervalStrings(request.includes || []);
        const excludesValidation = validateIntervalStrings(request.excludes || []);

        if (!includesValidation.isValid) {
            throw new Error(`Invalid includes: ${includesValidation.errors.join(', ')}`);
        }

        if (!excludesValidation.isValid) {
            throw new Error(`Invalid excludes: ${excludesValidation.errors.join(', ')}`);
        }

        // Parse and process intervals
        const includes = parseIntervals(request.includes || []);
        const excludes = parseIntervals(request.excludes || []);
        const result = processIntervals(includes, excludes);

        const executionTime = Date.now() - startTime;

        return {
            result: formatIntervals(result),
            executionTime
        };
    }
}
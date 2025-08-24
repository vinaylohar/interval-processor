import express from 'express';
import { IntervalService } from '../services/interval-service.js';
import { IntervalRequest, ErrorResponse } from '../types/interval.js';

const router = express.Router();

router.post('/intervals', async (req, res) => {
  try {
    const request: IntervalRequest = req.body;

    if (!request || typeof request !== 'object') {
      const error: ErrorResponse = {
        error: 'Invalid request body',
        details: 'Expected object with includes and excludes arrays'
      };
      return res.status(400).json(error);
    }

    const result = await IntervalService.processIntervalRequest(request);
    res.json(result);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      error: 'Processing failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(400).json(errorResponse);
  }
});

router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'interval-processor',
    version: '1.0.0'
  });
});

export default router;
import request from 'supertest';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../src/index';

describe('Checks the common endpoints.', () => {
    // run health check to ensure sync runs
    it('should confirm that /api/health-check returns an OK', () => {
        request(app)
            .get('/api/health-check')
            .expect(httpStatus.OK);
    });
});
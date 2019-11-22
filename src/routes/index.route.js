import express from 'express';
import packageJson from '../../package';

const router = express.Router();
const baseURL = `/v${packageJson.version.split('.').shift()}`;

/* GET home page. */
router.get('/', (req, res) => 
  res.send('Hard Boilerplate.')
);

router.get('/health-check', (req, res) =>
  res.send('OK')
);

// router.use(`${baseURL}/route, xRoutes`);

export default router;
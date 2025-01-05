import Queue from 'bull';

import redisConfig from '../config/redisConfig.js';

// queue for testing
export default new Queue('testQueue', {
  redis: redisConfig
});

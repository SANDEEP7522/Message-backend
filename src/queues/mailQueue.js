import Queue from 'bull';

import redisConfig from '../config/redisConfig.js';

// mail ques for sending mail
export default new Queue('mailQueue', {
  redis: redisConfig
});

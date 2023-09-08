import serverlessHttp from 'serverless-http';

import { app } from './index';

export const handler = serverlessHttp(app);
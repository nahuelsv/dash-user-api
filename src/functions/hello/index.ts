import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'hello',        
        authorizer: {
          name: "Authorizer",
          type: "request",
          resultTtlInSeconds: 3600 // cache the result for 1 hour
        }
      },
    },
    {
      http: {
        method: 'get',
        path: 'hello',
      },
    },
  ],
};

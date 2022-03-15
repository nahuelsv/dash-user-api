import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import userService from '@services/users';
import { IUser } from '@models/user';
import { isAValidEmail } from '@libs/validators/email';

const register: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  if ( !isAValidEmail(event.body.email) )
    return formatJSONResponse({ error: 'INVALID_EMAIL_FORMAT' }, 400)
  
  let user: IUser = { ...event.body, created_at: Date.now().toString() }
  try {
    let response = await new userService().createUser(user)
    return formatJSONResponse({ message: response})
  } catch (err) {
    return formatJSONResponse({ error: err }, 400)
  }  
};

export const main = middyfy(register);

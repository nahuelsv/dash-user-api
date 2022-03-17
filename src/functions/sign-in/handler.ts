import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
//import userService from '@services/users';
import { IBaseUser } from '@models/user';
import { isAValidEmail, isAValidPassword } from '@libs/validators';
import { EValidations, EError } from '@src/enums';

const signIn: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  if ( !isAValidEmail(event.body.email) )
    return formatJSONResponse({ error: EValidations.EMAIL_FORMAT }, 400)
  
  if ( !isAValidPassword(event.body.password) )
    return formatJSONResponse({ error: EValidations.PASSWORD_LENGTH }, 400)

  let user: IBaseUser = { ...event.body }
  //try {
    //let response = await new userService().createUser(user)
    return formatJSONResponse({ message: user })
  //} catch (err) {
    return formatJSONResponse({ error: EError.SOMETHING_WRONG }, 400)
  //}  
};

export const main = middyfy(signIn);

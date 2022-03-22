import * as JWT from "jsonwebtoken";
import { generateAuthResponse } from "@src/libs/aws-authorizer";

/**
 * For now, this works as a normal JWT auth
 * But this can be used to validate if a given user
 * has permission over a X resource
 */
const Authorizer = async (event, context, callback) => {
  /* Get token from the header, change authorizer type to request */
  const token = event.headers.Authorization.replace("Bearer ", "");
  /* Arn from what resource the user is requesting */
  const methodArn = event.methodArn;

  if (!token || !methodArn) return callback(null, "Unauthorized");

  /**
   * Due to a node version, we need to use try & catch or catch the error directly in the promise 
   * - If token check fails, return unauthorized
   * - If decoded or the decoded token doesnt have an email, return deny
   * - If the user is valid and has an email allow it
  **/
  try {
    const decoded = await JWT.verify(token, process.env.JWT_SECRET)
    if (decoded && decoded.email) {
      return callback(null, generateAuthResponse(decoded.email, "Allow", methodArn))
    } else {
      return callback(null, generateAuthResponse("invalid", "Deny", methodArn))
    }  
  } catch (err) {
      return callback(null, generateAuthResponse("invalid", "Deny", methodArn))
  }
}
 

export const main = Authorizer;

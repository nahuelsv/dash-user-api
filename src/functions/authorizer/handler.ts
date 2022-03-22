import * as JWT from "jsonwebtoken";
import { generateAuthResponse } from "@src/libs/aws-authorizer";

const Authorizer = async (event, context, callback) => {
  const token = event.headers.Authorization.replace("Bearer ", "");
  const methodArn = event.methodArn;

  if (!token || !methodArn) return callback(null, "Unauthorized");

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

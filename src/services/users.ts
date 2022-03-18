import { DocumentClient } from "aws-sdk/clients/dynamodb"
import * as AWS from "aws-sdk"
import { IUser, IBaseUser } from "@models/user"
export default class userService {
    constructor(
        private docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private userTable: string = process.env["userTable"] || "dashboard_users"
    ){}
    
    async createUser(user: IUser): Promise<any> {
        try { 
            let createdUser = await this.docClient.put({
                Item: {
                    ...user
                },
                ReturnConsumedCapacity: "TOTAL",
                TableName: this.userTable
            }).promise()
            return createdUser;
        } catch (err) {
            throw err;
        }
    }

    async findUser(user: IBaseUser): Promise<IUser[]> {
        try {
            let foundUser = await this.docClient.query({
                TableName: this.userTable,
                IndexName: "authenticate-index",
                KeyConditionExpression: "email = :email and password = :password",
                ExpressionAttributeValues: {
                    ":email": user.email,
                    ":password": user.password
                }
            }).promise()
            return foundUser.Items as IUser[];
        } catch (err) {
            throw err;
        }
    }
}
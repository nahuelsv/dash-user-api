import { DocumentClient } from "aws-sdk/clients/dynamodb"
import * as AWS from "aws-sdk"
import { IUser } from "@models/user"


export default class userService {
    constructor(
        private docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private userTable: string = process.env["userTable"]
    ){}

    async createUser(user: IUser): Promise<any> {
        let createdUser = await this.docClient.put({
            Item: {
                ...user
            },
            ReturnConsumedCapacity: "TOTAL",
            TableName: this.userTable
        }).promise()        
        return createdUser.Attributes;
    }
}
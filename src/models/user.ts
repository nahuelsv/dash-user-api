export interface IBaseUser {
    email: String,
    password: String,
}
export interface IUser extends IBaseUser{
    username?: String,
    created_at: String
}
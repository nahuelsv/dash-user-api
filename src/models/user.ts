export interface IBaseUser {
    email: String,
    password: String,
}

export interface IUser {
    IBaseUser,
    username?: String,
    created_at: String
}
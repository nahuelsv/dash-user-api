/**
 * Regex email validation
 */ 
export const isAValidEmail = (email: string) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))

/**
 * Password length between 6 and 16
 */
export const isAValidPassword = (password: string) => (password.length >= 8 && password.length <= 16)


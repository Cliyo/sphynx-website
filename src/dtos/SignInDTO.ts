export type SignInDTO = {
  token: string
  isAdmin: boolean
}

export type SignInDecodedDTO = {
  exp: number
  iss: string
  sub: string
}

export type AuthDTO = SignInDecodedDTO & {
  isAuthenticated: boolean
  isAdmin: boolean
}

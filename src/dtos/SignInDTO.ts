export type SignInDTO = {
  token: string
}

export type SignInDecodedDTO = {
  exp: number
  iss: string
  sub: string
  name: string
  isAdmin: boolean
}

export type AuthDTO = SignInDecodedDTO & {
  isAuthenticated: boolean
}

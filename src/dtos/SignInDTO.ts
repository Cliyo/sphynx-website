export type SignInDTO = {
  token: string
}

export type SignInDecodedDTO = {
  exp: number
  iss: string
  sub: string
}

export type AuthDTO = SignInDecodedDTO & {
  isAuthenticated: boolean
}

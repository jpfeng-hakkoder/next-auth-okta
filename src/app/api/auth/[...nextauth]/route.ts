import NextAuth from 'next-auth'
import OktaProvider from 'next-auth/providers/okta'

const {
    OKTA_CLIENT_ID = 'No client ID',
    OKTA_CLIENT_SECRET = 'No client secret',
    OKTA_ISSUER = 'No issuer'
} = process.env

export const authOptions = {
    providers: [
        OktaProvider({
            clientId: OKTA_CLIENT_ID,
            clientSecret: OKTA_CLIENT_SECRET,
            issuer: OKTA_ISSUER
        })
    ]
}

const handler = NextAuth(authOptions)

export {
    handler as GET,
    handler as POST
}
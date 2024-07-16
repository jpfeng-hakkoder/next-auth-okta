import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import { OAuthConfig } from "next-auth/providers/index"
import { OktaProfile } from "next-auth/providers/okta"
import OktaProvider from 'next-auth/providers/okta'
  
const {
    OKTA_CLIENT_ID = 'No client ID',
    OKTA_CLIENT_SECRET = 'No client secret',
    OKTA_ISSUER = 'No issuer'
} = process.env


const PROVIDERS: OAuthConfig<OktaProfile>[] = [
    OktaProvider({
        clientId: OKTA_CLIENT_ID,
        clientSecret: OKTA_CLIENT_SECRET,
        issuer: OKTA_ISSUER
    })
]

  // You'll need to import and pass this
  // to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
  export const config = {
    providers: PROVIDERS, // rest of your config
  } satisfies NextAuthOptions
  
  // Use it in server contexts
  export function auth(
    ...args:
      | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
      | [NextApiRequest, NextApiResponse]
      | []
  ) {
    return getServerSession(...args, config)
  }

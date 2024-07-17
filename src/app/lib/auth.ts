import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next"
import type { Account, CallbacksOptions, NextAuthOptions, Profile, TokenSet, User } from "next-auth"
import { getServerSession } from "next-auth"
import { OAuthConfig } from "next-auth/providers/index"
import { OktaProfile } from "next-auth/providers/okta"
import OktaProvider from 'next-auth/providers/okta'
import * as jose from 'jose'

const { decodeJwt } = jose

const OKTA = 'okta'

const {
    OKTA_CLIENT_ID = 'No client ID',
    OKTA_CLIENT_SECRET = 'No client secret',
    OKTA_ISSUER = 'No issuer',
    NEXTAUTH_SECRET = ''
} = process.env

const PROVIDERS: OAuthConfig<OktaProfile>[] = [
    OktaProvider({
        clientId: OKTA_CLIENT_ID,
        clientSecret: OKTA_CLIENT_SECRET,
        issuer: OKTA_ISSUER,
        profile(profile, tokens) {
          let groups: string[] = []
          // 1. Decode id_token JWT
          if (tokens.id_token) {
            // 2. Extract groups
            const { Groups } = decodeJwt<{ Groups: string[] }>(tokens.id_token)
            groups = Groups
          }

          return {
            id: profile.sub,
            name: profile.name ?? profile.preferred_username,
            email: profile.email,
            image: profile.picture,
            // 3. Return for other callbacks to have access
            groups
          }
        },
    })
]

const callbacks: Partial<CallbacksOptions<Profile, Account>> | undefined = {
  async jwt({ account, token, user }) {    
    if (account?.provider === OKTA && user.groups) {
        token.groups = user.groups
    }
    /**
     *  3. Forward token with groups data to session function below
     *  */
    return token
  },
  async session({ session, token }) {
    
    // console.log('[callbacks.session]', { groups: token.groups });
    session.groups = token.groups
    return session
  }
}

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const authOptions = {
  providers: PROVIDERS, // rest of your config
  callbacks
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions)
}


declare module "next-auth" {
  interface Session {
    groups: string[]
  }
  interface User {
    groups: string[]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    groups: string[]
  }
}
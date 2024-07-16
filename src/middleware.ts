import { withAuth } from "next-auth/middleware"

const PUBLIC_PATHS = [
  '/',
  '/public-page'
]

export default withAuth({
  pages: {
    signIn: "/auth/signin",
    error: "/error",
  },
  callbacks: {
    authorized({ req, token }) {
      const { pathname } = req.nextUrl

      // Destination path is public    
      if (PUBLIC_PATHS.includes(pathname)) {
        return true
      }

      // User is NOT authenticated
      if (!token) {
        return false
      }

      return true
    }
  },
})



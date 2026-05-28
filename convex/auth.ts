import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { assertValidUsername, normalizeUsername } from "./lib/username";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        const username = normalizeUsername(String(params.username ?? ""));
        assertValidUsername(username);
        return { email: username };
      },
    }),
  ],
});

export interface CredentialBundleInput {
  origin: string;
  username: string;
  password: string;
}

export function formatCredentialBundle({
  origin,
  username,
  password,
}: CredentialBundleInput): string {
  const cleanOrigin = origin.replace(/\/+$/, "");
  return [
    "Welcome to ScienceUtsav Classroom!",
    "",
    "Your teacher account is ready.",
    "",
    `Sign in: ${cleanOrigin}/sign-in`,
    `Username: ${username}`,
    `Password: ${password}`,
    "",
    "How to use:",
    "1. Open the link above and sign in with these credentials.",
    '2. Go to "My Classes" to create a class and add students.',
    "3. Open a class to choose kits and enter scores.",
    "4. Use the class report to share scores with parents.",
    "",
    "Keep this message — your password won't be shown again.",
    "If you lose it, ask your admin to reset it for you.",
  ].join("\n");
}

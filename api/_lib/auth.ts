export function isAdminAuthorized(authHeader?: string | null): boolean {
  const password = process.env.ADMIN_PASSWORD || "nss-admin";
  if (!authHeader?.startsWith("Bearer ")) return false;
  return authHeader.slice(7) === password;
}

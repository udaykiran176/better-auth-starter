import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const getBaseUrl = () => {
  // In the browser, use the current origin
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // For server-side, use the environment variable
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
    baseURL: getBaseUrl(),
    plugins: [
        organizationClient()
    ]
});
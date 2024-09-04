import { z } from "zod";

const envSchema = z.object({
  VITE_GIT_VERSION: z.string(),
  VITE_ROLLBAR_ACCESS_TOKEN_CLIENT: z.string(),
});

/**
 * When the application is rendered in a server side rendered environment,
 * the server side will inject the __recollect object.
 */
export const loadEnv = () => {
  const env = envSchema.parse({
    ...import.meta.env,
  });
  return env;
};

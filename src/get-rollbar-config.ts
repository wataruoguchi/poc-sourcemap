import { loadEnv } from "./load-env";

// These variables are configured in `vite.config.ts`
const {
  VITE_ROLLBAR_ACCESS_TOKEN_CLIENT: accessToken,
  VITE_GIT_VERSION: codeVersion,
} = loadEnv();

// https://docs.rollbar.com/docs/react#usage-and-reference
// https://docs.rollbar.com/docs/react-ts#quick-start

export const rollbarConfig =
  accessToken?.length > 0
    ? {
        accessToken,
        captureUncaught: true,
        captureUnhandledRejections: true,
        environment: import.meta.env.MODE,
        codeVersion,
        payload: {
          client: {
            javascript: {
              source_map_enabled: true,
              code_version: codeVersion,
            },
          },
        },
      }
    : undefined;

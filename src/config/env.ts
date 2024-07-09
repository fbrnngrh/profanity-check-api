import { z } from 'zod';

const envSchema = z.object({
  DB_HOST: z.string().default('localhost'),
  DB_USER: z.string().default('root'),
  DB_PASSWORD: z.string().default(''),
  DB_NAME: z.string(),
  JWT_SECRET: z.string(),
});

type EnvType = z.infer<typeof envSchema>;

const env = envSchema.parse(process.env) as EnvType;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvType {}
  }
}

export function getEnv(): EnvType {
  return env;
}

export default env;
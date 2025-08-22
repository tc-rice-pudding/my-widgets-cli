import envMap from './env';

// eslint-disable-next-line import/prefer-default-export
export const isValidEnv = (env: string): env is keyof typeof envMap => {
  return env in envMap;
};

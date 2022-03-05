export const rescue: <T>(error: unknown, type: T) => asserts error is T = (
  error,
  type
) => {
  // @ts-ignore
  if (!(error instanceof type)) throw error;
};

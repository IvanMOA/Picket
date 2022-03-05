import { rescue } from "./rescue";
export const swallowAsync: <T extends abstract new (...args: any) => any>(
  type: InstanceType<T>,
  fail: (type: InstanceType<T>) => any
) => <FnArgs extends any[], R1>(
  fn: (...args: FnArgs) => Promise<R1>
) => (...args: FnArgs) => Promise<R1> =
  (type, fail) =>
  (fn) =>
  async (...args) => {
    try {
      return await fn(...args);
    } catch (e) {
      rescue(e, type);
      return fail(e);
    }
  };

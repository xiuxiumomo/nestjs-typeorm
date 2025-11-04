/*
 * @Author: xiuxiumomo
 * @Date: 2025-11-04 14:39:07
 * @Last Modified by: xiuxiumomo
 * @Last Modified time: 2025-11-04 14:45:55
 */

/**
 *
 * @param module
 * @param action
 * @param id
 * @returns string
 */
export const gen = (module: string, action: string, id?: string | number): string => {
  return id ? `${module}:${action}:${id}` : `${module}:${action}`;
};

export const bookRedis = (ttl = 300) => {
  return {
    key: gen("book", "first-page"),
    ttl: ttl || 5 * 60,
  };
};

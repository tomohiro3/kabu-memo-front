import { includesSome } from './array';

export const containsSomeValues = (obj: { [key: string]: any }, checkValues: any[]) =>
  includesSome(Object.values(obj), checkValues);
export const containsSomeKeys = (obj: { [key: string]: any }, checkKeys: any[]) =>
  includesSome(Object.keys(obj), checkKeys);

export const hasValue = (obj: { [key: string]: any }, checkValue: any) => Object.values(obj).includes(checkValue);
export const hasKey = (obj: { [key: string]: any }, checkKey: any) => Object.keys(obj).includes(checkKey);

export function hasDuplicateElement<T extends any[]>(a: T, b: T) {
  return [...a, ...b].filter((item) => a.includes(item) && b.includes(item)).length > 0;
}

export const includesSome = (target: any[], checkEls: any[]) => checkEls.some((el) => target.includes(el));

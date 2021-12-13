type Falsy = false | null | undefined | 0;

/*
  Filters out falsy values and removes duplicates

  Usage:
  <div className={cn(cond && 'trueClass', maybeUndefinedVar, 'str', cond ? : 'trueClass' : 'falseClass')} />
*/

export default (...c: (string | Falsy)[]): string => {
  const arr = c
    .filter(Boolean)
    .map((e) => (e as string).split(" "))
    .flat();

  return Array.from(arr).join(" ");
};

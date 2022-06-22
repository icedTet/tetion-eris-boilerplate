export type PrefixParameters<
  TParameters extends [...args: any],
  TFunction extends (...args: any) => any,

  > = (
    ...args: [...TParameters, ...Parameters<TFunction>,]
  ) => ReturnType<TFunction>;
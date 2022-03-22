export const dateToDatetimeLocalString = (d: Date) => {
  const ISOString = d.toISOString().slice();
  return ISOString.slice(0, ISOString.length - 5);
};

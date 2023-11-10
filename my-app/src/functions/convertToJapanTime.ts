export const convertToJapanTime = (timestamp: string): Date => {
  const date = new Date(timestamp);
  const japanTime = new Date(date.getTime() + 9 * 3600000);
  return japanTime;
};

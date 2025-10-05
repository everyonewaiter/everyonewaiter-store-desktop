export const getFormattedTime = (time: string) => {
  const today = new Date(time);
  const ampm = today.getHours() >= 12 ? "PM" : "AM";
  const hours = today.getHours() % 12 || 12;
  const minutes = String(today.getMinutes()).padStart(2, "0");

  return `${ampm} ${hours}:${minutes}`;
};

export const formatIsoDateTo12Hour = (isoDate) => {
  const date = new Date(isoDate);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  return `${hours}:${minutes} ${ampm}`;
};

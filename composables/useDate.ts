export default function dateToString() {
  const timestamp = Date.now(); // Current timestamp
  const date = new Date(timestamp); // Convert to Date object

  // Use Intl.DateTimeFormat to format the date
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  return formattedDate;
}

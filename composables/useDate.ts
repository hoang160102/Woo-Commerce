export default function dateToString() {
  const timestamp = Date.now();
  const date = new Date(timestamp);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  return formattedDate;
}

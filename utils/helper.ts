export function capitalize(val: string) {
  if (val === "") return val;
  const firstChar = val.at(0)?.toLocaleUpperCase() || "";
  const otherChar = val.slice(1);
  return firstChar + otherChar;
}

export function formatDate(date: string | Date): string {
  if (!date) return "Unknown date";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}
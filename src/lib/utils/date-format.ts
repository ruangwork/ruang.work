export function dateFormat(
  date: string | number | Date,
  locales: Intl.LocalesArgument
) {
  const dateOptions: object = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedPublishDate = new Date(date).toLocaleDateString(
    locales,
    dateOptions
  );

  return formattedPublishDate;
}

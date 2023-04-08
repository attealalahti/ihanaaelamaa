export const shortenText = (text: string, characterLimit: number) => {
  const shortText = text.slice(0, characterLimit);
  const shortened = text.length !== shortText.length;
  const trimmedShortText = shortText.trim();
  if (shortened) return trimmedShortText + "...";
  return trimmedShortText;
};

export const dateToYYYYmmdd = (date: Date) => {
  return date
    .toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll("/", "-");
};

export const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

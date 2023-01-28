export const shortenText = (text: string, characterLimit: number) => {
  const shortText = text.slice(0, characterLimit);
  const shortened = text.length !== shortText.length;
  const trimmedShortText = shortText.trim();
  if (shortened) return trimmedShortText + "...";
  return trimmedShortText;
};

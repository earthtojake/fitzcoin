export default function shortenIfAddress(
  address: string,
  separator = "..."
): string {
  const charsStart = 4;
  const charsEnd = 4;
  const amountOfCharsToKeep = charsEnd + charsStart;

  if (amountOfCharsToKeep >= address.length || !amountOfCharsToKeep) {
    // no need to shorten
    return address;
  }

  const r = new RegExp(`^(.{${charsStart}}).+(.{${charsEnd}})$`);
  const matchResult = r.exec(address);

  if (!matchResult) {
    // if for any reason the exec returns null, the text remains untouched
    return address;
  }

  const [, textStart, textEnd] = matchResult;

  return `${textStart}${separator}${textEnd}`;
}

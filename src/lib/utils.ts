export { cn } from "cn"

/** "Dr. Helen Marsh" -> "HM". Titles ending in a full stop are skipped. */
export function initials(name: string) {
  return name
    .split(" ")
    .filter((part) => !part.endsWith("."))
    .map((part) => part.charAt(0))
    .join("")
}

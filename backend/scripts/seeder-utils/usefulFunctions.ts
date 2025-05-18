// ./backend/scripts/seeder-utils/usefulFunctions.ts

// Copied these two functions here rather than point to my frontend usefulFunctions file.

/**
 * Pads a number with leading zeros to a specified length.
 *
 * @param num - The number to pad.
 * @param length - The desired string length.
 * @returns The padded string.
 *
 * **Examples:**
 * ```typescript
 * padNumber(5, 3)    // Output: '005'
 * padNumber(123, 5)  // Output: '00123'
 * padNumber(42, 2)   // Output: '42'
 * ```
 */
export const padNumber = (num: number, length: number) => {
  let str = num.toString()

  while (str.length < length) {
    str = '0' + str
  }

  return str
}


/**
 * Converts an ISO 8601 date string to MM/DD/YYYY HH:MM:SS AM/PM format.
 *
 * @param isoString - The ISO 8601 date string to convert.
 * @param options - Formatting options:
 *   - `showDate` (default `true`): Whether to include the date (MM/DD/YYYY).
 *   - `showTime` (default `true`): Whether to include the time (HH:MM:SS).
 *   - `showAmPm` (default `true`): Whether to use 12-hour format with AM/PM.
 * @returns A formatted string based on the selected options.
 *
 * **Examples:**
 * ```typescript
 * convertISO8601ToFormatted('2024-11-15T13:30:00Z')                       // Output: '11/15/2024 01:30:00 PM'
 * convertISO8601ToFormatted('2024-11-15T13:30:00Z', { showDate: false })  // Output: '01:30:00 PM'
 * convertISO8601ToFormatted('2024-11-15T13:30:00Z', { showTime: false })  // Output: '11/15/2024'
 * convertISO8601ToFormatted('2024-11-15T13:30:00Z', { showAmPm: false })  // Output: '11/15/2024 13:30:00'
 * ```
 */
export const convertISO8601ToFormatted = (isoString: string, options?: { showDate?: boolean, showTime?: boolean, showAmPm?: boolean }): string => {
  const { showDate = true, showTime = true, showAmPm = true } = options || {}

  const date = new Date(isoString)

  const month = padNumber(date.getMonth() + 1, 2)
  const day = padNumber(date.getDate(), 2)
  const year = date.getFullYear()

  const hours24 = date.getHours()
  const minutes = padNumber(date.getMinutes(), 2)
  const seconds = padNumber(date.getSeconds(), 2)

  const formattedHours = showAmPm ? padNumber(((hours24 + 11) % 12) + 1, 2) : padNumber(hours24, 2)
  const amPm = showAmPm ? (hours24 >= 12 ? 'PM' : 'AM') : ''

  let parts: string[] = []

  if (showDate) {
    parts.push(`${month}/${day}/${year}`)
  }

  if (showTime) {
    parts.push(`${formattedHours}:${minutes}:${seconds}${showAmPm ? ` ${amPm}` : ''}`)
  }

  return parts.join(' ').trim()
}

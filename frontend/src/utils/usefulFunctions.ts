// import {  } from '@/utils/usefulFunctions'

// Purpose: This file contains a bunch of functions I have found useful in many scenarios of multiple years
// of coding that I just keep inside one file. I'd rather keep this one file of a collection of functions
// than add one function at a time based on what is needed. Feels far more useful to just have this one file always.


// Type definition for the classNames function arguments
type classNamesArg = string | undefined | Record<string, boolean | null | undefined>

/**
 * Combines class names dynamically.
 *
 * @param args - A mix of strings or objects defining class names.
 * @returns A single string of combined class names.
 *
 * **Examples:**
 * ```typescript
 * classNames('btn', { 'btn-primary': true, 'btn-disabled': false })  // Output: 'btn btn-primary'
 * classNames('header', undefined, { 'active': true })                // Output: 'header active'
 * classNames()                                                       // Output: ''
 * ```
 */
export function classNames(...args: classNamesArg[]) {
  const classes: string[] = []

  for (const arg of args) {
    if (!arg) {
      continue
    }

    if (typeof arg === 'string') {
      classes.push(arg)
    } else if (arg !== null && typeof arg === 'object' && !Array.isArray(arg)) {
      Object.entries(arg).forEach(([key, value]) => {
        if (value) {
          classes.push(key)
        }
      })
    }
  }

  return classes.join(' ')
}

/**
 * Checks if a value is numeric.
 *
 * @param n - Any value to check.
 * @returns True if the value is numeric, false otherwise.
 *
 * **Examples:**
 * ```typescript
 * isNumeric(123)       // Output: true
 * isNumeric('123.45')  // Output: true
 * isNumeric('abc')     // Output: false
 * isNumeric(true)      // Output: false
 * isNumeric(null)      // Output: false
 * isNumeric({})        // Output: false
 * ```
 */
export const isNumeric = (n: any) => !isNaN(parseFloat(n)) && isFinite(n)

/**
 * Converts a number to a fixed decimal string.
 *
 * @param input - The number to format.
 * @param fractionDigits - Number of decimal places.
 * @returns The number formatted as a string.
 *
 * **Examples:**
 * ```typescript
 * toFixed(123.456, 2)    // Output: '123.46'
 * toFixed('987.654', 1)  // Output: '987.7'
 * toFixed(12, 0)         // Output: '12'
 * ```
 */
export const toFixed = (input: any, fractionDigits: number) => {
  return parseFloat(input as string).toFixed(fractionDigits)
}

/**
 * Capitalizes the first letter one or multiple words in a string.
 *
 * @param input - The string to capitalize.
 * @returns The capitalized string.
 *
 * **Examples:**
 * ```typescript
 * capitalize('hello world')     // Output: 'Hello World'
 * capitalize('MULTIPLE words')  // Output: 'Multiple Words'
 * capitalize('hello')           // Output: 'Hello'
 * capitalize('MULTIPLE')        // Output: 'Multiple'
 * capitalize('')                // Output: ''
 * ```
 */
export const capitalize = (input: string): string => {
  if (input.includes(' ')) {
    // For strings with spaces, capitalize each word
    return input
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  } else {
    // For single-word strings, capitalize the word
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
  }
}

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
 * Formats a duration in milliseconds into a human-readable time.
 *
 * @param ms - The duration in milliseconds.
 * @param includeMs - Whether to include milliseconds in the output.
 * @returns A formatted time string.
 *
 * **Examples:**
 * ```typescript
 * formatTimeDurationLeft(3661000)       // Output: '01:01:01'
 * formatTimeDurationLeft(-61000, true)  // Output: '-01:01.000'
 * formatTimeDurationLeft(45000)         // Output: '00:45'
 * formatTimeDurationLeft(-45000, false) // Output: '-00:45'
 * ```
 */
export const formatTimeDurationLeft = (ms: number, includeMs = false): string => {
  const msAbs = Math.abs(ms),
    hours = Math.floor((msAbs / (1000 * 60 * 60)) % 24),
    minutes = Math.floor((msAbs / (1000 * 60)) % 60),
    seconds = Math.floor((msAbs / 1000) % 60),
    milliseconds = Math.round(msAbs % 1000)

  let out = ''

  if (ms < 0) {
    out += '-'
  }

  if (hours > 0 || hours < 0) {
    out += padNumber(hours, 2) + ':'
  }

  out += padNumber(minutes, 2) + ':'
  out += padNumber(seconds, 2)

  if (includeMs) {
    out += '.' + padNumber(milliseconds, 3)
  }

  return out
}

/**
 * Clamps a number between a minimum and maximum value.
 *
 * @param number - The number to clamp.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The clamped number.
 *
 * **Examples:**
 * ```typescript
 * clamp(5, 1, 10)   // Output: 5
 * clamp(15, 1, 10)  // Output: 10
 * clamp(-5, 0, 8)   // Output: 0
 * ```
 */
export const clamp = (number: number, min: number, max: number) => {
  return Math.min(Math.max(number, min), max)
}

/**
 * Checks if two arrays contain the same elements.
 *
 * ⚠️ NOTE: This function mutates the input arrays via .sort(). Use copies to avoid altering original arrays.
 *
 * @param array1 - The first array.
 * @param array2 - The second array.
 * @returns True if the arrays are equal, false otherwise.
 *
 * **Examples:**
 * ```typescript
 * arraysAreEqual(['a', 'b'], ['b', 'a']) // Output: true
 * arraysAreEqual(['a', 'b'], ['a', 'c']) // Output: false
 * arraysAreEqual([], []) // Output: true
 * ```
 */
export const arraysAreEqual = (array1: string[], array2: string[]): boolean => {
  array1.sort()
  array2.sort()

  return JSON.stringify(array1) === JSON.stringify(array2)
}

/**
 * Formats a duration (in milliseconds) to the local time it ends.
 *
 * @param ms - The duration in milliseconds.
 * @param showAmPm - Whether to include AM/PM in the output.
 * @param includeMs - Whether to include milliseconds in the output (ignored in new format).
 * @returns A formatted string in MM/DD/YYYY HH:MM:SS AM/PM format.
 *
 * **Examples:**
 * ```typescript
 * formatEndTime(3600000)         // Output: '11/15/2024 01:30:00 PM'
 * formatEndTime(3600000, true)   // Output: '11/15/2024 01:30:00 PM'
 * formatEndTime(7200000, false)  // Output: '11/15/2024 13:30:00'
 * ```
 */
export const formatEndTime = (ms: number, showAmPm = true): string => {
  const endDate = new Date(Date.now() + ms),
    month = padNumber(endDate.getMonth() + 1, 2),
    day = padNumber(endDate.getDate(), 2),
    year = endDate.getFullYear(),
    hours = endDate.getHours(),
    minutes = padNumber(endDate.getMinutes(), 2),
    seconds = padNumber(endDate.getSeconds(), 2)

  const formattedHours = showAmPm ? padNumber(((hours + 11) % 12) + 1, 2) : padNumber(hours, 2)
  const amPm = showAmPm ? (hours >= 12 ? 'PM' : 'AM') : ''

  return `${month}/${day}/${year} ${formattedHours}:${minutes}:${seconds} ${showAmPm ? amPm : ''}`.trim()
}

/**
 * Converts an ISO 8601 date string to MM/DD/YYYY HH:MM:SS AM/PM format.
 *
 * @param isoString - The ISO 8601 date string to convert.
 * @param showAmPm - Whether to include AM/PM in the output.
 * @returns A formatted string in MM/DD/YYYY HH:MM:SS AM/PM format.
 *
 * **Examples:**
 * ```typescript
 * convertISO8601ToFormatted('2024-11-15T13:30:00Z')  // Output: '11/15/2024 01:30:00 PM'
 * convertISO8601ToFormatted('2024-11-15T02:30:00Z')  // Output: '11/15/2024 02:30:00 AM'
 * ```
 */
export const convertISO8601ToFormatted = (isoString: string, showAmPm = true): string => {
  const date = new Date(isoString),
    month = padNumber(date.getMonth() + 1, 2),
    day = padNumber(date.getDate(), 2),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = padNumber(date.getMinutes(), 2),
    seconds = padNumber(date.getSeconds(), 2)

  const formattedHours = showAmPm ? padNumber(((hours + 11) % 12) + 1, 2) : padNumber(hours, 2)
  const amPm = showAmPm ? (hours >= 12 ? 'PM' : 'AM') : ''

  return `${month}/${day}/${year} ${formattedHours}:${minutes}:${seconds} ${showAmPm ? amPm : ''}`.trim()
}

/**
 * Converts a date string in YYYY-MM-DD format to MM/DD/YYYY or DD/MM/YYYY format.
 *
 * ⚠️ NOTE: Throws error if the input is not in YYYY-MM-DD format.
 *
 * @param dateString - The date string in YYYY-MM-DD format.
 * @param dayFirst - Whether to display the date as DD/MM/YYYY. Defaults to false (MM/DD/YYYY).
 * @returns The formatted date string.
 *
 * **Examples:**
 * ```typescript
 * convertDateFormat('2014-10-24', false)  // Output: '10/24/2014'
 * convertDateFormat('2014-10-24', true)   // Output: '24/10/2014'
 * convertDateFormat('05-12-2020')         // Throws error
 * ```
 */
export const convertDateFormat = (dateString: string, dayFirst = false): string => {
  const [year, month, day] = dateString.split('-')

  if (!year || !month || !day) {
    throw new Error('Invalid date string format. Expected format: YYYY-MM-DD')
  }

  return dayFirst
    ? `${day}/${month}/${year}` // DD/MM/YYYY
    : `${month}/${day}/${year}` // MM/DD/YYYY
}

/**
 * Converts a Unix timestamp to MM/DD/YYYY HH:MM:SS AM/PM format.
 *
 * @param unixTimestamp - The Unix timestamp to convert.
 * @param showAmPm - Whether to include AM/PM in the output.
 * @returns A formatted string in MM/DD/YYYY HH:MM:SS AM/PM format.
 *
 * **Examples:**
 * ```typescript
 * convertUnixToFormatted(1700418600)  // Output: '11/15/2024 01:30:00 PM'
 * convertUnixToFormatted(1700415000)  // Output: '11/15/2024 12:30:00 PM'
 * convertUnixToFormatted(Date.now())  // wrong ❌ — will return a wrong date
 * ```
 */
export const convertUnixToFormatted = (unixTimestamp: number, showAmPm = true): string => {
  const date = new Date(unixTimestamp * 1000),
    month = padNumber(date.getMonth() + 1, 2),
    day = padNumber(date.getDate(), 2),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = padNumber(date.getMinutes(), 2),
    seconds = padNumber(date.getSeconds(), 2)

  const formattedHours = showAmPm ? padNumber(((hours + 11) % 12) + 1, 2) : padNumber(hours, 2)
  const amPm = showAmPm ? (hours >= 12 ? 'PM' : 'AM') : ''

  return `${month}/${day}/${year} ${formattedHours}:${minutes}:${seconds} ${showAmPm ? amPm : ''}`.trim()
}

/**
 * Converts a duration (in milliseconds) to ISO 8601 format.
 *
 * ⚠️ NOTE: When showAmPm is true, the output will not be a valid ISO 8601 string.
 *
 * @param ms - The duration in milliseconds.
 * @param showAmPm - Whether to include AM/PM in the output.
 * @param includeMs - Whether to include milliseconds in the output.
 * @returns A formatted ISO 8601 string.
 *
 * **Examples:**
 * ```typescript
 * formatToISO8601(3600000)                 // Output: '2024-11-15T13:30:00'
 * formatToISO8601(7200000, true, true)     // Output: '2024-11-15T02:30:00.000 PM' ❌ Not ISO-compliant
 * formatToISO8601(10800000, false, false)  // Output: '2024-11-15T15:30:00'
 * ```
 */
export const formatToISO8601 = (ms: number, showAmPm = false, includeMs = false): string => {
  const endDate = new Date(Date.now() + ms),
    year = endDate.getFullYear(),
    month = padNumber(endDate.getMonth() + 1, 2),
    day = padNumber(endDate.getDate(), 2),
    hours = endDate.getHours(),
    minutes = padNumber(endDate.getMinutes(), 2),
    seconds = padNumber(endDate.getSeconds(), 2),
    milliseconds = padNumber(endDate.getMilliseconds(), 3)

  const formattedHours = showAmPm ? padNumber(((hours + 11) % 12) + 1, 2) : padNumber(hours, 2)
  const amPm = showAmPm ? (hours >= 12 ? 'PM' : 'AM') : ''

  let result = `${year}-${month}-${day}T${formattedHours}:${minutes}:${seconds}`

  if (includeMs) {
    result += `.${milliseconds}`
  }

  if (showAmPm) {
    result += ` ${amPm}`
  }

  return result
}

/**
 * Converts a duration (in milliseconds) to Unix timestamp.
 * Converts Date.now() + ms to Unix timestamp in seconds.
 *
 * @param ms - The duration in milliseconds.
 * @returns The Unix timestamp.
 *
 * **Examples:**
 * ```typescript
 * formatToUnix(3600000)  // Output: 1700418600 (example based on current time)
 * formatToUnix(0)        // Output: 1700415000
 * formatToUnix(60000)    // Output: Unix time + 60 seconds.
 * ```
 */
export const formatToUnix = (ms: number): number => {
  return Math.floor((Date.now() + ms) / 1000)
}

/**
 * Creates a debounced function that delays execution.
 *
 * @param func - The function to debounce.
 * @param wait - Delay in milliseconds.
 * @returns The debounced function.
 *
 * **Examples:**
 * ```typescript
 * const log = debounce(() => console.log('Called'), 2000)
 * log() // Waits 2 seconds, then logs
 *
 * const search = debounce((query) => fetchData(query), 500)
 * input.addEventListener('input', e => search(e.target.value))
 * ```
 */
export const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout

  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Deep clones an object.
 *
 * ⚠️ NOTE: Does not support functions, class instances, Dates, Maps, Sets, or circular references.
 *
 * @param obj - The object to clone.
 * @returns A deep clone of the object.
 *
 * **Examples:**
 * ```typescript
 * const obj = { a: 1, b: { c: 2 } }
 * const clone = deepClone(obj)
 * clone.b.c = 3
 * console.log(obj.b.c)   // Output: 2
 * ```
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Converts a 0-based column index to a spreadsheet-style column letter.
 *
 * @param index - The column index (0-based).
 * @returns The corresponding column letter.
 *
 * **Examples:**
 * ```ts
 * colIndexToLetter(0)   // 'A'
 * colIndexToLetter(25)  // 'Z'
 * colIndexToLetter(26)  // 'AA'
 * colIndexToLetter(701) // 'ZZ'
 * colIndexToLetter(702) // 'AAA'
 * ```
 */
export function colIndexToLetter(index: number): string {
  let result = ''
  let n = index + 1

  while (n > 0) {
    const mod = (n - 1) % 26

    result = String.fromCharCode(65 + mod) + result
    n = Math.floor((n - mod) / 26)
  }

  return result
}

/**
 * Normalizes column width values for CSS table layout.
 * Converts numbers or raw number strings to pixel values.
 *
 * @param width - A number or string (e.g. 200, '200', '50%', '5em').
 * @returns A normalized CSS width string (e.g. '200px') or undefined if invalid.
 *
 * **Examples:**
 * ```ts
 * normalizeTableColumnWidth(100)       // '100px'
 * normalizeTableColumnWidth('250')     // '250px'
 * normalizeTableColumnWidth('80%')     // '80%'
 * normalizeTableColumnWidth('3em')     // '3em'
 * normalizeTableColumnWidth(undefined) // undefined
 * normalizeTableColumnWidth('abc')     // undefined
 * ```
 */
export function normalizeTableColumnWidth(width?: string | number): string | undefined {
  if (typeof width === 'number') {
    return `${width}px`
  }

  if (typeof width === 'string') {
    // If it already ends in a valid CSS unit
    if (width.endsWith('px') || width.endsWith('%') || width.endsWith('em') || width.endsWith('rem')) {
      return width
    }

    // Assume raw number string
    if (!isNaN(Number(width))) {
      return `${width}px`
    }
  }

  return undefined
}


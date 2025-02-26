export function any (o: Record<PropertyKey, unknown>): boolean
export function has (o: Record<PropertyKey, unknown>, k: string): boolean
export function get (o: Record<PropertyKey, unknown>, k: string): unknown

export function rail (p?: string): string
export function go (o?: Record<PropertyKey, unknown>, p?: string): boolean
export function to (o?: Record<PropertyKey, unknown>, p?: string): string

export default class Rails { // eslint-disable-line @typescript-eslint/no-extraneous-class -- Static class
  static pattern (p?: string): string
  static rail (p?: string): string
  static go (o?: Record<PropertyKey, unknown>, p?: string): boolean
  static to (o?: Record<PropertyKey, unknown>, p?: string): string
}

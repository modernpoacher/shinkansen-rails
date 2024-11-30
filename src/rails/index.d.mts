declare module '#rails/rails' {
  export function any (o: Record<PropertyKey, unknown>): boolean
  export function has (o: Record<PropertyKey, unknown>, k: string): boolean
  export function get (o: Record<PropertyKey, unknown>, k: string): unknown

  export function rail (p: string): string
  export function go (o: Record<PropertyKey, unknown>, p: string): boolean
  export function to (o: Record<PropertyKey, unknown>, p: string): boolean

  export default class Rails {
    static pattern (p: string | undefined): string
    static rail (p: string | undefined): string
    static go (o: Record<PropertyKey, unknown> | undefined, p: string | undefined): boolean
    static to (o: Record<PropertyKey, unknown> | undefined, p: string | undefined): boolean
  }
}

declare module 'shinkansen-rails/rails' {
  export { default } from '#rails/rails'
  export * from '#rails/rails'
}

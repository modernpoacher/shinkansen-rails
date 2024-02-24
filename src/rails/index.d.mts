declare module 'shinkansen-rails/rails' {
  export function any (o: Record<string, unknown> | undefined): boolean
  export function has (o: Record<string, unknown> | undefined, k: string): boolean
  export function get (o: Record<string, unknown> | undefined, k: string): unknown

  export function rail (p: string | undefined): string
  export function go (o: Record<string, unknown> | undefined, p: string | undefined): boolean
  export function to (o: Record<string, unknown> | undefined, p: string | undefined): boolean

  export default class Rails {
    static pattern (p: string | undefined): string
    static rail (p: string | undefined): string
    static go (o: Record<string, unknown> | undefined, p: string | undefined): boolean
    static to (o: Record<string, unknown> | undefined, p: string | undefined): boolean
  }
}

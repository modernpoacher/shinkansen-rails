type ObjectType = RailsTypes.ObjectType

export function any (o: ObjectType): boolean
export function has (o: ObjectType, k: string): boolean
export function get (o: ObjectType, k: string): unknown

export function rail (p?: string): string
export function go (o?: ObjectType, p?: string): boolean
export function to (o?: ObjectType, p?: string): string

export default class Rails { // eslint-disable-line @typescript-eslint/no-extraneous-class -- Static class
  static pattern (p?: string): string
  static rail (p?: string): string
  static go (o?: ObjectType, p?: string): boolean
  static to (o?: ObjectType, p?: string): string
}

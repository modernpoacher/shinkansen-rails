## `shinkansen-rails`

# Shinkansen Rails

*Rails* transforms objects into strings to be consumed by `<Link />` components for *React Router*.

## Usage

```javascript
import {
  Rails
} from 'shinkansen-rails'
```

*Rails* exposes the methods `pattern`, `go`, `to`, and `rail`.

```javascript
export class Rails {
  static pattern () { }
  static go () { }
  static to () { }
  static rail () { }
}
```

- `pattern` returns a string which is the transformation pattern
- `go` returns a boolean which describes whether an object can be transformed by the pattern
- `to` returns a string which is the product of that transformation
- `rail` caches and returns a product of `to`

The method `rail` should be used whenever the computation is (or expected to be) idempotent.

## See also

- [Shinkansen Gears](https://github.com/modernpoacher/shinkansen-gears)
- [Shinkansen Pantograph](https://github.com/modernpoacher/shinkansen-pantograph)

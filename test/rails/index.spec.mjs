import {
  expect
} from 'chai'

import Rails, {
  any,
  has,
  get,
  rail,
  go,
  to
} from '#rails/rails'

describe('#rails/rails', () => {
  it('is a function', () => {
    expect(Rails)
      .to.be.a('function')
  })

  describe('`Rails.pattern`', () => {
    it('is a function', () => {
      expect(Rails.pattern)
        .to.be.a('function')
    })
  })

  describe('`Rails.rail`', () => {
    it('is a function', () => {
      expect(Rails.rail)
        .to.be.a('function')
    })
  })

  describe('`Rails.go`', () => {
    it('is a function', () => {
      expect(Rails.go)
        .to.be.a('function')
    })
  })

  describe('`Rails.to`', () => {
    it('is a function', () => {
      expect(Rails.to)
        .to.be.a('function')
    })
  })

  describe('`any`', () => {
    it('is a function', () => {
      expect(any)
        .to.be.a('function')
    })
  })

  describe('`has`', () => {
    it('is a function', () => {
      expect(has)
        .to.be.a('function')
    })
  })

  describe('`get`', () => {
    it('is a function', () => {
      expect(get)
        .to.be.a('function')
    })
  })

  describe('`rail`', () => {
    it('is a function', () => {
      expect(rail)
        .to.be.a('function')
    })
  })

  describe('`go`', () => {
    it('is a function', () => {
      expect(go)
        .to.be.a('function')
    })
  })

  describe('`to`', () => {
    it('is a function', () => {
      expect(to)
        .to.be.a('function')
    })
  })

  describe('`any()`', () => {
    /**
     *  Avoid additional expensive computation by determining whether the provided object has any fields
     */
    describe('An object is passed as an argument', () => {
      it('has keys', () => {
        expect(any({ mockField: 'MOCK VALUE' }))
          .to.equal(true)
      })

      it('does not have keys', () => {
        expect(any({}))
          .to.equal(false)
      })
    })
  })

  describe('`has()`', () => {
    /**
     *  Avoid additional expensive computation by determining whether the provided object has this field
     */
    describe('An object and a string are passed as arguments', () => {
      it('has this key', () => {
        expect(has({ mockField: 'MOCK VALUE' }, 'mockField'))
          .to.equal(true)
      })

      it('does not have this key', () => {
        expect(has({ mockField: 'MOCK VALUE' }, 'MOCK KEY'))
          .to.equal(false)
      })
    })
  })

  describe('`get()`', () => {
    /**
     *  Get this field
     */
    describe('An object and a string are passed as arguments', () => {
      it('gets this key', () => {
        expect(get({ mockField: 'MOCK VALUE' }, 'mockField'))
          .to.equal('MOCK VALUE')
      })

      it('does not get this key', () => {
        expect(get({ mockField: 'MOCK VALUE' }, 'MOCK KEY'))
          .to.be.an('undefined')
      })
    })
  })

  describe('`rail()`', () => {
    describe('A string is passed as an argument', () => {
      it('returns a string', () => {
        expect(rail('MOCK STRING'))
          .to.be.a('string')
      })

      it('formats the string', () => {
        /**
         *  1.  The string is lowercased
         *  2.  All non-alphanumeric or hyphen characters are replaced with whitespace and the string is trimmed
         *  3.  All duplicate adjacent whitespace characters are removed
         *  4.  All whitespace characters are replaced with hyphen characters
         */
        expect(rail(' 1 2  3 M:o;C+k/S<T>R?I[]N{}G 4  5 6 '))
          .to.equal('1-2-3-m-o-c-k-s-t-r-i-n-g-4-5-6')
      })
    })
  })

  /**
   *  Can this object be transformed according to this pattern?
   */
  describe('`go()`', () => {
    describe('An object is passed as the first argument and a string is passed as the second argument', () => {
      describe('The object can be transformed with the provided pattern', () => {
        it('returns true', () => {
          expect(go({ mockField: 'mock-value' }, '/:mockField'))
            .to.equal(true)
        })
      })

      describe('The object cannot be transformed with the provided pattern', () => {
        it('returns false', () => {
          expect(go({}, '/:mockField'))
            .to.equal(false)
        })
      })
    })
  })

  /**
   *  Transform this object according to this pattern
   */
  describe('`to()`', () => {
    describe('An object is passed as the first argument and a string is passed as the second argument', () => {
      describe('The object can be transformed with the provided pattern', () => {
        it('returns a string', () => {
          expect(to({ mockField: 'mock-value' }, '/:mockField'))
            .to.equal('/mock-value')
        })
      })

      describe('The object cannot be transformed with the provided pattern', () => {
        it('returns the provided pattern', () => {
          expect(to({}, '/:mockField'))
            .to.equal('/:mockField')
        })
      })
    })
  })

  describe('`Rails.pattern()`', () => {
    const defaultPattern = Rails.pattern()

    describe('A string is passed as an argument', () => {
      /**
       *  @type {string}
       */
      let returnValue

      beforeEach(() => {
        returnValue = Rails.pattern(':/mock-pattern')
      })

      afterEach(() => {
        Rails.pattern(defaultPattern)
      })

      it('returns a string', () => {
        expect(returnValue)
          .to.be.a('string')
      })

      it('is the provided pattern', () => {
        expect(returnValue)
          .to.equal(':/mock-pattern')
      })
    })

    describe('A string is not passed as an argument', () => {
      it('returns a string', () => {
        expect(defaultPattern)
          .to.be.a('string')
      })

      it('is the default pattern', () => {
        expect(defaultPattern)
          .to.equal('/:alpha/:omega')
      })
    })
  })

  describe('`Rails.rail()`', () => {
    describe('A string is passed as an argument', () => {
      it('returns a string', () => {
        expect(Rails.rail('MOCK STRING'))
          .to.be.a('string')
      })

      it('formats the string', () => {
        /**
         *  1.  The string is lowercased
         *  2.  All non-alphanumeric or hyphen characters are replaced with whitespace and the string is trimmed
         *  3.  All duplicate adjacent whitespace characters are removed
         *  4.  All whitespace characters are replaced with hyphen characters
         */
        expect(Rails.rail(' 1 2  3 M:o;C+k/S<T>R?I[]N{}G 4  5 6 '))
          .to.equal('1-2-3-m-o-c-k-s-t-r-i-n-g-4-5-6')
      })
    })
  })

  /**
   *  Can this object be transformed according to this pattern?
   *
   *  Aliases `go` with defaults
   */
  describe('`Rails.go()`', () => {
    describe('An object is passed as the first argument', () => {
      describe('It can be transformed with the default pattern', () => {
        it('returns true', () => {
          expect(Rails.go({ alpha: 'mock-alpha', omega: 'mock-omega' }))
            .to.equal(true)
        })

        describe('A string is passed as the second argument', () => {
          describe('The object can be transformed with the provided pattern', () => {
            it('returns true', () => {
              expect(Rails.go({ mockField: 'mock-value' }, '/:mockField'))
                .to.equal(true)
            })
          })

          describe('The object cannot be transformed with the provided pattern', () => {
            it('returns false', () => {
              expect(Rails.go({}, '/:mockField'))
                .to.equal(false)
            })
          })
        })
      })

      describe('It cannot be transformed with the default pattern', () => {
        it('returns false', () => {
          expect(Rails.go({}))
            .to.equal(false)
        })
      })
    })

    describe('An object is not passed as the first argument', () => {
      describe('The default object cannot be transformed with the default pattern', () => {
        it('returns false', () => {
          expect(Rails.go({}))
            .to.equal(false)
        })
      })

      describe('A string is passed as the second argument', () => {
        describe('The default object cannot be transformed with the provided pattern', () => {
          it('returns false', () => {
            expect(Rails.go({}, ''))
              .to.equal(false)
          })
        })
      })
    })
  })

  /**
   *  Transform this object according to this pattern
   *
   *  Aliases `to` with defaults
   */
  describe('`Rails.to()`', () => {
    describe('An object is passed as the first argument', () => {
      describe('It can be transformed with the default pattern', () => {
        it('returns a string', () => {
          expect(Rails.to({ alpha: 'mock-alpha', omega: 'mock-omega' }))
            .to.equal('/mock-alpha/mock-omega')
        })

        describe('A string is passed as the second argument', () => {
          describe('The object can be transformed with the provided pattern', () => {
            it('returns a string', () => {
              expect(Rails.to({ mockField: 'mock-value' }, '/:mockField'))
                .to.equal('/mock-value')
            })
          })

          describe('The object cannot be transformed with the provided pattern', () => {
            it('returns the provided pattern', () => {
              expect(Rails.to({}, '/:mockField'))
                .to.equal('/:mockField')
            })
          })
        })
      })

      describe('It cannot be transformed with the default pattern', () => {
        it('returns the default pattern', () => {
          expect(Rails.to({}))
            .to.equal('/:alpha/:omega')
        })
      })
    })

    describe('An object is not passed as the first argument', () => {
      describe('The default object cannot be transformed with the default pattern', () => {
        it('returns the default pattern', () => {
          expect(Rails.to({}))
            .to.equal('/:alpha/:omega')
        })
      })

      describe('A string is passed as the second argument', () => {
        describe('The default object cannot be transformed with the provided pattern', () => {
          it('returns the provided pattern', () => {
            expect(Rails.to({}, ''))
              .to.equal('')
          })
        })
      })
    })
  })
})

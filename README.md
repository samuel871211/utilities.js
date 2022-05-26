# utils

Contains many useful utility functions which built in JavaScript datatypes internally

* Math
    * hasPrimeFactorOf: (min: number, max: number, divisor: number) => boolean
    * hasMultipleOf: (min: number, max: number, dividend: number) => boolean
    * getRandomIntInclusive: (min: number, max: number) => number
    * getArithmeticSequence: (start: number, tolerance: number, count: number) => number[]
    * fixMinMaxInterval: (min: number, max: number) => [number, number]
    * getGeometricSeries: (base: number, power: number) => number
    * getColumnIndexSign: (columnIdx: number) => string
    * getRandomEnglishString: (len: number) => string
    * getBestArithmeticSequence: (min: number, max: number, minLen: number = 5, maxLen: number = 15) => number[]
* Array
    * getRandomItem: () => T
    * lastItem: () => T
    * lastIdx: () => number
* NumberConstructor
    * isPrime: (num: number) => boolean
    * toExponentialPairs: (num: number) => [number, number]
    * decimalDigitsCount: (num: number) => number
    * intDigitsCount: (num: number) => number

# example
```
import '@samuel871211/utils'

Math.getRandomIntInclusive(1, 5)
Math.hasPrimeFactorOf(1, 2, 3)
Math.hasMultipleOf(1, 2, 3)
Math.getArithmeticSequence(1, 2, 3)
Math.fixMinMaxInterval(1, 2)
Math.getGeometricSeries(2, 1)
Math.getColumnIndexSign(1)
Math.getRandomEnglishString(1)
Math.getBestArithmeticSequence(1, 2, 3, 4)

const arr = [1, 2, 3]
arr.getRandomItem()
arr.lastItem()
arr.lastIdx()

Number.isPrime(2)
Number.toExponentialPairs(2.56)
Number.decimalDigitsCount(4.78)
Number.intDigitsCount(34778.02)
```

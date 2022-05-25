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

declare global {
    interface Array<T> {
        getRandomItem: () => T
        lastItem: () => T
        lastIdx: () => number
    }
    interface NumberConstructor {
        isPrime: (num: number) => boolean
        /**
         * num = n * Math.pow(10, k)
         * @returns [n, k]
         * @example Number.toExponentialPairs(37) => [3.7, 1]
         */
        toExponentialPairs: (num: number) => [number, number]
        /**
         * Return the decimal digits count of the given number
         */
        decimalDigitsCount: (num: number) => number
        /**
         * Return the integer digits count of the given number
         */
        intDigitsCount: (num: number) => number
    }
    interface Math {
        /**
         * Determine whether there is an integer between `min` and `max` that can divide `divisor`
         * @example hasPrimeFactorOf(18, 34, 17) => true，because 34 / 17 = 2
         */
        hasPrimeFactorOf: (min: number, max: number, divisor: number) => boolean
        /**
         * Determine whether there is an integer between `min` and `max` that is divisible by `dividend`
         * @example hasPrimeFactor(15, 17, 34) => true，because 34 / 17 = 2
         */
        hasMultipleOf: (min: number, max: number, dividend: number) => boolean
        /**
         * Get a random integer between `min` and `max`, if no integer between `min` and `max`, return `min` instead. Each integer has an equal chance of being chosen, it uses Math.random() internally
         */
        getRandomIntInclusive: (min: number, max: number) => number
        /**
         * @param start Start number
         * @param tolerance No more than one decimal digit
         * @param count How many count after @param start
         * @example getArithmeticSequence(1, 2, 5) => [1, 3, 5, 7, 9, 11]
         */
        getArithmeticSequence: (start: number, tolerance: number, count: number) => number[]
        /**
         * @returns An array of [min, max], where min and max:
         * 1. Can be represents as n * Math.pow(10, k), where n, k are both integers
         * 2. Interval of [min, max] must contain 0
         * 3. Interval of [min, max] must contain original min and max
         */
        fixMinMaxInterval: (min: number, max: number) => [number, number]
        /**
         * @base A number (1 is not allowed)
         * @param power A positive integer
         * @example geometricProgression(2, 3) = 1 + 2 + 4 + 8 = 15
         */
        getGeometricSeries: (base: number, power: number) => number
        /**
         * A common table header will look like this: A B C D E, ......, Z, AA, AB, AC, ...., ZZ
         * @param columnIdx An positive integer from 1 ~ 702, always returns ZZ if `columnIdx` > 702
         * @example getColumnIndexSign(1) => 'A'
         * @example getColumnIndexSign(2) => 'B'
         * @example getColumnIndexSign(27) => 'AA'
         */
        getColumnIndexSign: (columnIdx: number) => string
        /**
         * @param len Length of the output English string
         * @returns A random English string contains Lowercase and UpperCase (50% 50%)
         */
        getRandomEnglishString: (len: number) => string
        /**
         * Given interval [`min`, `max`] and desired output length interval [`minLen`, `maxLen`], return the best fit arithmetic sequence, return [`min`, `max`] if there is no best fit. The output arithmetic sequence must have below constrains:
         * 
         * 1. contain 0
         * 
         * 2. tolarance >= 0.1
         * 
         * 3. tolarance no more than 1 decimal digits
         * 
         * 4. descending order
         * @param minLen Default 5
         * @param maxLen Default 15
         */
        getBestArithmeticSequence: (min: number, max: number, minLen: number = 5, maxLen: number = 15) => number[]
    }
}

export {}
declare global {
    interface Array<T> {
        getRandomItem: () => T
        lastItem: () => T
        lastIdx: () => number
    }
    interface NumberConstructor {
        isPrime: (num: number) => boolean
        /**
         * `num` can be represents as n * Math.pow(10, k), where 1 <= n < 10, k is integer
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
         * Get a random float between `min` and `max`. It uses Math.random() internally
         * 
         * @param opt.decimalDigits How many digits after the decimal point. If not specified, it's determined by Math.random() 
         */
        getRandomFloatInclusive: (min: number, max: number, opt?: { decimalDigits?: number }) => number
        /**
         * @param start Start number
         * @param tolerance No more than one decimal digit
         * @param count How many count after `start`
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
         * Given interval [`min`, `max`] and desired output length interval [`minLen`, `maxLen`], return the best fit arithmetic sequence, return fixed [`max`, `min`] if there is no best fit. The output arithmetic sequence must have below constrains:
         * 
         * 1. contain 0
         * 
         * 2. tolerance >= 0.1
         * 
         * 3. tolerance no more than 1 decimal digits
         * 
         * 4. descending order
         * 
         * 5. each item in output arithmetic sequence can be represents as n * Math.pow(10, k), where n, k are both integers
         * 
         * 6. first number must >= `max`
         * 
         * 7. last number must <= `min`
         * 
         * 8. length between `minLen` and `maxLen` (if possible)
         * @param min An number represents the start number of arithmetic sequence
         * @param max An number represents the end number of arithmetic sequence
         * @param minLen An positive integer > 2 represents the desired output arithmetic sequence min length, Default 5
         * @param maxLen An positive integer > 2 represents the desired output arithmetic sequence max length, Default 15
         */
        getBestDataInterval: (min: number, max: number, minLen: number = 5, maxLen: number = 15) => number[]
        /**
         * Given interval [`min`, `max`] and desired output length interval [`minLen`, `maxLen`], return the best fit arithmetic sequence, return [`min`, `max`] if there is no best fit. The output arithmetic sequence must have below constrains:
         * 
         * 1. tolerance is integer
         * 
         * 2. ascending order
         * 
         * 3. first index of output arithmetic sequence must = `min`
         * 
         * 4. last index of output arithmetic sequence must <= `max`
         * 
         * 5. length = `desiredLen` or `desiredLen` - 1 if possible
         * @param min An integer represents the start number of arithmetic sequence
         * @param max An integer represents the end number of arithmetic sequence
         * @param desiredLen An positive integer > 2 represents the desired output arithmetic sequence length
         */
        getBestArithmeticSequence: (min: number, max: number, desiredLen: number) => number[]
    }
}

export {}
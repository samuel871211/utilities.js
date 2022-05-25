import './Array'
import './Math'
import './Number'

describe('Array', () => {
    const dataSet = [
        [1, 3, 5],
        [0],
        [2, 4, 6, 8, 10],
        [100, -3.2, 0.78]
    ]
    for (const data of dataSet) {
        test(`getRandomItem of ${data}`, () => {
            expect(data.includes(data.getRandomItem())).toBeTruthy()
        })
        test(`lastIdx of ${data}`, () => {
            expect(data.lastIdx()).toBe(data.length - 1)
        })
        test(`lastItem of ${data}`, () => {
            expect(data.lastItem()).toBe(data[data.length - 1])
        })
    }
})

describe('Math', () => {
    const dataSet = [
        [-2.3, -0.87],
        [3000, 4000],
        [356, 20],
        [7, 3],
        [-32575, -2.3],
        [-93254.215214, 3.2],
        [0.32514789, 35],
        [5.9, -6853.7651]
    ]
    for (const data of dataSet) {
        test(`getRandomIntInclusive of ${data}`, () => {
            const result = Math.getRandomIntInclusive(data[0], data[1])
            expect(result).toBeGreaterThanOrEqual(Math.min(data[0], data[1]))
            expect(result).toBeLessThanOrEqual(Math.max(data[0], data[1]))
            expect(Number.isInteger(result)).toBeTruthy()
        })
        test(`fixMinMaxInterval of ${data}`, () => {
            const inputMin = data[0]
            const inputMax = data[1]
            const [min, max] = Math.fixMinMaxInterval(inputMin, inputMax)
            // 1. 修正過後的min跟max必定符合n * 10的k次方(n, k皆為整數)
            const [nOfMin, kOfMin] = Number.toExponentialPairs(min)
            const [nOfMax, kOfMax] = Number.toExponentialPairs(max)
            expect(Number.isInteger(nOfMin)).toBeTruthy()
            expect(Number.isInteger(kOfMin)).toBeTruthy()
            expect(Number.isInteger(nOfMax)).toBeTruthy()
            expect(Number.isInteger(kOfMax)).toBeTruthy()
            // 2. 修正過後的min跟max圍起來的區間必定包含0
            expect(min).toBeLessThanOrEqual(0)
            expect(max).toBeGreaterThanOrEqual(0)
            // 3. 修正過後的min跟max圍起來的區間必定包含min跟max
            expect(min).toBeLessThanOrEqual(inputMin)
            expect(max).toBeGreaterThanOrEqual(inputMax)
        })
        test(`getBestArithmeticSequence of ${data}`, () => {
            const result = Math.getBestArithmeticSequence(data[0], data[1])
            expect(result).toContain(0)
            expect(result.length).toBeLessThanOrEqual(16)
            expect(result.length).toBeGreaterThan(6)
            expect(result[0] - result[1]).toBeGreaterThanOrEqual(0.1)
        })
    }
    test('getRandomIntInclusive of 0.3, 0.7854', () => {
        const result = Math.getRandomIntInclusive(0.3, 0.7815)
        expect(result).toBe(0.3)
    })
    test('getRandomIntInclusive of -48, -48', () => {
        const result = Math.getRandomIntInclusive(-48, -48)
        expect(result).toBe(-48)
    })
    test('getRandomIntInclusive of 0, 0', () => {
        const result = Math.getRandomIntInclusive(0, 0)
        expect(result).toBe(0)
    })
    test('hasMultipleOf', () => {
        expect(Math.hasMultipleOf(2, 5, 8)).toBeTruthy()
        expect(Math.hasMultipleOf(3, 9, 17)).toBeFalsy()
        expect(Math.hasMultipleOf(15, 17, 51)).toBeTruthy()
        expect(Math.hasMultipleOf(3, 1, 19)).toBeTruthy()
        expect(Math.hasMultipleOf(7, 3, 2100)).toBeTruthy()
    })
    test('hasPrimeFactorOf', () => {
        expect(Math.hasPrimeFactorOf(2, 8, 5)).toBeTruthy()
        expect(Math.hasPrimeFactorOf(3, 9, 17)).toBeFalsy()
        expect(Math.hasPrimeFactorOf(30, 34, 17)).toBeTruthy()
        expect(Math.hasPrimeFactorOf(30, 2.5, 23)).toBeTruthy()
        expect(Math.hasPrimeFactorOf(78, 77, 11)).toBeTruthy()
    })
    test('getArithmeticSequence', () => {
        expect(Math.getArithmeticSequence(10, 1, 5)).toEqual([10, 11, 12, 13, 14, 15])
        expect(Math.getArithmeticSequence(100, -1, 2)).toEqual([100, 99, 98])
        expect(Math.getArithmeticSequence(0.1, 1.5, 4)).toEqual([0.1, 1.6, 3.1, 4.6, 6.1])
        expect(Math.getArithmeticSequence(25, -0.1, 3)).toEqual([25, 24.9, 24.8, 24.7])
        expect(Math.getArithmeticSequence(88, -0.1, -1)).toEqual([88])
    })
    test('getGeometricSeries', () => {
        expect(Math.getGeometricSeries(1, 5)).toBe(6)
        expect(Math.getGeometricSeries(2, 6)).toBe(127)
        expect(Math.getGeometricSeries(3, 5)).toBe(364)
        expect(Math.getGeometricSeries(-2, 3)).toBe(-5)
        expect(Math.getGeometricSeries(25, 2)).toBe(651)
    })
    test('getColumnIndexSign', () => {
        expect(Math.getColumnIndexSign(-0.1)).toBe('A')
        expect(Math.getColumnIndexSign(1)).toBe('A')
        expect(Math.getColumnIndexSign(2)).toBe('B')
        expect(Math.getColumnIndexSign(25)).toBe('Y')
        expect(Math.getColumnIndexSign(26)).toBe('Z')
        expect(Math.getColumnIndexSign(27)).toBe('AA')
        expect(Math.getColumnIndexSign(52)).toBe('AZ')
        expect(Math.getColumnIndexSign(650)).toBe('XZ')
        expect(Math.getColumnIndexSign(676)).toBe('YZ')
        expect(Math.getColumnIndexSign(702)).toBe('ZZ')
        expect(Math.getColumnIndexSign(703)).toBe('ZZ')
        expect(Math.getColumnIndexSign(1025)).toBe('ZZ')
    })
})

describe('Number', () => {
    test('isPrime', () => {
        expect(Number.isPrime(2)).toBeTruthy()
        expect(Number.isPrime(3)).toBeTruthy()
        expect(Number.isPrime(4)).toBeFalsy()
        expect(Number.isPrime(5)).toBeTruthy()
        expect(Number.isPrime(6)).toBeFalsy()
        expect(Number.isPrime(7)).toBeTruthy()
        expect(Number.isPrime(17)).toBeTruthy()
        expect(Number.isPrime(19)).toBeTruthy()
        expect(Number.isPrime(79)).toBeTruthy()
    })
    test('toExponentialPairs', () => {
        expect(Number.toExponentialPairs(37)).toEqual([3.7, 1])
        expect(Number.toExponentialPairs(400)).toEqual([4, 2])
        expect(Number.toExponentialPairs(0.3524)).toEqual([3.524, -1])
        expect(Number.toExponentialPairs(0.0000205)).toEqual([2.05, -5])
    })
    test('decimalDigitsCount', () => {
        expect(Number.decimalDigitsCount(0.235)).toBe(3)
        expect(Number.decimalDigitsCount(251.001)).toBe(3)
        expect(Number.decimalDigitsCount(546521)).toBe(0)
        expect(Number.decimalDigitsCount(-16512.0212)).toBe(4)
        expect(Number.decimalDigitsCount(-0.2)).toBe(1)
    })
    test('intDigitsCount', () => {
        expect(Number.intDigitsCount(0.235)).toBe(1)
        expect(Number.intDigitsCount(251.001)).toBe(3)
        expect(Number.intDigitsCount(546521)).toBe(6)
        expect(Number.intDigitsCount(-16512.0212)).toBe(5)
        expect(Number.intDigitsCount(-0.254)).toBe(1)
    })
})
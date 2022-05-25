Math.hasPrimeFactorOf = function (min: number, max: number, divisor: number) {
    [min, max] = [this.min(min, max), this.max(min, max)]
    min = this.floor(min)
    max = this.ceil(max)
    for (let i = min; i <= max; i++) {
        if (i % divisor === 0) return true
    }
    return false
}
Math.hasMultipleOf = function (min: number, max: number, dividend: number) {
    [min, max] = [this.min(min, max), this.max(min, max)]
    min = this.floor(min)
    max = this.ceil(max)
    for (let i = min; i <= max; i++) {
        if (dividend % i === 0) return true
    }
    return false
}
Math.getRandomIntInclusive = function (min: number, max: number) {
    [min, max] = [this.min(min, max), this.max(min, max)]
    if (this.ceil(min) === this.ceil(max)) return min
    min = this.ceil(min)
    max = this.floor(max)
    return this.floor(this.random() * (max - min + 1) + min)
}
Math.getArithmeticSequence = function (start: number, tolerance: number, count: number) {
    tolerance = parseFloat(tolerance.toFixed(1))
    const result = [start]
    let currentNumber = start
    for (let i = 1; i <= count; i++) {
        currentNumber = parseFloat((currentNumber + tolerance).toFixed(1))
        result.push(currentNumber)
    }
    return result
}
Math.fixMinMaxInterval = function (min: number, max: number): [number, number] {
    [min, max] = [this.min(min, max), this.max(min, max)]
    if (min > 0) min = 0
    if (max < 0) max = 0
    min = this.floor(min)
    max = this.ceil(max)
    const intDigitsCountOfMin = this.abs(min).toString().length
    const intDigitsCountOfMax =this.abs(max).toString().length
    const multiplier = this.pow(10, this.max(intDigitsCountOfMin, intDigitsCountOfMax) - 1)
    min = this.floor(min / multiplier) * multiplier
    max = this.ceil(max / multiplier) * multiplier
    return [min, max]
}
Math.getGeometricSeries = function (base: number, power: number) {
    if (base === 1) return power + 1
    return 1 * (1 - Math.pow(base, power + 1)) / (1 - base)
}
Math.getColumnIndexSign = function (columnIdx: number) {
    columnIdx = Math.floor(columnIdx)
    if (columnIdx <= 0 || isNaN(columnIdx)) return 'A'
    const quotient = Math.floor((columnIdx - 1) / 26)
    const remainder = (columnIdx - 1) % 26 // 決定個位數的值
    let digits = -1
    if (columnIdx >= this.getGeometricSeries(26, 0) && columnIdx < this.getGeometricSeries(26, 1)) digits = 1
    else if (columnIdx >= this.getGeometricSeries(26, 1) && columnIdx < this.getGeometricSeries(26, 2)) digits = 2

    if (digits === 1) return String.fromCharCode(remainder + 65)
    if (digits === 2) return `${String.fromCharCode(quotient + 64)}${String.fromCharCode(remainder + 65)}`
    return 'ZZ'
}
Math.getRandomEnglishString = function (len: number) {
    if (len <= 0) return ''
    const result = []
    const A = 65
    const Z = 90
    const a = 97
    const z = 122
    for (let i = 0; i < len; i++) {
        const isLowerCase = this.getRandomIntInclusive(0, 1) === 0
        const charCode = isLowerCase ? this.getRandomIntInclusive(A, Z) : this.getRandomIntInclusive(a, z)
        result.push(String.fromCharCode(charCode))
    }
    return result.join('')
}
Math.getBestArithmeticSequence = function (min: number, max: number, minLen = 5, maxLen = 15) {
    [min, max] = this.fixMinMaxInterval(min, max);
    [minLen, maxLen] = [this.min(minLen, maxLen), this.max(minLen, maxLen)]
    let interval = Math.abs(max - min)
    let maybePrimeFactor = parseInt(interval.toString().replaceAll('0', ''))
    while (Number.isPrime(maybePrimeFactor) && !Math.hasPrimeFactorOf(minLen, maxLen, maybePrimeFactor)) {
        // 預設會以min往下遞減
        const [n, k] = Number.toExponentialPairs(min)
        min = min - Math.pow(10, k)
        interval = Math.abs(max - min)
        maybePrimeFactor = parseInt(interval.toString().replaceAll('0', ''))
    }
    
    // for迴圈決定可以等份成幾份
    for (let slices = maxLen; slices >= minLen; slices--) {
        const tolerance = interval / slices // 公差
        const isLessThanOrEqualOneDecimalDigit = tolerance.toFixed(2).slice(-1) === '0'
        const containZero = Number.isInteger(min / tolerance) && Number.isInteger(max / tolerance)
        if (tolerance >= 0.1 && isLessThanOrEqualOneDecimalDigit && containZero) {
            return Math.getArithmeticSequence(max, tolerance * -1, slices)
        }
    }

    // fallback
    return [min, max]
}

export {}
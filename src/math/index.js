'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
Math.hasPrimeFactorOf = function (min, max, divisor) {
    var _a
    _a = [this.min(min, max), this.max(min, max)], min = _a[0], max = _a[1]
    min = this.floor(min)
    max = this.ceil(max)
    for (var i = min; i <= max; i++) {
        if (i % divisor === 0)
            return true
    }
    return false
}
Math.hasMultipleOf = function (min, max, dividend) {
    var _a
    _a = [this.min(min, max), this.max(min, max)], min = _a[0], max = _a[1]
    min = this.floor(min)
    max = this.ceil(max)
    for (var i = min; i <= max; i++) {
        if (dividend % i === 0)
            return true
    }
    return false
}
Math.getRandomIntInclusive = function (min, max) {
    var _a
    _a = [this.min(min, max), this.max(min, max)], min = _a[0], max = _a[1]
    if (this.ceil(min) === this.ceil(max))
        return min
    min = this.ceil(min)
    max = this.floor(max)
    return this.floor(this.random() * (max - min + 1) + min)
}
Math.getArithmeticSequence = function (start, tolerance, count) {
    tolerance = parseFloat(tolerance.toFixed(1))
    var result = [start]
    var currentNumber = start
    for (var i = 1; i <= count; i++) {
        currentNumber = parseFloat((currentNumber + tolerance).toFixed(1))
        result.push(currentNumber)
    }
    return result
}
Math.fixMinMaxInterval = function (min, max) {
    var _a
    _a = [this.min(min, max), this.max(min, max)], min = _a[0], max = _a[1]
    if (min > 0)
        min = 0
    if (max < 0)
        max = 0
    min = this.floor(min)
    max = this.ceil(max)
    var intDigitsCountOfMin = this.abs(min).toString().length
    var intDigitsCountOfMax = this.abs(max).toString().length
    var multiplier = this.pow(10, this.max(intDigitsCountOfMin, intDigitsCountOfMax) - 1)
    min = this.floor(min / multiplier) * multiplier
    max = this.ceil(max / multiplier) * multiplier
    return [min, max]
}
Math.getGeometricSeries = function (base, power) {
    if (base === 1)
        return power + 1
    return 1 * (1 - Math.pow(base, power + 1)) / (1 - base)
}
Math.getColumnIndexSign = function (columnIdx) {
    columnIdx = Math.floor(columnIdx)
    if (columnIdx <= 0 || isNaN(columnIdx))
        return 'A'
    var quotient = Math.floor((columnIdx - 1) / 26)
    var remainder = (columnIdx - 1) % 26 // 決定個位數的值
    var digits = -1
    if (columnIdx >= this.getGeometricSeries(26, 0) && columnIdx < this.getGeometricSeries(26, 1))
        digits = 1
    else if (columnIdx >= this.getGeometricSeries(26, 1) && columnIdx < this.getGeometricSeries(26, 2))
        digits = 2
    if (digits === 1)
        return String.fromCharCode(remainder + 65)
    if (digits === 2)
        return ''.concat(String.fromCharCode(quotient + 64)).concat(String.fromCharCode(remainder + 65))
    return 'ZZ'
}
Math.getRandomEnglishString = function (len) {
    if (len <= 0)
        return ''
    var result = []
    var A = 65
    var Z = 90
    var a = 97
    var z = 122
    for (var i = 0; i < len; i++) {
        var isLowerCase = this.getRandomIntInclusive(0, 1) === 0
        var charCode = isLowerCase ? this.getRandomIntInclusive(A, Z) : this.getRandomIntInclusive(a, z)
        result.push(String.fromCharCode(charCode))
    }
    return result.join('')
}
Math.getBestArithmeticSequence = function (min, max, minLen, maxLen) {
    var _a, _b
    if (minLen === void 0) { minLen = 5 }
    if (maxLen === void 0) { maxLen = 15 }
    _a = this.fixMinMaxInterval(min, max), min = _a[0], max = _a[1]
    _b = [this.min(minLen, maxLen), this.max(minLen, maxLen)], minLen = _b[0], maxLen = _b[1]
    var interval = Math.abs(max - min)
    var maybePrimeFactor = parseInt(interval.toString().replaceAll('0', ''))
    while (Number.isPrime(maybePrimeFactor) && !Math.hasPrimeFactorOf(minLen, maxLen, maybePrimeFactor)) {
        // 預設會以min往下遞減
        var _c = Number.toExponentialPairs(min), n = _c[0], k = _c[1]
        min = min - Math.pow(10, k)
        interval = Math.abs(max - min)
        maybePrimeFactor = parseInt(interval.toString().replaceAll('0', ''))
    }
    // for迴圈決定可以等份成幾份
    for (var slices = maxLen; slices >= minLen; slices--) {
        var tolerance = interval / slices // 公差
        var isLessThanOrEqualOneDecimalDigit = tolerance.toFixed(2).slice(-1) === '0'
        var containZero = Number.isInteger(min / tolerance) && Number.isInteger(max / tolerance)
        if (tolerance >= 0.1 && isLessThanOrEqualOneDecimalDigit && containZero) {
            return Math.getArithmeticSequence(max, tolerance * -1, slices)
        }
    }
    // fallback
    return [min, max]
}

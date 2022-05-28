'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
Math.hasPrimeFactorOf = function (min, max, divisor) {
    var _a
    _a = [Math.min(min, max), Math.max(min, max)], min = _a[0], max = _a[1]
    min = Math.floor(min)
    max = Math.ceil(max)
    for (var i = min; i <= max; i++) {
        if (i % divisor === 0)
            return true
    }
    return false
}
Math.hasMultipleOf = function (min, max, dividend) {
    var _a
    _a = [Math.min(min, max), Math.max(min, max)], min = _a[0], max = _a[1]
    min = Math.floor(min)
    max = Math.ceil(max)
    for (var i = min; i <= max; i++) {
        if (dividend % i === 0)
            return true
    }
    return false
}
Math.getRandomIntInclusive = function (min, max) {
    var _a
    _a = [Math.min(min, max), Math.max(min, max)], min = _a[0], max = _a[1]
    if (Math.ceil(min) === Math.ceil(max))
        return min
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}
Math.getRandomFloatInclusive = function (min, max, opt) {
    var _a
    _a = [Math.min(min, max), Math.max(min, max)], min = _a[0], max = _a[1]
    var decimalDigits = opt === null || opt === void 0 ? void 0 : opt.decimalDigits
    var integerToBeAdd = Math.getRandomIntInclusive(0, Math.floor(max - min))
    var result = min + integerToBeAdd
    var floatToBeAdd = 0
    var difference = max - result
    if (difference < 0)
        throw new Error('difference < 0')
    else if (difference === 0)
        floatToBeAdd = Math.random() * -1
    else if (difference >= 1)
        floatToBeAdd = Math.random()
    else if (difference < 1) {
        // 假設difference = 0.25，先隨機生成0~24的正整數，加上Math.random()之後，再除以100，可確保 0 <= floatToBeAdd <= 0.25
        var decimalDigitsCount = Number.decimalDigitsCount(difference)
        console.log({ difference: difference, lower: difference * Math.pow(10, decimalDigitsCount) - 1, 分數: Math.pow(10, decimalDigitsCount * -1) })
        var floatToBeAdd_1 = (Math.getRandomIntInclusive(0, difference * Math.pow(10, decimalDigitsCount) - 1) + Math.random()) * Math.pow(10, decimalDigitsCount * -1)
        if (floatToBeAdd_1 > difference)
            throw new Error('floatToBeAdd > difference')
    }
    result += floatToBeAdd
    return decimalDigits ? parseFloat(result.toFixed(decimalDigits)) : result
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
    _a = [Math.min(min, max), Math.max(min, max)], min = _a[0], max = _a[1]
    if (min > 0)
        min = 0
    if (max < 0)
        max = 0
    min = Math.floor(min)
    max = Math.ceil(max)
    var intDigitsCountOfMin = Math.abs(min).toString().length
    var intDigitsCountOfMax = Math.abs(max).toString().length
    var multiplier = Math.pow(10, Math.max(intDigitsCountOfMin, intDigitsCountOfMax) - 1)
    min = Math.floor(min / multiplier) * multiplier
    max = Math.ceil(max / multiplier) * multiplier
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
    if (columnIdx >= Math.getGeometricSeries(26, 0) && columnIdx < Math.getGeometricSeries(26, 1))
        digits = 1
    else if (columnIdx >= Math.getGeometricSeries(26, 1) && columnIdx < Math.getGeometricSeries(26, 2))
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
        var isLowerCase = Math.getRandomIntInclusive(0, 1) === 0
        var charCode = isLowerCase ? Math.getRandomIntInclusive(A, Z) : Math.getRandomIntInclusive(a, z)
        result.push(String.fromCharCode(charCode))
    }
    return result.join('')
}
Math.getBestDataInterval = function (min, max, minLen, maxLen) {
    var _a, _b
    if (minLen === void 0) { minLen = 5 }
    if (maxLen === void 0) { maxLen = 15 }
    _a = Math.fixMinMaxInterval(min, max), min = _a[0], max = _a[1]
    _b = [Math.min(minLen, maxLen), Math.max(minLen, maxLen)], minLen = _b[0], maxLen = _b[1]
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
    return [max, min]
}
Math.getBestArithmeticSequence = function (min, max, desiredLen) {
    var _a
    // 修正輸入的參數，確保皆為整數，且大小排序正確
    _a = [Math.min(min, max), Math.max(min, max)], min = _a[0], max = _a[1]
    min = Math.ceil(min)
    max = Math.floor(max)
    desiredLen = Math.floor(Math.abs(desiredLen))
    // 特殊情況就不需進入for迴圈
    if (desiredLen <= 2)
        return [min, max]
    if (desiredLen >= max - min + 1)
        return Math.getArithmeticSequence(min, 1, max - min)
    var resultCandidate1 = [min, max]
    var resultCandidate2 = [min, max]
    var lastNumber
    var tolerance
    // 先從desiredLen的情況去找到最佳解
    for (lastNumber = max; lastNumber >= min; lastNumber--) {
        tolerance = (lastNumber - min) / (desiredLen - 1)
        if (Number.isInteger(tolerance)) {
            resultCandidate1 = Math.getArithmeticSequence(min, tolerance, desiredLen - 1)
            break
        }
    }
    // 再從desiredLen - 1的情況去找到最佳解
    for (lastNumber = max; lastNumber >= min; lastNumber--) {
        tolerance = (lastNumber - min) / (desiredLen - 2)
        if (Number.isInteger(tolerance)) {
            resultCandidate2 = Math.getArithmeticSequence(min, tolerance, desiredLen - 2)
            break
        }
    }
    // 交叉比對，看誰的最後一個數字最大，誰就是最佳解；如果一樣大，選擇最接近desiredLen的
    return resultCandidate1.lastItem() >= resultCandidate2.lastItem() ? resultCandidate1 : resultCandidate2
}

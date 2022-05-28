Math.hasPrimeFactorOf = function (min: number, max: number, divisor: number) {
    [min, max] = [Math.min(min, max), Math.max(min, max)]
    min = Math.floor(min)
    max = Math.ceil(max)
    for (let i = min; i <= max; i++) {
        if (i % divisor === 0) return true
    }
    return false
}
Math.hasMultipleOf = function (min: number, max: number, dividend: number) {
    [min, max] = [Math.min(min, max), Math.max(min, max)]
    min = Math.floor(min)
    max = Math.ceil(max)
    for (let i = min; i <= max; i++) {
        if (dividend % i === 0) return true
    }
    return false
}
Math.getRandomIntInclusive = function (min: number, max: number) {
    [min, max] = [Math.min(min, max), Math.max(min, max)]
    if (Math.ceil(min) === Math.ceil(max)) return min
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}
Math.getRandomFloatInclusive = function (min: number, max: number, opt?: { decimalDigits?: number }) {
    [min, max] = [Math.min(min, max), Math.max(min, max)]
    const decimalDigits = opt?.decimalDigits
    const integerToBeAdd = Math.getRandomIntInclusive(0, Math.floor(max - min))
    let result = min + integerToBeAdd
    let floatToBeAdd = 0
    const difference = max - result
    if (difference < 0) throw new Error('difference < 0')
    else if (difference === 0) floatToBeAdd = Math.random() * -1
    else if (difference >= 1) floatToBeAdd = Math.random()
    else if (difference < 1) {
        // 假設difference = 0.25，先隨機生成0~24的正整數，加上Math.random()之後，再除以100，可確保 0 <= floatToBeAdd <= 0.25
        const decimalDigitsCount = Number.decimalDigitsCount(difference)
        console.log({ difference, lower: difference * Math.pow(10, decimalDigitsCount) - 1, 分數: Math.pow(10, decimalDigitsCount * -1) })
        const floatToBeAdd = (Math.getRandomIntInclusive(0, difference * Math.pow(10, decimalDigitsCount) - 1) + Math.random()) * Math.pow(10, decimalDigitsCount * -1)
        if (floatToBeAdd > difference) throw new Error('floatToBeAdd > difference')
    }
    result += floatToBeAdd
    return decimalDigits ? parseFloat(result.toFixed(decimalDigits)) : result
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
    [min, max] = [Math.min(min, max), Math.max(min, max)]
    if (min > 0) min = 0
    if (max < 0) max = 0
    min = Math.floor(min)
    max = Math.ceil(max)
    const intDigitsCountOfMin = Math.abs(min).toString().length
    const intDigitsCountOfMax =Math.abs(max).toString().length
    const multiplier = Math.pow(10, Math.max(intDigitsCountOfMin, intDigitsCountOfMax) - 1)
    min = Math.floor(min / multiplier) * multiplier
    max = Math.ceil(max / multiplier) * multiplier
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
    if (columnIdx >= Math.getGeometricSeries(26, 0) && columnIdx < Math.getGeometricSeries(26, 1)) digits = 1
    else if (columnIdx >= Math.getGeometricSeries(26, 1) && columnIdx < Math.getGeometricSeries(26, 2)) digits = 2

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
        const isLowerCase = Math.getRandomIntInclusive(0, 1) === 0
        const charCode = isLowerCase ? Math.getRandomIntInclusive(A, Z) : Math.getRandomIntInclusive(a, z)
        result.push(String.fromCharCode(charCode))
    }
    return result.join('')
}
Math.getBestDataInterval = function (min: number, max: number, minLen = 5, maxLen = 15) {
    [min, max] = Math.fixMinMaxInterval(min, max);
    [minLen, maxLen] = [Math.min(minLen, maxLen), Math.max(minLen, maxLen)]
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
    return [max, min]
}
Math.getBestArithmeticSequence = function (min: number, max: number, desiredLen: number) {
    // 修正輸入的參數，確保皆為整數，且大小排序正確
    [min, max] = [Math.min(min, max), Math.max(min, max)]
    min = Math.ceil(min)
    max = Math.floor(max)
    desiredLen = Math.floor(Math.abs(desiredLen))

    // 特殊情況就不需進入for迴圈
    if (desiredLen <= 2) return [min, max]
    if (desiredLen >= max - min + 1) return Math.getArithmeticSequence(min, 1, max - min)

    let resultCandidate1: number[] = [min, max]
    let resultCandidate2: number[] = [min, max]
    let lastNumber: number
    let tolerance: number
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

export {}
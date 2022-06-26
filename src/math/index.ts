Math.hasPrimeFactorOf = function (min, max, divisor) {
    [min, max] = [Math.min(min, max), Math.max(min, max)]
    min = Math.floor(min)
    max = Math.ceil(max)
    for (let i = min; i <= max; i++) {
        if (i % divisor === 0) return true
    }
    return false
}
Math.hasMultipleOf = function (min, max, dividend) {
    [min, max] = [Math.min(min, max), Math.max(min, max)]
    min = Math.floor(min)
    max = Math.ceil(max)
    for (let i = min; i <= max; i++) {
        if (dividend % i === 0) return true
    }
    return false
}
Math.getRandomIntInclusive = function (min, max) {
    [min, max] = [Math.min(min, max), Math.max(min, max)]
    if (Math.ceil(min) === Math.ceil(max)) return min
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}
Math.getRandomFloatInclusive = function (min, max, opt) {
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
        const floatToBeAdd = (Math.getRandomIntInclusive(0, difference * Math.pow(10, decimalDigitsCount) - 1) + Math.random()) * Math.pow(10, decimalDigitsCount * -1)
        if (floatToBeAdd > difference) throw new Error('floatToBeAdd > difference')
    }
    result += floatToBeAdd
    return decimalDigits ? parseFloat(result.toFixed(decimalDigits)) : result
}
Math.getArithmeticSequence = function (start, tolerance, count) {
    tolerance = parseFloat(tolerance.toFixed(1))
    const result = [start]
    let currentNumber = start
    for (let i = 1; i <= count; i++) {
        currentNumber = parseFloat((currentNumber + tolerance).toFixed(1))
        result.push(currentNumber)
    }
    return result
}
Math.fixMinMaxInterval = function (min, max) {
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
Math.getGeometricSeries = function (base, power) {
    if (base === 1) return power + 1
    return 1 * (1 - Math.pow(base, power + 1)) / (1 - base)
}
Math.getColumnIndexSign = function (columnIdx) {
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
Math.getRandomEnglishString = function (len) {
    if (len <= 0) return ''
    const result = []
    const ASCII_A = 65
    const ASCII_Z = 90
    const ASCII_a = 97
    const ASCII_z = 122
    for (let i = 0; i < len; i++) {
        const isLowerCase = Math.getRandomIntInclusive(0, 1) === 0
        const charCode = isLowerCase ? Math.getRandomIntInclusive(ASCII_A, ASCII_Z) : Math.getRandomIntInclusive(ASCII_a, ASCII_z)
        result.push(String.fromCharCode(charCode))
    }
    return result.join('')
}
Math.getBestDataInterval = function (min, max, minLen = 5, maxLen = 15) {
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
Math.getBestArithmeticSequence = function (min, max, desiredLen, opt) {
    // 修正輸入的參數，確保皆為整數，且大小排序正確
    [min, max] = [Math.min(min, max), Math.max(min, max)]
    min = Math.ceil(min)
    max = Math.floor(max)
    desiredLen = Math.floor(Math.abs(desiredLen))

    const candidates: number[][] = []
    const theoryTolerance = (max - min) / (desiredLen - 1)
    const maxTolerance = Math.floor((max - min) / 2)
    const minTolerance = 1
    let bestScoreOfCandidate = Number.MIN_SAFE_INTEGER
    let bestCandidate: number[] = []
    
    // 特殊情況就不需進入for迴圈
    if (desiredLen <= 2) return [min, max]
    if (desiredLen >= max - min + 1) return Math.getArithmeticSequence(min, 1, max - min)
    if (opt?.priority === 'desiredLen') return Math.getArithmeticSequence(min, minTolerance, Math.min(Math.floor((max - min) / minTolerance) + 1, desiredLen) - 1)
    if (opt?.priority === 'tolerance') return Math.getArithmeticSequence(min, maxTolerance, Math.min(Math.floor((max - min) / maxTolerance) + 1, desiredLen) - 1)

    // 計算所有可能的答案，有最佳解就提前停止
    // |(等差數列末項 - max)| + |(實際公差 - 理論公差)|，分數越高代表越不完美，完美情況的分數 = 0，如果分數相同的情況，則會選取公差較小的
    for (let t = minTolerance; t <= maxTolerance; t++) {
        const lenOfArithmeticSequence = Math.min(Math.floor((max - min) / t) + 1, desiredLen)
        const candidate = Math.getArithmeticSequence(min, t, lenOfArithmeticSequence - 1)
        const scoreOfCandidate = (Math.abs(candidate.lastItem() - max) + Math.abs(t - theoryTolerance)) * -1 // 採取扣分制，滿分 = 0分
        if (scoreOfCandidate === 0) return candidate
        if (scoreOfCandidate > bestScoreOfCandidate) {
            bestScoreOfCandidate = scoreOfCandidate
            bestCandidate = candidate
        }
        candidates.push(candidate)
    }
    return bestCandidate
}
Math.getRandomChineseString = function (len) {
    if (len <= 0) return ''

    const startCharCode = parseInt('4e00', 16)
    const endCharCode = parseInt('9fa5', 16)
    const result = []
    for (let i = 0; i < len; i++) {
        const charCode = Math.getRandomIntInclusive(startCharCode, endCharCode)
        result.push(String.fromCharCode(charCode))
    }
    return result.join('')
}
Math.nearestMultiple = function (args) {
    const { of, to } = args
    if (to <= 0) return of
    const remainder = of % to
    if (remainder >= to / 2) return of + to - remainder
    return of - remainder
}
Math.distanceBetween = function (pointA, pointB) {
    return Math.sqrt(Math.pow((pointB.x - pointA.x), 2) + Math.pow((pointB.y - pointA.y), 2))
}
Math.isArea1InArea2 = function (area1, area2) {
    return (
        area2.x <= area1.x &&
        area2.y <= area1.y &&
        area2.x + area2.width >= area1.x + area1.width &&
        area2.y + area2.height >= area1.y + area1.height
    )
}

export {}
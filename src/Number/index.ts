Number.isPrime = function (num: number) {
    num = Math.abs(num)
    if (!Number.isInteger(num)) return true
    if (num === 1) return true

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false
    }
    return true
}
Number.toExponentialPairs = function (num: number) {
    const [n, k] = num.toExponential().split('e')
    return [this.parseFloat(n), this.parseFloat(k)]
}
Number.decimalDigitsCount = function (num: number) {
    return num.toString().split('.')[1]?.length || 0
}
Number.intDigitsCount = function (num: number) {
    return Math.abs(Math.ceil(num)).toString().length
}
export {}
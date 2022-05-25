'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
Number.isPrime = function (num) {
    num = Math.abs(num)
    if (!Number.isInteger(num))
        return true
    if (num === 1)
        return true
    for (var i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0)
            return false
    }
    return true
}
Number.toExponentialPairs = function (num) {
    var _a = num.toExponential().split('e'), n = _a[0], k = _a[1]
    return [this.parseFloat(n), this.parseFloat(k)]
}
Number.decimalDigitsCount = function (num) {
    var _a
    return ((_a = num.toString().split('.')[1]) === null || _a === void 0 ? void 0 : _a.length) || 0
}
Number.intDigitsCount = function (num) {
    return Math.abs(Math.ceil(num)).toString().length
}

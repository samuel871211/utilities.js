'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
Array.prototype.getRandomItem = function () {
    return this[Math.getRandomIntInclusive(0, this.lastIdx())]
}
Array.prototype.lastIdx = function () {
    return this.length - 1
}
Array.prototype.lastItem = function () {
    return this[this.length - 1]
}
Array.prototype.shuffle = function () {
    for (var i = this.lastIdx(); i > 0; i--) {
        var idx = Math.floor(Math.random() * (i + 1))
        var temp = this[i]
        this[i] = this[idx]
        this[idx] = temp
    }
}
Array.prototype.toInteger = function () {
    return parseInt(this.join(''))
}

Array.prototype.getRandomItem = function () {
    return this[Math.getRandomIntInclusive(0, this.lastIdx())]
}
Array.prototype.lastIdx = function () {
    return this.length - 1
}
Array.prototype.lastItem = function () {
    return this[this.length - 1]
}

export {}
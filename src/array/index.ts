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
    for (let i = this.lastIdx(); i > 0; i--) {
        const idx = Math.floor(Math.random() * (i + 1))
        const temp = this[i]
        this[i] = this[idx]
        this[idx] = temp
    }
}
Array.prototype.toInteger = function () {
    return parseInt(this.join(''))
}

export {}
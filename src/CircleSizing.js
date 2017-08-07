class CircleSizing {

  constructor(data, weightKey, maxRadius, minRadius) {
    this.data = data
    this.weightKey = weightKey
    this.maxRadius = maxRadius
    this.minRadius = minRadius
    this.smallestWeight = Infinity
    this.largestWeight = 0

    this.sortedData = JSON.parse(JSON.stringify(this.data))
    this.sortedData.sort((a, b) => a[this.weightKey] - b[this.weightKey])

    for (let member of this.sortedData) {
      if (member[this.weightKey] < this.smallestWeight && member[this.weightKey] !== null) {
        this.smallestWeight = member[this.weightKey]
      }
      if (member[this.weightKey] > this.largestWeight && member[this.weightKey] !== null) {
        this.largestWeight = member[this.weightKey]
      }
    }
  }

  circleSizes() {
    let newData = []
    let radius
    if (!this.weightKey) {
      for (let member of this.data) {
        member.radius = this.minRadius
        newData.push(member)
      }
    } else {
      //circle radii get propotionally larger
      let stepSize = (this.maxRadius-this.minRadius)/(this.largestWeight-this.smallestWeight)

      for (let member of this.data) {
        if (member[this.weightKey] == this.smallestWeight) {
          radius = this.minRadius //smallest weight has minRadius
        } else if (member[this.weightKey] == this.largestWeight) {
          radius = this.maxRadius //largest weight has maxRadius
        } else {
          let ratio = member[this.weightKey] - this.smallestWeight
          if (ratio > 0) {
            radius = this.minRadius + (ratio * stepSize)
          } else {
            radius = 0 //ratio is negative = value was removed/zero
          }
        }
        member.radius = radius
        newData.push(member)
      }
    }
    return newData
  }
}

export default CircleSizing

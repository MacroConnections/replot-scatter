class CircleSizing {
  constructor(data, circleKey, maxRadius, minRadius) {
    this.data = data
    this.circleKey = circleKey
    this.maxRadius = maxRadius
    this.minRadius = minRadius

    this.smallestWeight = Infinity
    this.largestWeight = 0

    this.sortedData = JSON.parse(JSON.stringify(this.data))
    this.sortedData.sort((a, b) => a[this.weightKey] - b[this.weightKey])

    for (let member of this.sortedData) {
      if (member[this.circleKey] < this.smallestWeight && member[this.circleKey] !== null) {
        this.smallestWeight = member[this.circleKey]
      }
      if (member[this.circleKey] > this.largestWeight && member[this.circleKey] !== null) {
        this.largestWeight = member[this.circleKey]
      }
    }
  }

  circleSizes() {
    let newData = []
    let radius
    if (this.circleKey == "default") {
      for (let member of this.data) {
        radius = 2.5
        member["radius"] = radius
        newData.push(member)
      }
    } else {
      //circle radii get propotionally larger
      let stepSize = (this.maxRadius-this.minRadius)/(this.largestWeight-this.smallestWeight)
      for (let member of this.data) {
        if (member[this.circleKey] == this.smallestWeight) {
          radius = this.minRadius //smallest weight has minRadius
        } else if (member[this.circleKey] == this.largestWeight) {
          radius = this.maxRadius //largest weight has maxRadius
        } else {
          let ratio = member[this.circleKey] - this.smallestWeight
          if (ratio > 0) {
            radius = this.minRadius + (ratio * stepSize)
          } else {
            radius = -1 //ratio is negative = value was removed/zero, don't need to add this point
          }
        }
        if (radius > 0) {
          member["radius"] = radius
          newData.push(member)
        }
        else {
          member["radius"] = 0
          newData.push(member)
        }
      }
    }
    return newData
  }
}

export default CircleSizing

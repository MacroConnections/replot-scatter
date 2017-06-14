class CircleSizing {
  constructor(data, circleKey) {
    this.data = data
    this.circleKey = circleKey
    this.maxRadius = 10
    this.minRadius = 2.5
    this.smallestWeight = Infinity
    for (let member of this.data) {
      if (member[this.circleKey] < this.smallestWeight) {
        this.smallestWeight = member[this.circleKey]
      }
    }
  }

  circleSizes() {
    let newData = []
    let radius
    if (this.circleKey == "default") {
      for (let member of this.data) {
        radius = 2.5
        //adjust data
        member["radius"] = radius
        newData.push(member)
      }
    } else {
      for (let member of this.data) {
        if (member[this.circleKey] === this.smallestWeight) {
          radius = this.minRadius
        } else {
          let ratio = (member[this.circleKey])/this.smallestWeight
          radius = this.minRadius * ratio //circle radii get propotionally larger
        }

        member["radius"] = radius
        newData.push(member)
      }
    }
    return newData
  }
}

export default CircleSizing

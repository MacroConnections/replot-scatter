class CircleSizing {
  constructor(data, circleKey) {
    this.data = data
    this.circleKey = circleKey
    this.maxRadius = 8
    this.largestWeight = 0
    for (let member of this.data) {
      if (member[this.circleKey] > this.largestWeight) {
        this.largestWeight = member[this.circleKey]
      }
    }
  }

  circleSizes() {
    //circle radii should be proportional to the largest value
    //--> largest value should be assigned the largest radius
    //decrease the radius proportionally
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
        if (member[this.circleKey] === this.largestWeight) {
          radius = this.maxRadius
        } else {
          let ratio =(member[this.circleKey])/ this.largestWeight
          radius = this.maxRadius * ratio
        }
        //adjust data
        member["radius"] = radius
        newData.push(member)
      }
    }
    return newData
  }
}

export default CircleSizing

import React from "react"
import Line from "./Line.jsx"
import Axis from "./Axis.jsx"
import Legend from "./Legend.jsx"
import Color from "./Color.js"
import ColorPalette from "./ColorPalette.js"
import CircleSizing from "./CircleSizing.js"
import {spring, Motion} from "react-motion"
import PropTypes from "prop-types"

const defPalette = ["#4cab92", "#ca0004", "#003953", "#eccc00", "#9dbd5f", "#0097bf", "#005c7a", "#fc6000"]

const Point = (props) => {
  let m = props.equation.m
  let c = props.equation.c
  let yVal = (m*props.x)+c

  return (
    <Motion
      defaultStyle={{ x: props.x, y: yVal, radius: 0}}
      style={{
        x: spring(props.x, {stiffness: 80, damping: 10}),
        y: spring(props.y, {stiffness: 80, damping: 10}),
        radius: spring(props.radius),
      }}
    >
      {
        style =>
        <circle
          cx={style.x} cy={style.y} r={style.radius}
          stroke={props.color} fill={props.color}/>
    }
    </Motion>
  )
}

class PointSeries extends React.Component {
  render() {
    let series = []
    for (let member of this.props.points) {
      series.push(
        <Point x={member.x} y={member.y}
          radius={member.r} color={member.color} equation={this.props.equation}/>
      )
    }
    return(
      <g>{series}</g>
    )
  }

}

class ScatterPlot extends React.Component {

  render() {
    let data = JSON.parse(JSON.stringify(this.props.data))
    let xKey = this.props.xKey
    let yKey = this.props.yKey
    let xvals = data.map(function(d) {return parseFloat(d[xKey])})
    let yvals = data.map(function(d) {return parseFloat(d[yKey])})

    let circleKey = this.props.circleKey
    let maxRadius = this.props.maxRadius
    let minRadius = this.props.minRadius

    let maxX = Math.max.apply(Math, xvals)
    let minX = Math.min.apply(Math, xvals)
    let maxY = Math.max.apply(Math, yvals)
    let minY
    if (this.props.scale == "log") {
      minY = Math.min.apply(null, yvals.filter(Boolean))
    } else {
      minY = Math.min.apply(Math, yvals)
    }
    let buffer = 80

    let chartWidth = this.props.width - 2*buffer
    let chartHeight = this.props.height - 2*buffer - 30
    let chartX = buffer + 10
    let chartY = buffer

    let chart = []

    let xl = this.props.xLabel
    if (xl != "off") {
      xl = this.props.xKey
    }
    let yl = this.props.yLabel
    if (yl != "off") {
      yl = this.props.yKey
    }

    let yStep
    if (this.props.ySteps == "none") {
      yStep = Math.round((chartHeight)/50)+1
    } else {
      yStep = this.props.ySteps
    }

    chart.push(
      <Axis key={"axis"} x={chartX} y={chartY} width={chartWidth} height={chartHeight}
        color={this.props.axisColor} scale={this.props.scale} grid={this.props.grid}
        xLabel={xl} yLabel={yl}
        xSteps={this.props.xSteps} xTicks={this.props.xTicks} xAxisLine={this.props.xAxisLine}
        yTicks={this.props.yTicks} ySteps={yStep} yAxisLine={this.props.yAxisLine}
        yStart={this.props.yStart}
        maxX={maxX} minX={minX} maxY={maxY} minY={minY} />
    )

    let sets = []
    let setTitles = []
    let c = new CircleSizing(JSON.parse(JSON.stringify(this.props.data)), circleKey, maxRadius, minRadius)
    let circleData = c.circleSizes()

    let sumX = 0
    let sumY = 0
    let sumXY = 0
    let sumXSquare = 0

    for (let member of circleData) {
      let key = setTitles.indexOf(member[this.props.titleKey])

      let widthRatio = (parseFloat(member[this.props.xKey])-minX) / (maxX-minX)
      let modX = widthRatio*chartWidth + chartX

      let heightRatio = 0
      let offset
      if (this.props.scale == "log" && this.props.yStart == "origin") {
        let log = (Math.log10(parseFloat(member[this.props.yKey])))

        let valueRatio = (Math.log10(maxY)) / (yStep - 1)
        let pow10 = (yStep-1) * valueRatio
        let chartMaxY = Math.pow(10, pow10)

        heightRatio = log / (Math.log10(chartMaxY))

        if (minY < 1) {
          let logDiff = (Math.log10(parseFloat(member[this.props.yKey]))-Math.log10(minY))
          heightRatio = logDiff / (Math.log10(maxY)-Math.log10(minY))
        }

      } else if (this.props.scale == "log" && this.props.yStart == "break"){
        let logDiff = (Math.log10(parseFloat(member[this.props.yKey]))-Math.log10(minY))
        heightRatio = logDiff / (Math.log10(maxY)-Math.log10(minY))
      } else if (this.props.scale == "default" &&this.props.yStart == "break") {
        heightRatio = (parseFloat(member[this.props.yKey])-minY) / (maxY-minY)
      } else {
        let chartMaxY = yStep*(maxY)/(yStep-1)
        heightRatio = (parseFloat(member[this.props.yKey])) / chartMaxY
      }
      let modY = (chartHeight) - heightRatio*chartHeight + chartY
      let radius = member["radius"]

      let displayColor
      if (member[this.props.filterBy.prop] == this.props.filterBy.value) {
        displayColor = true
      } else {
        displayColor = false
      }

      if (member[this.props.yKey] == 0 && this.props.scale == "log") {
        modY = 0
        radius = 0
      }

      let p = {x: modX, y: modY, r: radius, f: displayColor}

      if (key != -1) {
        sets[key].push(p)
      } else {
        setTitles.push(member[this.props.titleKey])
        sets.push([p])
      }


      sumX += modX
      sumY += modY
      sumXY += (modX * modY)
      sumXSquare += (modX * modX)
    }

    //calculate line of best fit (linear regression)
    //y = mx + c
    let numData = circleData.length
    let mVal = ((numData * sumXY) - (sumX * sumY)) / ((numData * sumXSquare) - (sumX * sumX))
    let cVal = ((sumXSquare * sumY) - (sumX * sumXY)) / ((numData * sumXSquare) - (sumX * sumX))
    let eq = {m:mVal, c:cVal}

    let numsets = setTitles.length
    for (var i=0; i < numsets; i++) {
      let color = this.props.color[i%this.props.color.length]
      for (let point of sets[i]) {
        if (point.f) {
          point["color"] = color
      } else {
        point["color"] = "#a6acad"
      }

      chart.push(
        <PointSeries points={sets[i]} color={color} equation={eq}/>
      )
    }
  }

    chart.push(
      <Legend key={"legend"} x={chartX} y={chartY+chartHeight+buffer} width={chartWidth}
          titles={setTitles} color={this.props.color} legendColor={this.props.legendColor} />
    )
    return(
      <svg width={this.props.width} height={this.props.height}>
        {chart}
      </svg>
    )
  }

}

ScatterPlot.defaultProps = {
  width: 800,
  height: 600,
  circleKey: "default",
  maxRadius: 10,
  minRadius: 2.5,
  filterBy: "default",
  scale: "default",
  xSteps: 4,
  xTicks: "off",
  xAxisLine: "on",
  xLabel: "off",
  ySteps: "none", //if none. ySteps is calculated
  yTicks: "off",
  yAxisLine: "off",
  yLabel: "off",
  yStart: "origin",
  grid: "default",
  legend: "default",
  legendColor: "#000000",
  color: defPalette,
  axisColor: "#000000"
}

ScatterPlot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  circleKey: PropTypes.string,
  maxRadius: PropTypes.number,
  minRadius: PropTypes.number,
  scale: PropTypes.string,
  xSteps: PropTypes.number,
  xTicks: PropTypes.string,
  xAxisLine: PropTypes.string,
  xLabel: PropTypes.string,
  yTicks: PropTypes.string,
  yAxisLine: PropTypes.string,
  yLabel: PropTypes.string,
  yStart: PropTypes.string,
  grid: PropTypes.string,
  legend: PropTypes.string,
  legendColor: PropTypes.string,
  axisColor: PropTypes.string,
}

export default ScatterPlot

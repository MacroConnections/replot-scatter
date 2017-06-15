import React from "react"
import Line from "./Line.jsx"
import Axis from "./Axis.jsx"
import Legend from "./Legend.jsx"
import Color from "./Color.js"
import ColorPalette from "./ColorPalette.js"
import CircleSizing from "./CircleSizing.js"

const defPalette = ["#4cab92", "#ca0004", "#003953", "#eccc00", "#9dbd5f", "#0097bf", "#005c7a", "#fc6000"]

class Point extends React.Component {

  render() {
    return(
      <g>
        <circle cx={this.props.x} cy={this.props.y} r={this.props.radius}
          stroke={this.props.color} fill={this.props.color} />
      </g>
    )
  }

}

class PointSeries extends React.Component {

  render() {
    let series = []
    for (var i=0; i < this.props.points.length; i++) {
      series.push(
        <Point x={this.props.points[i][0]} y={this.props.points[i][1]}
          radius={this.props.points[i][2]} color={this.props.color} />
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
    let minY = Math.min.apply(Math, yvals)

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
    chart.push(
      <Axis key={"axis"} x={chartX} y={chartY} width={chartWidth} height={chartHeight}
        color={this.props.axisColor} scale={this.props.scale} grid={this.props.grid}
        xLabel={xl} yLabel={yl}
        xSteps={this.props.xSteps} xTicks={this.props.xTicks} xAxisLine={this.props.xAxisLine}
        yTicks={this.props.yTicks} ySteps={Math.round((chartHeight)/50)+1} yAxisLine={this.props.yAxisLine}
        maxX={maxX} minX={minX} maxY={maxY} minY={minY} />
    )

    let sets = []
    let setTitles = []
    let c = new CircleSizing(JSON.parse(JSON.stringify(this.props.data)), circleKey, maxRadius, minRadius)
    let circleData = c.circleSizes()

    for (let member of circleData) {
      let key = setTitles.indexOf(member[this.props.titleKey])

      let widthRatio = (parseFloat(member[this.props.xKey])-minX) / (maxX-minX)
      let modX = widthRatio*chartWidth + chartX

      let heightRatio = 0
      if (this.props.scale == "log") {
        let logDiff = (Math.log10(parseFloat(member[this.props.yKey]))-Math.log10(minY))
        heightRatio = logDiff / (Math.log10(maxY)-Math.log10(minY))
      } else {
        heightRatio = (parseFloat(member[this.props.yKey])-minY) / (maxY-minY)
      }
      let modY = chartHeight - heightRatio*chartHeight + chartY

      let radius = member["radius"]
      if (key != -1) {
        sets[key].push([modX, modY, radius])
      } else {
        setTitles.push(member[this.props.titleKey])
        sets.push([[modX, modY, radius]])
      }
    }
    let numsets = setTitles.length
    for (var i=0; i < numsets; i++) {
      chart.push(
        <PointSeries points={sets[i]} color={this.props.color[i%this.props.color.length]} />
      )
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
  scale: "default",
  xSteps: 4,
  xTicks: "off",
  xAxisLine: "on",
  xLabel: "off",
  ySteps: 7,
  yTicks: "off",
  yAxisLine: "off",
  yLabel: "off",
  grid: "default",
  legend: "default",
  legendColor: "#000000",
  color: defPalette,
  axisColor: "#000000"
}

export default ScatterPlot

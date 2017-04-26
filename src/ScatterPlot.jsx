import React from "react"
import Line from "./Line.jsx"
import Axis from "./Axis.jsx"
import Legend from "./Legend.jsx"
import Color from "./Color.js"
import ColorPalette from "./ColorPalette.js"

const defPalette = new ColorPalette(new Color(75,255,255), new Color(255,0,150), 6)

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
          radius={2} color={this.props.color} />
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

    let maxX = Math.max.apply(Math, xvals)
    let minX = Math.min.apply(Math, xvals)
    let maxY = Math.max.apply(Math, yvals)
    let minY = Math.min.apply(Math, yvals)

    let buffer = 75

    let chartWidth = this.props.width - 2*buffer
    let chartHeight = this.props.height - 2*buffer - 30
    let chartX = buffer
    let chartY = buffer + 30

    let palette = this.props.color.palette

    let chart = []

    chart.push(
      <Axis x={chartX} y={chartY} width={chartWidth} height={chartHeight}
        scale={this.props.scale} grid={this.props.grid}
        xLabel={this.props.xKey} yLabel={this.props.yKey}
        xTicks={4} yTicks={Math.round((chartHeight)/50)+1}
        maxX={maxX} minX={minX} maxY={maxY} minY={minY} />
    )

    let sets = []
    let setTitles = []
    for (let member of data) {
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

      if (key != -1) {
        sets[key].push([modX, modY])
      } else {
        setTitles.push(member[this.props.titleKey])
        sets.push([[modX, modY]])
      }
    }

    let numsets = setTitles.length
    for (var i=0; i < numsets; i++) {
      chart.push(
        <PointSeries points={sets[i]} color={palette[i%palette.length].rgb()} />
      )
    }

    chart.push(
      <Legend x={chartX} y={buffer} width={chartWidth}
        titles={setTitles} color={this.props.color} />
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
  scale: "default",
  grid: "default",
  color: defPalette
}

export default ScatterPlot

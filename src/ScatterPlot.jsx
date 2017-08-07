import React from "react"
import {spring, Motion} from "react-motion"
import PropTypes from "prop-types"
import {Resize, Axis} from "replot-core"
import CircleSizing from "./CircleSizing.js"

class Point extends React.Component {

  render() {
    let m = this.props.equation.m
    let c = this.props.equation.c
    let yVal = (m*this.props.x)+c

    return (
      <Motion
        defaultStyle={{
          x: this.props.x,
          y: (this.props.initialAnimation ? yVal: this.props.y),
          radius: (this.props.initialAnimation ? 0 : this.props.radius)
        }}
        style={{
          x: spring(this.props.x, {stiffness: 100, damping: 20}),
          y: spring(this.props.y, {stiffness: 100, damping: 20}),
          radius: spring(this.props.radius),
        }}
      >
        {
          style =>
          <circle
            cx={style.x} cy={style.y} r={style.radius}
            stroke={this.props.color} fill={this.props.color} />
        }
      </Motion>
    )
  }

}

class PointSeries extends React.Component {

  render() {
    let series = []

    for (let i = 0; i < this.props.points.length; i ++) {
      let point = this.props.points[i]
      series.push(
        <Point key={this.props.group + i}
          x={point.x} y={point.y} radius={point.r}
          equation={this.props.equation} color={point.color}
          initialAnimation={this.props.initialAnimation}/>
      )
    }

    return(
      <g>{series}</g>
    )
  }

}

class SeriesContainer extends React.Component {

  render() {
    let series = []
    let groups
    if (this.props.groupKey) {
      groups = [...new Set(this.props.data.map(item => item[this.props.groupKey]))]
    }
    let cs = new CircleSizing(JSON.parse(JSON.stringify(this.props.data)), this.props.weightKey, this.props.maxRadius, this.props.minRadius)
    let circleData = cs.circleSizes()

    let yUnit
    if (this.props.yScale === "log") {
      if (this.props.minY === 0) {
        yUnit = (this.props.height) / Math.log10(this.props.maxY)
      } else {
        yUnit = (this.props.height) / (Math.log10(this.props.maxY) - Math.log10(this.props.minY))
      }
    } else {
      yUnit = (this.props.height) / (this.props.maxY - this.props.minY)
    }
    let xUnit
    if (this.props.xScale === "log") {
      if (this.props.minX === 0) {
        xUnit = (this.props.width) / Math.log10(this.props.maxX)
      } else {
        xUnit = (this.props.width) / (Math.log10(this.props.maxX) - Math.log10(this.props.minX))
      }
    } else {
      xUnit = (this.props.width) / (this.props.maxX - this.props.minX)
    }

    let allSets = []
    let set = []
    let x, y
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0

    if (this.props.groupKey) {
      for (let i = 0; i < groups.length; i++){
        set = []
        for (let dataPoint of circleData){
          if (dataPoint[this.props.groupKey] === groups[i]){
            if (this.props.yScale === "log") {
              if (dataPoint[this.props.yKey] === 0) {
                y = Math.log10(this.props.maxY) * yUnit
              } else {
                y = (Math.log10(this.props.maxY) - Math.log10(dataPoint[this.props.yKey])) * yUnit
              }
            } else {
              y = (this.props.maxY - dataPoint[this.props.yKey]) * yUnit
            }
            if (this.props.xScale === "log") {
              if (dataPoint[this.props.xKey] === 0) {
                x = 0
              } else {
                if (this.props.minX === 0){
                  x = Math.log10(dataPoint[this.props.xKey]) * xUnit
                } else {
                  x = (Math.log10(dataPoint[this.props.xKey]) - Math.log10(this.props.minX)) * xUnit
                }
              }
            } else {
              x = (dataPoint[this.props.xKey] - this.props.minX) * xUnit
            }
            set.push({x: x, y: y, r: dataPoint.radius, color: this.props.color(i, groups[i])})
            sumX += x
            sumY += y
            sumXY += (x*y)
            sumXX += (x*x)
          }
        }
        allSets.push({points: set, group: groups[i]})
      }
    } else {
      for (let dataPoint of circleData){
        if (this.props.yScale === "log") {
          if (dataPoint[this.props.yKey] === 0) {
            y = Math.log10(this.props.maxY) * yUnit
          } else {
            y = (Math.log10(this.props.maxY) - Math.log10(dataPoint[this.props.yKey])) * yUnit
          }
        } else {
          y = (this.props.maxY - dataPoint[this.props.yKey]) * yUnit
        }
        x = (dataPoint[this.props.xKey] - this.props.minX) * xUnit
        set.push({x: x, y: y, r: dataPoint.radius, color: this.props.color(0)})
        sumX += x
        sumY += y
        sumXY += (x*y)
        sumXX += (x*x)
      }
      allSets.push({points: set, group: "all"})
    }

    let numPoints = this.props.data.length
    let m = (numPoints*sumXY - sumX*sumY) / (numPoints*sumXX - sumX*sumX)
    let c = (sumY/numPoints) - (m*sumX)/numPoints
    let eq = {m: m, c: c, xInt: (this.props.height - c) / m}

    for (let member of allSets){
      series.push(
        <PointSeries key={member.group} points={member.points}
          group={member.group} equation={eq}
          initialAnimation={this.props.initialAnimation}/>
      )
    }

    if (this.props.showTrendline) {
      series.push(
        <Motion key={"trendlineMotion"}
          defaultStyle={{
            x1: (eq.c > this.props.height ? eq.xInt : 0),
            y1: (eq.c > this.props.height ? this.props.height : eq.c),
            x2: (this.props.initialAnimation ? (eq.c > this.props.height ? eq.xInt : 0) : this.props.width),
            y2: (this.props.initialAnimation ? (eq.c > this.props.height ? this.props.height : eq.c) : (eq.m*(this.props.width)+eq.c))
          }}
          style={{
            x1: (eq.c > this.props.height ? eq.xInt : 0),
            y1: (eq.c > this.props.height ? this.props.height : eq.c),
            x2: spring(this.props.width, {stiffness: 100, damping: 20}),
            y2: spring(eq.m*(this.props.width)+eq.c, {stiffness: 100, damping: 20}),
          }}
          >
          {
            style =>
            <line key={"trendline"}
              x1={style.x1}
              y1={style.y1}
              x2={style.x2}
              y2={style.y2}
              stroke={this.props.style.trendlineColor}
              strokeWidth={this.props.style.trendlineWidth}
              opacity={this.props.style.trendlineOpacity}
              />
          }
        </Motion>
      )
    }


    return (
      <g>
        {series}
      </g>
    )
  }
}

class ScatterPlot extends React.Component {

  getLegend() {
    let groups = [...new Set(this.props.data.map(item => item[this.props.groupKey]))]
    let legendValues = {}
    for (let i = 0; i < groups.length; i++) {
      legendValues[groups[i]] = this.colorPoints(i, groups[i])
    }
    return legendValues
  }

  colorPoints(i, group) {
    if (this.props.color instanceof Array) {
      return this.props.color[i%this.props.color.length]
    } else {
      return this.props.color(i, group)
    }
  }

  render() {
    let xVals = this.props.data.map(item => item[this.props.xKey])
    let yVals = this.props.data.map(item => item[this.props.yKey])

    let maxX = Math.max(...xVals)
    let minX
    if (this.props.xScale === "log") {
      minX = Math.min(...xVals.filter(Boolean))
    } else {
      minX = Math.min(...xVals)
    }

    let maxY = Math.max(...yVals)
    let minY
    if (this.props.yScale === "log") {
      minY = Math.min(...yVals.filter(Boolean))
    } else {
      minY = Math.min(...yVals)
    }

    let yPadding = (maxY - minY) / 10
    let xPadding = (maxX - minX) / 10

    if (this.props.yStart === "origin" || this.props.yScale === "log" && minY - yPadding < 0){
      minY = 0
    } else {
      minY = minY - yPadding
    }

    if (this.props.xStart === "origin" || this.props.xScale === "log" && minX - xPadding < 0){
      minX = 0
    } else {
      minX = minX - xPadding
    }

    let graph

    graph = (
      <Axis key="axis" width={this.props.width} height={this.props.height}
        graphTitle={this.props.graphTitle} xTitle={this.props.xTitle}
        yTitle={this.props.yTitle} showXAxisLine={this.props.showXAxisLine}
        showXLabels={this.props.showXLabels} showYAxisLine={this.props.showYAxisLine}
        showYLabels={this.props.showYLabels} showGrid={this.props.showGrid}
        axisStyle={this.props.axisStyle} minY={minY}
        maxY={maxY+yPadding} ySteps={this.props.ySteps} yScale={this.props.yScale}
        xAxisMode="continuous" minX={minX}
        maxX={maxX+xPadding} xScale={this.props.xScale}
        legendValues={this.props.groupKey ? this.getLegend() : null} legendStyle={this.props.legendStyle}
        legendMode={this.props.legendMode} showLegend={this.props.showLegend}>
        <SeriesContainer data={this.props.data} xVals={xVals} minX={minX}
          maxX={maxX+xPadding} yVals={yVals} minY={minY}
          maxY={maxY+yPadding} xStart={this.props.xStart} yStart={this.props.yStart}
          xKey={this.props.xKey} yKey={this.props.yKey}
          yScale={this.props.yScale} xScale={this.props.xScale}
          groupKey={this.props.groupKey} weightKey={this.props.weightKey}
          minRadius={this.props.minRadius} maxRadius={this.props.maxRadius}
          showTrendline={this.props.showTrendline} color={this.colorPoints.bind(this)}
          style={this.props.graphStyle} initialAnimation={this.props.initialAnimation}/>
      </Axis>
    )

    return(
      <svg width={this.props.width} height={this.props.height}>
        {graph}
      </svg>
    )
  }

}

class ScatterPlotResponsive extends React.Component {

  render () {
    return (
      <Resize width={this.props.width}>
        <ScatterPlot {...this.props} />
      </Resize>
    )
  }
}

ScatterPlot.defaultProps = {
  xKey: "x",
  yKey: "y",
  minRadius: 2.5,
  maxRadius: 10,
  width: 800,
  height: 600,
  color: [
    "#4cab92", "#ca0004", "#003953", "#eccc00",
    "#9dbd5f", "#0097bf", "#005c7a", "#fc6000"
  ],
  showXAxisLine: true,
  showXLabels: true,
  showYAxisLine: true,
  showYLabels: true,
  showGrid: true,
  showLegend: true,
  showTrendline: true,
  yScale: "lin",
  yStart: "break",
  xScale: "lin",
  xStart: "break",
  graphStyle: {
    trendlineColor: "#C4C4C4",
    trendlineWidth: 1.5,
    trendlineOpacity: 1
  },
  axisStyle: {
    axisColor: "#000000",
    labelColor: "#000000",
    titleColor: "#000000",
    gridColor: "#DDDDDD",
    lineWidth: 2,
    lineOpacity: 1
  },
  legendStyle: {
    fontColor: "#000000",
    backgroundColor: "none",
    showBorder: false,
    borderColor: "#000000"
  },
  initialAnimation: true
}

ScatterPlotResponsive.defaultProps = {
  width: 800
}

ScatterPlot.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  height: PropTypes.number,
  circleKey: PropTypes.string,
  maxRadius: PropTypes.number,
  minRadius: PropTypes.number,
  scale: PropTypes.string,
  xSteps: PropTypes.number,
  xTicks: PropTypes.string,
  xAxisLine: PropTypes.string,
  xLabel: PropTypes.string,
  ySteps: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  yTicks: PropTypes.string,
  yAxisLine: PropTypes.string,
  yLabel: PropTypes.string,
  yStart: PropTypes.string,
  grid: PropTypes.string,
  gridColor: PropTypes.string,
  legend: PropTypes.string,
  legendColor: PropTypes.string,
  color: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array
  ]),
  axisColor: PropTypes.string,
  showTrendline: PropTypes.bool,
  trendlineColor: PropTypes.string,
  trendlineWidth: PropTypes.number,
  trendlineOpacity: PropTypes.number
}

export default ScatterPlotResponsive

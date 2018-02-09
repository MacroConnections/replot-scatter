import React from "react"
import ReactDOM from "react-dom"
import ScatterPlot from "../index.js"

class KeyValueRow extends React.Component {

  changeHandler(e) {
    this.props.updateData({
      gender: this.props.gender,
      height: this.props.height,
      weight: e.target.value || "0"
    })
  }

  render() {
    const style = {
      cell: {
        minWidth: "100px",
      }
    }

    return(
      <tr>
        <td style={style.cell}>{this.props.gender} </td>
        <td style={style.cell}>{this.props.height}</td>
        <td style={style.cell}>
          <input type="text" value={parseFloat(this.props.weight)}
            onChange={this.changeHandler.bind(this)} />
        </td>
      </tr>
    )
  }

}

class KeyValueTable extends React.Component {

  render() {
    const style = {
      container: {
        width: "30%",
        float: "left",
        padding: "20px",
      }
    }
    let rows = []
    let dataPoint
    for (let i = 0; i < this.props.data.length; i++) {
      dataPoint = this.props.data[i]
      rows.push(
        <KeyValueRow key={"row" + i}
          gender={dataPoint.gender} height={dataPoint.height} weight={dataPoint.weight}
          updateData={this.props.updateData} />
      )
    }

    return (
      <div className="container" style={style.container}>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }

}

class ScaleButton extends React.Component {

  clickHandler() {
    this.props.updateScale({
      yScale: this.props.title
    })
  }

  render() {
    let style = {
      button: {
        width: "50%",
        float: "left",
        padding: "10px",
        textAlign: "center",
        color: "#FFFFFF",
        backgroundColor: this.props.color,
      }
    }

    return (
      <div className="button" style={style.button}
        onClick={this.clickHandler.bind(this)}>
        {this.props.title}
      </div>
    )
  }

}

class ScaleSwitch extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      yScale: "log"
    }
  }

  render() {
    const style = {
      switch: {
        width: "300px",
        float: "left",
      }
    }

    let types = ["lin", "log"]
    let buttons = []
    let color = ""
    for (var i=0; i < types.length; i++) {
      if (types[i] == this.props.yScale) {
        color = "#00AA00"
      } else {
        color = "#444444"
      }
      buttons.push(
        <ScaleButton key={types[i]} title={types[i]}
        updateScale={this.props.updateScale.bind(this)} color={color} />
      )
    }

    return(
      <div className="switch" style={style.switch}>
        {buttons}
      </div>
    )
  }

}

class ExampleApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [
        {gender: "male", height: 70, weight: 155, shoeSize: 10},
        {gender: "male", height: 72, weight: 144, shoeSize: 12},
        {gender: "male", height: 73, weight: 158, shoeSize: 11.5},
        {gender: "male", height: 72, weight: 160, shoeSize: 11},
        {gender: "male", height: 77, weight: 186, shoeSize: 13},
        {gender: "male", height: 68, weight: 153, shoeSize: 10},
        {gender: "male", height: 69, weight: 160, shoeSize: 9},
        {gender: "male", height: 67, weight: 166, shoeSize: 9.5},
        {gender: "male", height: 64, weight: 169, shoeSize: 9},
        {gender: "male", height: 63, weight: 126, shoeSize: 9.5},
        {gender: "male", height: 66.5, weight: 120, shoeSize: 9},
        {gender: "male", height: 65.5, weight: 147, shoeSize: 11},
        {gender: "female", height: 60, weight: 90, shoeSize: 6},
        {gender: "female", height: 63.5, weight: 100, shoeSize: 6.5},
        {gender: "female", height: 62, weight: 102, shoeSize: 6.5},
        {gender: "female", height: 65, weight: 112, shoeSize: 7},
        {gender: "female", height: 59, weight: 90, shoeSize: 6},
        {gender: "female", height: 58.5, weight: 95, shoeSize: 5.5},
        {gender: "female", height: 61.5, weight: 115, shoeSize: 6},
        {gender: "female", height: 69, weight: 125, shoeSize: 8},
        {gender: "female", height: 70, weight: 135, shoeSize: 8.5},
        {gender: "female", height: 58.5, weight: 140, shoeSize: 4.5},
        {gender: "female", height: 68, weight: 158, shoeSize: 7.5},
        {gender: "female", height: 64, weight: 160, shoeSize: 7.5},
        {gender: "female", height: 65, weight: 130.5, shoeSize: 7},
      ],
      yScale: "log"
    }
  }

  updateData(mutatedObject) {
    let mutatedData = JSON.parse(JSON.stringify(this.state.data))
    let chosenIndex = -1
    for (let index=0; index < mutatedData.length; index++) {
      if (mutatedData[index].gender === mutatedObject.gender && mutatedData[index].height === mutatedObject.height) {
        chosenIndex = index
        break
      }
    }
    console.log(chosenIndex)
    if (chosenIndex > -1) {
      mutatedData[chosenIndex].weight = parseFloat(mutatedObject.weight)
      this.setState({data: mutatedData})
    }
  }

  updateScale(mutatedObject) {
    this.setState({yScale: mutatedObject.yScale})
  }

  colorMe(index, group) {
    if (group === "male") {
      return "blue"
    } else if (group === "female") {
      return "pink"
    }
  }



  render() {
    return(
      <div className="container">
        <h1 style={{textAlign: "center"}}> ScatterPlots for React </h1>
        <div style={{width:"70%", float:"left", padding:"50px"}}>
          <h2>Basic ScatterPlot Usage</h2>
          <ScatterPlot data={this.state.data} xKey="height" yKey="weight"
            yScale={this.state.yScale}/>
          <h2>ScatterPlot with groupKey</h2>
          <ScatterPlot data={this.state.data} xKey="height" yKey="weight"
            yScale={this.state.yScale} groupKey="gender"/>
          <h2>ScatterPlot with groupKey and weightKey</h2>
          <ScatterPlot data={this.state.data} xKey="height" yKey="weight"
            yScale={this.state.yScale} groupKey="gender" weightKey="shoeSize"/>
          <h2>ScatterPlot with groupKey, weightKey, axis titles, and color customization</h2>
          <ScatterPlot data={this.state.data} xKey="height" yKey="weight"
            yScale={this.state.yScale} groupKey="gender" weightKey="shoeSize"
            color={this.colorMe} xTitle="Heights" yTitle="Weights"
            axisStyle={{axisColor: "#f17e33", labelColor: "#f17e33"}}/>
        </div>
        <ScaleSwitch yScale={this.state.yScale} updateScale={this.updateScale.bind(this)} />
        <KeyValueTable data={this.state.data} updateData={this.updateData.bind(this)} />
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)

import React from "react"
import ReactDOM from "react-dom"
import ScatterPlot from "../src/index.jsx"

class KeyValueRow extends React.Component {

  changeHandler(e) {
    this.props.updateData({
      continent: this.props.continent,
      population: this.props.population,
      gdp: e.target.value
    })
  }

  render() {
    const style = {
      cell: {
        minWidth: "100px",
      }
    }

    return(
      <tr key={this.props.continent.concat(this.props.population)}>
        <td style={style.cell}>{this.props.continent} </td>
        <td style={style.cell}>{this.props.population}</td>
        <td style={style.cell}>
          <input type="text" value={parseFloat(this.props.gdp)}
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
    for (let dataPoint of this.props.data) {
      rows.push(
        <KeyValueRow key={dataPoint.continent.concat(dataPoint.population)}
          continent={dataPoint.continent} population={dataPoint.population} gdp={dataPoint.gdp}
          updateData={this.props.updateData.bind(this)} />
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
      scale: this.props.title
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
      scale: "log"
    }
  }

  render() {
    const style = {
      switch: {
        width: "300px",
        float: "left",
      }
    }

    let types = ["default", "log"]
    let buttons = []
    let color = ""
    for (var i=0; i < types.length; i++) {
      if (types[i] == this.props.scale) {
        color = "#00AA00"
      } else {
        color = "#444444"
      }
      buttons.push(
        <ScaleButton title={types[i]}
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
        {continent: "Asia", country: "China", population: 1388232693, gdp: 11795297000},
        {continent: "Asia", country: "Japan", population: 126045211, gdp: 4841221000},
        {continent: "Asia", country: "India", population: 1342512706, gdp: 2454458000},
        {continent: "Asia", country: "South Korea", population: 50704971, gdp: 1498074000},
        {continent: "Asia", country: "Indonesia", population: 263510146, gdp: 1020515000},
        {continent: "Asia", country: "Saudi Arabia", population: 32742664, gdp: 707379000},
        {continent: "S. America", country: "Brazil", population: 211243220, gdp: 2140940000},
        {continent: "S. America", country: "Argentina", population: 44272125, gdp: 628935000},
        {continent: "S. America", country: "Colombia", population: 49067981, gdp: 306439000},
        {continent: "S. America", country: "Venezuela", population: 31925705, gdp: 251589000},
        {continent: "S. America", country: "Chile", population: 18313495, gdp: 251220000},
        {continent: "S. America", country: "Peru", population: 32166473, gdp: 207072000},
        {continent: "Europe", country: "Germany", population: 80636124, gdp: 3423287000},
        {continent: "Europe", country: "UK", population: 65511098, gdp: 2496757000},
        {continent: "Europe", country: "France", population: 64938716, gdp: 2420440000},
        {continent: "Europe", country: "Italy", population: 59797978, gdp: 1807425000},
        {continent: "Europe", country: "Russia", population: 143375006, gdp: 1560706000},
        {continent: "Europe", country: "Spain", population: 46070146, gdp: 1232440000},
        {continent: "Africa", country: "Nigeria", population: 191835936, gdp: 400621000},
        {continent: "Africa", country: "Egypt", population: 95215102, gdp: 332349000},
        {continent: "Africa", country: "South Africa", population: 55436360, gdp: 317568000},
        {continent: "Africa", country: "Algeria", population: 41063753, gdp: 173947000},
        {continent: "Africa", country: "Angola", population: 26655513, gdp: 122365000},
        {continent: "Africa", country: "Sudan", population: 42166323, gdp: 115874000},
      ],
      scale: "log"
    }
  }

  updateData(mutatedObject) {
    let mutatedData = JSON.parse(JSON.stringify(this.state.data))
    let chosenIndex = -1
    for (let index=0; index < mutatedData.length; index++) {
      if (mutatedData[index].continent === mutatedObject.continent && mutatedData[index].population === mutatedObject.population) {
        chosenIndex = index
        break
      }
    }
    if (chosenIndex > -1) {
      mutatedData[chosenIndex].gdp = parseFloat(mutatedObject.gdp)
      this.setState({data: mutatedData})
    }
  }

  updateScale(mutatedObject) {
    this.setState({scale: mutatedObject.scale})
  }

  render() {
    return(
      <div className="container">
        <h1 style={{textAlign: "center"}}> Ent: Scatterplots for react </h1>
        <KeyValueTable data={this.state.data} updateData={this.updateData.bind(this)} />
        <ScaleSwitch scale={this.state.scale} updateScale={this.updateScale.bind(this)} />
        <div style={{width:"70%", float:"right", marginTop:"50px", padding:"50px", backgroundColor:"#323940"}}>
          <ScatterPlot data={this.state.data}
            titleKey="continent" xKey="population" yKey="gdp" 
            scale={this.state.scale} grid="default" legend="default" color={this.state.color} />
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)

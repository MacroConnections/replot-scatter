import React from "react"
import ReactDOM from "react-dom"
import ScatterPlot from "../src/index.jsx"

class KeyValueRow extends React.Component {

  changeHandler(e) {
    // this.props.updateData({
    //   continent: this.props.continent,
    //   population: this.props.population,
    //   averageAge: e.target.value,
    // })
    this.props.updateData({
      gender: this.props.gender,
      height: this.props.height,
      weight: this.props.weight,
      shoeSize: e.target.value,
    })
  }

  render() {
    const style = {
      cell: {
        minWidth: "100px",
      }
    }

    // return(
    //   <tr key={this.props.continent.concat(this.props.population)}>
    //     <td style={style.cell}>{this.props.continent} </td>
    //     <td style={style.cell}>{this.props.population}</td>
    //     <td style={style.cell}>{this.props.gdp}</td>
    //     <td style={style.cell}>
    //       <input style={{width:"50%"}} type="text" value={parseFloat(this.props.averageAge)}
    //         onChange={this.changeHandler.bind(this)} />
    //     </td>
    //   </tr>
    // )

    return (
      <tr>
        <td style={style.cell}>{this.props.height}</td>
        <td style={style.vell}>{this.props.weight}</td>
        <td style={style.cell}>
          <input style={{width:"50%"}} type="text" value={parseFloat(this.props.shoeSize) || ""}
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
        paddingLeft: "10px",
        paddingRight: "5px"
      }
    }
    let rows = []
    for (let dataPoint of this.props.data) {
      // rows.push(
      //   <KeyValueRow key={dataPoint.continent.concat(dataPoint.population)}
      //     continent={dataPoint.continent} population={dataPoint.population}
      //     gdp={dataPoint.gdp} averageAge={dataPoint.averageAge}
      //     updateData={this.props.updateData.bind(this)} />
      // )

      rows.push(
        <KeyValueRow
          gender={dataPoint.gender} height={dataPoint.height}
          weight={dataPoint.weight} shoeSize={dataPoint.shoeSize}
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
        paddingLeft: "18px",
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
      // data: [
      //   {continent: "S. America", country: "Brazil", population: 211243220, gdp: 2140940000, averageAge: 35},
      //   {continent: "S. America", country: "Argentina", population: 44272125, gdp: 628935000, averageAge: 40},
      //   {continent: "S. America", country: "Colombia", population: 49067981, gdp: 306439000, averageAge: 52},
      //   {continent: "S. America", country: "Venezuela", population: 31925705, gdp: 251589000, averageAge: 45},
      //   {continent: "S. America", country: "Chile", population: 18313495, gdp: 251220000, averageAge: 38},
      //   {continent: "S. America", country: "Peru", population: 32166473, gdp: 207072000, averageAge: 46},
      //   {continent: "Europe", country: "Germany", population: 80636124, gdp: 3423287000, averageAge: 56},
      //   {continent: "Europe", country: "UK", population: 65511098, gdp: 2496757000, averageAge: 28},
      //   {continent: "Europe", country: "France", population: 64938716, gdp: 2420440000, averageAge: 58},
      //   {continent: "Europe", country: "Italy", population: 59797978, gdp: 1807425000, averageAge: 85},
      //   {continent: "Europe", country: "Russia", population: 143375006, gdp: 1560706000, averageAge: 68},
      //   {continent: "Europe", country: "Spain", population: 46070146, gdp: 1232440000, averageAge: 59},
      //   {continent: "Africa", country: "Nigeria", population: 191835936, gdp: 400621000, averageAge: 30},
      //   {continent: "Africa", country: "Egypt", population: 95215102, gdp: 332349000, averageAge: 64},
      //   {continent: "Africa", country: "South Africa", population: 55436360, gdp: 317568000, averageAge: 57},
      //   {continent: "Africa", country: "Algeria", population: 41063753, gdp: 173947000, averageAge: 57},
      //   {continent: "Africa", country: "Angola", population: 26655513, gdp: 122365000, averageAge: 100},
      //   {continent: "Africa", country: "Sudan", population: 42166323, gdp: 115874000, averageAge: 54},
      //   {continent: "Asia", country: "China", population: 1388232693, gdp: 11795297000, averageAge: 78},
      //   {continent: "Asia", country: "Japan", population: 126045211, gdp: 4841221000, averageAge: 45},
      //   {continent: "Asia", country: "India", population: 1342512706, gdp: 2454458000, averageAge: 77},
      //   {continent: "Asia", country: "South Korea", population: 50704971, gdp: 1498074000, averageAge: 50},
      //   {continent: "Asia", country: "Indonesia", population: 263510146, gdp: 1020515000, averageAge: 88},
      //   {continent: "Asia", country: "Saudi Arabia", population: 32742664, gdp: 707379000, averageAge: 54},
      // ],
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
      scale: "log"
    }
  }

  // updateData(mutatedObject) {
  //   let mutatedData = JSON.parse(JSON.stringify(this.state.data))
  //   let chosenIndex = -1
  //   for (let index=0; index < mutatedData.length; index++) {
  //     if (mutatedData[index].continent === mutatedObject.continent && mutatedData[index].population === mutatedObject.population) {
  //       chosenIndex = index
  //       break
  //     }
  //   }
  //   if (chosenIndex > -1) {
  //     mutatedData[chosenIndex].averageAge = parseFloat(mutatedObject.averageAge)
  //     this.setState({data: mutatedData})
  //   }
  // }

  updateData(mutatedObject) {
    let mutatedData = JSON.parse(JSON.stringify(this.state.data))
    let chosenIndex = -1
    for (let index=0; index < mutatedData.length; index++) {
      if (mutatedData[index].weight === mutatedObject.weight && mutatedData[index].height === mutatedObject.height) {
        chosenIndex = index
        break
      }
    }
    if (chosenIndex > -1) {
      mutatedData[chosenIndex].shoeSize = parseFloat(mutatedObject.shoeSize)
      this.setState({data:mutatedData})
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
        <div style={{width:"70%", float:"right",  backgroundColor:"#FFFFFF"}}>
          <ScatterPlot data={this.state.data}
            titleKey="gender" xKey="height" yKey="weight" circleKey="shoeSize"
            scale={this.state.scale} grid="default" legend="default" color={this.state.color}
            xLabel="on" yLabel="on" />
        </div>
      </div>
    )
  }
}

// <ScatterPlot data={this.state.data}
//   titleKey="continent" xKey="population" yKey="gdp" circleKey="averageAge"
//   scale={this.state.scale} grid="default" legend="default" color={this.state.color}
//   xLabel="on" yLabel="on"/>

ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)

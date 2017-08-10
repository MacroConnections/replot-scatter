# Scatter Plots for react
Intelligent and customizable scatter plot components for react.

## Installation
Only works with React projects. React must be installed separately.
```bash
npm install replot-line
```

Then with a module bundler like webpack/browserify that supports CommonJS/ES2015
modules, use as you would anything else.

```javascript
import ScatterPlot from 'replot-scatter'
```

## API
replot-scatter is designed to easily create ScatterPlots.
The only *required* input is proper JSON formatted data.

### Basic Usage
In the simplest case, just supply data (as a Javascript array) and specify the
keys associated with the values -:

```javascript
render() {
  let data = [
    {height: 70, weight: 155},
    {height: 72, weight: 144},
    {height: 73, weight: 158},
    {height: 72, weight: 160},
    {height: 77, weight: 186},
    {height: 68, weight: 153},
    {height: 69, weight: 160},
    {height: 67, weight: 166},
    {height: 60, weight: 90},
    {height: 63.5, weight: 100},
    {height: 62, weight: 102},
    {height: 65, weight: 112},
    {height: 59, weight: 90},
    {height: 58.5, weight: 95},
    {height: 61.5, weight: 115},
    {height: 69, weight: 125},
    {height: 70, weight: 135},
  ],

	return(
		<ScatterPlot data={data}
		xKey="height"
		yKey="weight" />
	)
}
```

- `data` is the only required prop
- `xKey` defaults to `"x"`
- `yKey` defaults to `"y"`

### Advanced Usage - Groups and Weights
Replot ScatterPlots support displaying multiple distibutions of points. If a
`groupKey` prop is included, the points on the ScatterPlot will be colored
according to their groups.

Replot ScatterPlots also support variable size points according to a weight. If
a `weightKey` prop is included, the points will be sized according to their weight.
The user can also specify `minRadius` and `maxRadius` props to alter the range in
sizes of the circles. If no `weightKey` is specified, all circles will assume a
size of `minRadius`.

```javascript
render() {
	let data = [
    {gender: "male", height: 70, weight: 155, shoeSize: 10},
    {gender: "male", height: 72, weight: 144, shoeSize: 12},
    {gender: "male", height: 73, weight: 158, shoeSize: 11.5},
    {gender: "male", height: 72, weight: 160, shoeSize: 11},
    {gender: "male", height: 77, weight: 186, shoeSize: 13},
    {gender: "male", height: 68, weight: 153, shoeSize: 10},
    {gender: "male", height: 69, weight: 160, shoeSize: 9},
    {gender: "male", height: 67, weight: 166, shoeSize: 9.5}
    {gender: "female", height: 60, weight: 90, shoeSize: 6},
    {gender: "female", height: 63.5, weight: 100, shoeSize: 6.5},
    {gender: "female", height: 62, weight: 102, shoeSize: 6.5},
    {gender: "female", height: 65, weight: 112, shoeSize: 7},
    {gender: "female", height: 59, weight: 90, shoeSize: 6},
    {gender: "female", height: 58.5, weight: 95, shoeSize: 5.5},
    {gender: "female", height: 61.5, weight: 115, shoeSize: 6},
    {gender: "female", height: 69, weight: 125, shoeSize: 8},
    {gender: "female", height: 70, weight: 135, shoeSize: 8.5}
  ]

	return(
		<ScatterPlot data={data}
		xKey="height"
		yKey="weight"
		groupKey="gender"
		weightKey="shoeSize"/>
	)
}
```

### Dimensions
Dimensions may be specified by passing in `width` and `height` props. The
unit is pixels, and the Scatter Plot defaults to 800 by 600 pixels.

The Scatter Plot will not function with a width that is less than 60 pixels, or with
a height that is less than 100 pixels.

Width dimensions may also be specified with a string, as a percentage. The width
will then be calculated as a proportion of the parent container

```javascript
render() {

	return(
		<ScatterPlot data={data} width="50%" />
	)
}
```

### Colors
Colors may be specified through 2 different mechanisms, both through a `color` prop.
If none of the mechanisms are specified, ScatterPlot defaults to a built in
color palette.

#### User-provided Color Palette
The user can specify their own desired colored palette for the scatter plots to use.
This is done by passing in an array of color strings to the component with the
`color` prop. The displayed point series will cycle through the provided colors.

#### User-provided Color function
The user can specify the color for various lines by providing a function
as well. One can expect to receive the index of the line (first group in the
inputted data will have index 0, next group will have index 1, and so on),
as well as the group associated with the line, if there is one. In the
example below, color is decided based on the group:

```javascript

colorMe(i, group) {
  if (group === "male"){
    return "blue"
  } else if (group === "female") {
    return "pink"
  }
}
render() {
	return(
		<ScatterPlot data={data} color={this.colorMe} />
	)
}
```

### Tooltip
ScatterPlots are capable of utilizing a tooltip to display more specific information
about the points. By default, the tooltip is off, but can be activated by
passing in a `tooltip` prop (no value needed). The tooltip features two different
color schemes, dark and light, which can be specified by a
`tooltipColor` prop, with a value of "dark" or "light".

```javascript
render() {
  ...

  return(
    <ScatterPlot data={data} tooltip tooltipColor="light" />
  )
}
```

#### Customizing Tooltip contents
By default, the tooltip will display the x and y value, as well as the group (if
it exist) and weight (if it exists) of the point the user is hovering over.
The user can customize exactly what is displayed inside the tooltip by passing
in a `tooltipContents` prop in the form of a Javascript function. The user can
expect to receive the raw data object that corresponds to the point being hovered over.

```javascript
fillTooltip(data){
  let contents
  if (data.height > 150) {
    return (
      <span> This is a tall person! </span>
    )
  }
  return (
    <span> This is NOT a tall person. </span>
  )
}

render() {
  ...

  return(
    <ScatterPlot data={data}
      tooltip tooltipContents={this.fillTooltip}/>
  )
}
```

### Graph Style
The ScatterPlot draws a trendline for the data by default. This can be disabled
by passing in a `showTrendline` prop with a value of `false`.

The ScatterPlot also offers some customization with regards to the actual graph elements.
These can be controlled with a `graphStyle` prop that is passed in as a javascript
object. Keys to include can be the following:

* trendlineColor
	* Determines the color of the drawn trendline
	* Defaults to `#C4C4C4`
	* Accepts any color string
* trendlineWidth
	* Determines the width of the drawn trendline
	* Defaults to `1.5`
	* Accepts any number
* trendlineOpacity
	* Determines the opacity of the drawn trendline
	* Defaults to 1
	* Accepts any number

### Axis Customization
Replot ScatterPlots allow for incredible customization of the graph axis. A complete
explanation of axis customization can be found below -:

#### Titles
By default, the ScatterPlot does not display any axis titles. If the user wishes to
include titles, they can pass in some or all of the `xTitle`, `yTitle`, and
`graphTitle` props. These props accept a string value, displayed at the appropriate
location on the graph. To compensate for the inclusion of a title, the graph content
will be pushed further in, but overall the size of the component will remain what
was specified by the user.

#### Showing/Hiding Axis Elements
By default, the ScatterPlot shows the entirety of the axes, including lines, labels,
and gridlines. These can each individually be disabled by passing in boolean
values of false to the following props:
- showXAxisLine
- showYAxisLine
- showXLabels
- showYLabels
- showGrid
- showLegend

#### Styling the axis
In addition to enabling/disabling titles and axis components, the actual style of
the components can be altered as well, with the use of one `axisStyle` prop that
takes the form of a JavaScript object.

Explanations and defaults follow:

* axisColor
  * modifies the color of the axis line
  * defaults to `#000000`
  * accepts any color string
* labelColor
  * modifies the color of both axis labels
  * defaults to `#000000`
  * accepts any color string
* titleColor
  * modifies the color of all graph titles
  * defaults to `#000000`
  * accepts any color string
* labelColor
  * modifies the color of axis gridlines
  * defaults to `#DDDDDD`
  * accepts any color string
* lineWidth
  * modifies the thickness of axis lines
  * defaults to `2`
  * accepts any number
* lineOpacity
  * modifies the opacity of axis lines
  * defaults to `1`
  * accepts any number

Example of using the axisStyle prop:

```javascript
let style = {
    axisColor: "#f17e33",
    labelColor: "blue",
    titleColor: "#000000",
    gridColor: "#DDDDDD",
    lineWidth: 5,
    lineOpacity: .5
  }

render() {
  ...

  return(
    <ScatterPlot data={data} axisStyle={style}/>
  )
}
```

#### Styling the legend
The ScatterPlot will include a legend by default if a `groupKey` is included.
If not disabled, the legend can be customized through a single `legendStyle` prop that takes the form of a JavaScript object.

Explanations and defaults follow:
* fontColor
	* Modifies the color of the font used in the legend
	* Defaults to `"#000000"`
	* Accepts any color string
* backgroundColor
	* Modifies the background color of the legend
	* Defaults to `"none"`
	* Accepts any color string
* showBorder
 	* Determines whether a border will be drawn around the legend
	* Defaults to `true`
	* Accepts `true` or `false`
* borderColor
	* Modifies the color of the border of the legend
	* Defaults to `"#000000"`
	* Accepts any color string

### Initial Animation
Initial animation is enabled by default, resulting in the ScatterPlot points growing out
from the trendline. This can be disabled using the
`initialAnimation` prop, passing in a value of false.

# Scatter Plots for react
Intelligent and customizable scatter plot components for react.

## Installation
Only works with React projects. React must be installed separately.
```bash
npm install replot-scatter
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
keys associated with the values:

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

![ScreenshotScatterBasic](https://github.com/replot/replot-scatter/raw/master/img/basic.png)

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

![ScreenshotScatterDefault](https://github.com/replot/replot-scatter/raw/master/img/default.png)

### Dimensions
Dimensions may be specified by passing in `width` and `height` props with numbers 
in the unit of pixels.

```javascript
render() {
  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
    	width={600}
      	height={450}
    />
  )
}
```

- `width` defaults to `800`
- `height` defaults to `600`


The Scatter Plot will not function with a width that is less than 60 pixels, or with
a height that is less than 100 pixels.

Width dimensions may also be specified with a string, as a percentage. The width
will then be calculated as a proportion of the parent container.

```javascript
render() {
  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
        width="50%"
        height={450}
    />
  )
}
```

 Default                   | width={600} height={450}  | width="50%" height={450}        
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotDefaultDimensions](https://github.com/replot/replot-scatter/raw/master/img/dim_default.png) | ![ScreenshotWidth600pxHeight450px](https://github.com/replot/replot-scatter/raw/master/img/w600_h450.png) | ![ScreenshotWidth50%Height450px](https://github.com/replot/replot-scatter/raw/master/img/w50_percent.png)

### Colors
Colors may be specified through 2 different mechanisms, both through a `color` prop.
If none of the mechanisms are specified, ScatterPlot defaults to a built in
color palette.

#### User-provided Color Palette
Users can specify a list of colors to use as a palette, passed to the `color` prop.

```javascript
render() {
  let colors = ["#ff3232", "#ff7f7f", "#ffcccc"]

  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
    	color={colors}
    />
  )
}
```

#### User-provided Color function
The user can specify the color for various lines by providing a function
as well. Expected arguments to the function are the index of the data series (from 0) and the group associated with the line (if it exists).

```javascript
let colorMe = (i, group) => {
  if (group === "male") {
    return "blue"
  } else {
    return "pink"
  }
}

render() {
  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
    	color={colorMe}
    />
  )
}
```

color={colors} | color={colorMe}   
:-------------------------:|:-------------------------:
![ScreenshotColorArray](https://github.com/replot/replot-scatter/raw/master/img/color_array.png) | ![ScreenshotColorFunction](https://github.com/replot/replot-scatter/raw/master/img/color_func.png)

### Graph Style
Users can customize the style of graph elements by passing in the prop(s) below:

* `showTrendline`: defaults to `true`, controls display of the trendline
* `trendlineColor`
	* Determines the color of the drawn trendline
	* Defaults to `#AAA`
	* Accepts any color string
* `trendlineWidth`
	* Determines the width of the drawn trendline
	* Defaults to `1.5`
	* Accepts any number
* `trendlineOpacity`
	* Determines the opacity of the drawn trendline
	* Defaults to `1`
	* Accepts any number

```javascript
render() {
  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
    	showTrendline={true}
	trendlineColor="#ff0000"
	trendlineWidth={3}
	trendlineOpacity={0.5}
    />
  )
}
```

 Default                   | Custom Trendline | showTrendline={false}        
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotScatterDefault](https://github.com/replot/replot-scatter/raw/master/img/default.png) | ![ScreenshotGraphStyle](https://github.com/replot/replot-scatter/raw/master/img/graph_style.png) | ![ScreenshotTrendlineHidden](https://github.com/replot/replot-scatter/raw/master/img/hide_trendline.png)

### Axis Customization
Replot ScatterPlots allow for incredible customization of the graph axis. A complete
explanation of axis customization can be found below:

#### Titles
Title props accept strings to display in the appropriate location on the graph. To compensate for the inclusion of a title, graph content will be condensed, but the overall size of the component will stay constant.

- `graphTitle`: string displayed above the graph
- `xTitle`: string displayed left of the x-axis
- `yTitle`: string displayed under the y-axis

```javascript
render() {
  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
      graphTitle="Shoe Size by Height and Weight"
      xTitle="Height"
      yTitle="Weight"
    />
  )
}
```

Default | Custom titles
:-------------------------:|:-------------------------:
![ScreenshotScatterDefault](https://github.com/replot/replot-scatter/raw/master/img/default.png) | ![ScreenshotGraphTitles](https://github.com/replot/replot-scatter/raw/master/img/graph_titles.png)

#### Displaying Axis Elements
Users can customize the display of the lines, labels, and gridlines of the axes.

- `showXAxisLine`: defaults to `true`, controls display of the x-axis line
- `showYAxisLine`: defaults to `true`, controls display of the y-axis line
- `showXLabels`: defaults to `true`, controls display of labels on the x-axis
- `showYLabels`: defaults to `true`, controls display of labels on the y-axis
- `showGrid`: defaults to `true`, controls display of gridlines

```javascript
render() {
  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
      	showXAxisLine={false}
	showYAxisLine={false}
	showXLabels={false}
	showYLabels={false}
	showGrid={false}
    />
  )
}
```

Lines hidden | Labels hidden
:-------------------------:|:-------------------------:
![ScreenshotLinesHidden](https://github.com/replot/replot-scatter/raw/master/img/lines_hidden.png) | ![ScreenshotLabelsHidden](https://github.com/replot/replot-scatter/raw/master/img/labels_hidden.png)

#### Axis Scale
Users can control the x and y scales of the graph, linear or logarithmic.

- `xScale`: defaults to `"lin"` for linear scale, can be `"log"` for logarithmic scale
- `yScale`: defaults to `"lin"` for linear scale, can be `"log"` for logarithmic scale

```javascript
render() {
  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
    	xScale="log"
      	yScale="log"
    />
  )
}
```

Default | xScale="log" yScale="log"
:-------------------------:|:-------------------------:
![ScreenshotScatterDefault](https://github.com/replot/replot-scatter/raw/master/img/default.png) | ![ScreenshotScaleLog](https://github.com/replot/replot-scatter/raw/master/img/scale_log.png)

#### Axis Style
Users can customize the axis style by passing in the prop(s) below:

* `axisColor`
  * modifies the color of axis lines
  * defaults to `"#AAA"`
  * accepts any color string
* `tickColor`
  * modifies the color of axis ticks
  * defaults to `"#AAA"`
  * accepts any color string
* `gridColor`
  * modifies the color of axis gridlines
  * defaults to `"#AAA"`
  * accepts any color string
* `labelColor`
  * modifies the color of both axis labels
  * defaults to `"#AAA"`
  * accepts any color string
* `graphTitleColor`
  * modifies the color of all graph titles
  * defaults to `"#AAA"`
  * accepts any color string

```javascript
render() {
  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
      	axisColor="#ff0000"
	tickColor="#ff0000"
	gridColor="#ff0000"
	labelColor="#ff0000"
	graphTitleColor="#ff0000"
    />
  )
}
```

* ``axisWidth``
  * modifies the thickness of axis lines
  * defaults to `1.5`
  * accepts any number
* ``tickWidth``
  * modifies the thickness of axis ticks
  * defaults to `1.5`
  * accepts any number
* ``gridWidth``
  * modifies the thickness of axis gridlines
  * defaults to `1`
  * accepts any number
  
```javascript
render() {
  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
      	axisWidth={5}
	tickWidth={5}
	gridWidth={5}
    />
  )
}
```
  
* `axisOpacity`
  * modifies the opacity of axis lines
  * defaults to `1`
  * accepts any number
* `tickOpacity`
  * modifies the opacity of axis ticks
  * defaults to `1`
  * accepts any number
* `gridOpacity`
  * modifies the opacity of axis gridlines
  * defaults to `0.5`
  * accepts any number

```javascript
render() {
  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
      	axisOpacity={0.2}
	tickOpacity={0.2}
	gridOpacity={0.2}
    />
  )
}
```

 Custom colors             | Custom widths             | Custom opacities        
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotAxisColors](https://github.com/replot/replot-scatter/raw/master/img/axis_colors.png) | ![ScreenshotAxisWidths](https://github.com/replot/replot-scatter/raw/master/img/axis_widths.png) | ![ScreenshotAxisOpacities](https://github.com/replot/replot-scatter/raw/master/img/axis_opacities.png)

* `labelFontSize`
  * sets the font size of both axis labels
  * automatically calculated when unspecified
  * accepts any number
* `graphTitleFontSize`
  * sets the font size of all graph titles
  * automatically calculated when unspecified
  * accepts any number

```javascript
render() {
  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
        labelFontSize={8}
    	graphTitleFontSize={10}
    />
  )
}
```

* ``labelFontFamily``
  * sets the font family of both axis labels
  * inherits when unspecified
  * accepts any font family name string
* ``graphTitleFontFamily``
  * sets the font family of all graph titles
  * inherits when unspecified
  * accepts any font family name string

```javascript
render() {
  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
	labelFontFamily="Courier"
	graphTitleFontFamily="Courier"
    />
  )
}
```

 Custom font sizes | Custom font families
:-------------------------:|:-------------------------:
![ScreenshotAxisFontSizes](https://github.com/replot/replot-scatter/raw/master/img/axis_font_sizes.png) | ![ScreenshotAxisFontFamilies](https://github.com/replot/replot-scatter/raw/master/img/axis_font_families.png)

### Legend Customization
Users can customize the graph legend in several ways.

- `showLegend`: defaults to `true`, controls display of the legend

```javascript
render() {
  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
	showLegend={false}
    />
  )
}
```

 Default | showLegend={false}
:-------------------------:|:-------------------------:
![ScreenshotScatterDefault](https://github.com/replot/replot-scatter/raw/master/img/default.png) | ![ScreenshotLegendHidden](https://github.com/replot/replot-scatter/raw/master/img/legend_hidden.png)

#### Legend Style
Users can customize the legend style by passing in the prop(s) below:

* `legendFontColor`
	* Modifies the color of the font used in the legend
	* Defaults to `"#AAA"`
	* Accepts any color string
* `legendBackground`
	* Modifies the background color of the legend
	* Defaults to `"none"`
	* Accepts any color string
* `legendShowBorder`
 	* Determines whether a border will be drawn around the legend
	* Defaults to `false`
	* Accepts `true` or `false`
* `legendBorderColor`
	* Modifies the color of the border of the legend
	* Defaults to `"#AAA"`
	* Accepts any color string
	
```javascript
render() {
  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
	legendFontColor="#ff0000"
	legendBackground="#ffffff"
	legendShowBorder={true}
	legendBorderColor="#ff0000"
    />
  )
}
```

 Default | Custom Style
:-------------------------:|:-------------------------:
![ScreenshotScatterDefault](https://github.com/replot/replot-scatter/raw/master/img/default.png) | ![ScreenshotLegendStyle](https://github.com/replot/replot-scatter/raw/master/img/legend_style.png)

### Tooltip
Tooltips can display more specific information about a data series.

```javascript
render() {
  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
	tooltip={false}
	tooltipColor="light"
    />
  )
}
```

- `tooltip` defaults to `true`, `false` turns the tooltip off
- `tooltipColor` defaults to `dark`, it can be set to `light` or `dark`

 Default tooltip             | tooltipColor="light"          | tooltip={false}   
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotTooltipDefault](https://github.com/replot/replot-scatter/raw/master/img/tooltip_dark.png) | ![ScreenshotTooltipLight](https://github.com/replot/replot-scatter/raw/master/img/tooltip_light.png) | ![ScreenshotTooltipHidden](https://github.com/replot/replot-scatter/raw/master/img/default.png)

#### Customizing Tooltip contents
Users can customize what is displayed inside the tooltip with a function. Expected arguments to the function are the data for the specific point hovered over. The function should return JSX.

```javascript
let fillTooltip = (pointData) => {
  return(
    <span>The data for this point looks like {JSON.stringify(pointData)}</span>
  )
}

render() {
  return(
    <ScatterPlot data={data} xKey="height" yKey="weight" groupKey="gender" weightKey="shoeSize"
	tooltipContents={fillTooltip}
    />
  )
}
```

![ScreenshotTooltipCustom](https://github.com/replot/replot-scatter/raw/master/img/tooltip_custom.png)

### Animation Customization
Users can control the initial animation of the graph, points growing out from the trendline.

- `initialAnimation`: defaults to `true`, controls the animation

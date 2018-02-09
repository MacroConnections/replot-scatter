import React from "react"
import {SectionContainer} from "replot-helpers"
import ScatterExample from "./ScatterExample.jsx"

class ExamplesSection extends React.Component {

  render() {
    return(
      <SectionContainer>
        <ScatterExample palette={this.props.palette} />
      </SectionContainer>
    )
  }

}

export default ExamplesSection

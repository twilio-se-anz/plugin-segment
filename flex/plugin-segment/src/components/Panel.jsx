import React from "react";
import { withTaskContext } from "@twilio/flex-ui";

import Banner from "./Banner";
import Frame from "./Frame";

import SegmentData from "../views/SegmentData";

class Panel extends React.Component {
  render() {
    const data = {};

    if (this.props.data) data = this.props.data;

    // Add task.attributes to the data object. Undefined if there is no task
    // such as on settings screen.
    data.taskAttributes = this.props?.task?.attributes ?? undefined;

    // Show Segment data if available
    if (data.taskAttributes && data.taskAttributes.email)
      return <SegmentData data={data} />;

    // Show iframe data if available
    if (data.taskAttributes && data.taskAttributes.frameUrl)
      return <Frame data={data} />;

    // Otherwise show the banner
    return <Banner />;
  }
}

export default withTaskContext(Panel);

import React from "react";
import { withTaskContext } from "@twilio/flex-ui";

import Banner from "./Banner";
import SegmentData from "../views/SegmentData";

class Panel extends React.Component {
  render() {
    const data = {};

    if (this.props.data) data = this.props.data;

    // Add task.attributes to the data object. Undefined if there is no task
    // such as on settings screen.
    data.taskAttributes = this.props?.task?.attributes ?? undefined;

    if (data.taskAttributes && data.taskAttributes.email)
      return <SegmentData data={data} />;

    return <Banner />;
  }
}

export default withTaskContext(Panel);

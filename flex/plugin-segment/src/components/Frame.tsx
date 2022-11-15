import React from "react";

const Frame = (props: { data: any }) => {
  const { data } = props;

  try {
    const url = new URL(data.taskAttributes.frameUrl);
    const query = url.searchParams;

    // Append parameters from task.attributes.frameData object
    if (data.taskAttributes && data.taskAttributes.frameData) {
      for (let key in data.taskAttributes.frameData) {
        query.append(key, data.taskAttributes.frameData[key]);
      }
    }

    const queryString = query.toString();

    // Rebuild the URL with our appened query params
    const frameURL = `${url.protocol}//${url.host}${url.pathname}${
      queryString === "" ? "" : `?${queryString}`
    }`;

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <iframe
          src={frameURL}
          allow="camera;microphone"
          style={{ height: "100%", width: "100%" }}
        ></iframe>
      </div>
    );
  } catch (error) {
    return (
      <p>
        The iFrame URL is not valid, there is a problem with the
        task.attributes.frameUrl object.
      </p>
    );
  }
};

export default Frame;

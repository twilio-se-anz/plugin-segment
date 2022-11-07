import { SegmentTrackData } from "../types/SegementTrackData";

const getTraitsForUser = async (userId: string) => {
  try {
    const url = `${process.env.REACT_APP_SEGMENT_API_BASE_URL}/segment/get-traits`;
    // const url = `https://segment-3063-dev.twil.io/segment/get-traits`;
    // const url = `http://localhost:3000/segment/get-traits?userId=${userId}`;
    const config = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(
        `Error getting traits: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();

    return data.traits;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getEventsForUser = async (userId: string) => {
  try {
    const url = `${process.env.REACT_APP_SEGMENT_API_BASE_URL}/segment/get-events`;
    // const url = `https://segment-3063-dev.twil.io/segment/get-events`;
    // const url = `http://localhost:3000/segment/get-events?userId=${userId}`;
    const config = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(
        `Error getting events: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const sendToSegment = async (data: SegmentTrackData) => {
  try {
    const url = `${process.env.REACT_APP_SEGMENT_API_BASE_URL}/segment/send-event`;

    const config = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(
        `Error getting traits: ${response.status} - ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getTraitsForUser, getEventsForUser, sendToSegment };

// Imports global types
import "@twilio-labs/serverless-runtime-types";
// Fetches specific types
import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";

import fetch from "node-fetch";

type MyEvent = {
  userId?: string;
};

export type EventResponse = {
  timestamp: Date;
  title: string;
  url: string;
  event: string;
  userAgent: string;
};

export type SegmentContext = {
  SEGMENT_SPACEID?: string;
  SEGMENT_BASE_URL?: string;
  SEGMENT_API_ACCESS_TOKEN?: string;
};

export const handler: ServerlessFunctionSignature = async function (
  context: Context<SegmentContext>,
  event: MyEvent,
  callback: ServerlessCallback
) {
  const response = new Twilio.Response();
  // Set the CORS headers to allow Flex to make an error-free HTTP request
  // to this Function
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "application/json");

  try {
    let token = Buffer.from(
      `${context.SEGMENT_API_ACCESS_TOKEN}:`,
      "utf8"
    ).toString("base64");
    const email = encodeURIComponent(event.userId || "");

    const url = `${context.SEGMENT_BASE_URL}/spaces/${context.SEGMENT_SPACEID}/collections/users/profiles/email:${email}/events?limit=100`;

    console.log(`Fetching segment Event Data from: ${url}`);

    // const url = `${context.SEGMENT_BASE_URL}/spaces/${context.SEGMENT_SPACEID}/collections/users/profiles/email:alina.timofeeva%2B56%40macquarie.com/events?limit=100`;
    //https://profiles.segment.com/v1/spaces/spa_d8SrDMWqWqpeEVXuLsVYn8/collections/users/profiles/email:alina.timofeeva%2B56%40macquarie.com/events

    var options: any = {
      method: "GET",
      headers: {
        Authorization: `Basic ${token}`,
      },
    };

    const result = await fetch(url, options);

    const segmentPayload = await result.json();

    const responseData: EventResponse[] = [];

    if (!segmentPayload || !segmentPayload.data) callback(null, []);

    segmentPayload.data.map((e: any) => {
      // console.log(JSON.stringify(e, null, 2));
      responseData.push({
        timestamp: e.timestamp,
        event: e.event,
        title: e?.properties?.title || e.event || "No title",
        url: e?.context?.page?.url,
        userAgent: e.context.userAgent,
      });
    });

    response.setBody(responseData);
    callback(null, response);
  } catch (error: any) {
    console.log(error);
    response.setBody(error);
    callback(response);
  }
};

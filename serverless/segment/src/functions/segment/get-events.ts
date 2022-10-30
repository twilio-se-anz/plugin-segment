// Imports global types
import '@twilio-labs/serverless-runtime-types';
// Fetches specific types
import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from '@twilio-labs/serverless-runtime-types/types';

import { SegmentContext } from '../../types/SegmentContext';
import fetch from 'node-fetch';
import { CorsFriendlyResponse } from '../../helpers/CorsFriendlyResponse';
import { EventResponse } from '../../types/EventResponse';

type MyEvent = {
  userId?: string;
};

export const handler: ServerlessFunctionSignature = async function (
  context: Context<SegmentContext>,
  event: MyEvent,
  callback: ServerlessCallback
) {
  try {
    let token = Buffer.from(
      `${context.SEGMENT_API_ACCESS_TOKEN}:`,
      'utf8'
    ).toString('base64');

    const url = `${context.SEGMENT_BASE_URL}/spaces/${context.SEGMENT_SPACEID}/collections/users/profiles/email:alina.timofeeva%2B56%40macquarie.com/events?limit=100`;
    //https://profiles.segment.com/v1/spaces/spa_d8SrDMWqWqpeEVXuLsVYn8/collections/users/profiles/email:alina.timofeeva%2B56%40macquarie.com/events

    var options: any = {
      method: 'GET',
      headers: {
        Authorization: `Basic ${token}`,
      },
    };

    const result = await fetch(url, options);

    const segmentPayload = await result.json();

    const responseData: EventResponse[] = [];

    segmentPayload.data.map((e: any) => {
      console.log(JSON.stringify(e, null, 2));
      responseData.push({
        timestamp: e.timestamp,
        event: e.event,
        title: 'No title',
        userAgent: e.context.userAgent,
      });
    });

    const response = CorsFriendlyResponse();

    response.setBody(responseData);

    callback(null, response);
  } catch (error: any) {
    console.log(error);
    const response = CorsFriendlyResponse();
    response.setBody(error);
    callback(response);
  }
};

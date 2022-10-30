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

    const url = `${context.SEGMENT_BASE_URL}/spaces/${context.SEGMENT_SPACEID}/collections/users/profiles/user_id:${event.userId}/traits?limit=200`;

    var options: any = {
      method: 'GET',
      headers: {
        Authorization: `Basic ${token}`,
      },
    };

    const result = await fetch(url, options);

    const segmentPayload = await result.json();

    const response = CorsFriendlyResponse();

    response.setBody(segmentPayload as object);

    callback(null, response);
  } catch (error: any) {
    console.log(error);
    const response = CorsFriendlyResponse();
    response.setBody(error);
    callback(response);
  }
};

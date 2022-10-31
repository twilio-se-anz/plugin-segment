import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@material-ui/lab";

import React, { useEffect, useState } from "react";
import { getEventsForUser } from "../services/segmentService";
import Moment from "react-moment";
import { EventResponse } from "types/EventResponse";
import { Anchor, Text } from "@twilio-paste/core";
import { ProductAdminDomainsIcon } from "@twilio-paste/icons/esm/ProductAdminDomainsIcon";
import { ProductAdminUsersIcon } from "@twilio-paste/icons/esm/ProductAdminUsersIcon";
import { ProductAdminAccountsIcon } from "@twilio-paste/icons/esm/ProductAdminAccountsIcon";
import { ProductAPIExplorerIcon } from "@twilio-paste/icons/esm/ProductAPIExplorerIcon";
import { ProductInsightsIcon } from "@twilio-paste/icons/esm/ProductInsightsIcon";

type Props = {};

const EventTimeline = (props: Props) => {
  const [segmentEvents, setSegmentEvents] = useState<EventResponse[]>();

  useEffect(() => {
    async function getEvents() {
      const eventsObj = await getEventsForUser("00Q4Y0000023WEcUAM");
      setSegmentEvents(eventsObj);
    }
    getEvents();
  }, []);

  if (!segmentEvents) return <>No CDP events</>;

  const timelineItems = segmentEvents.map((event: EventResponse) => {
    return (
      <TimelineItem>
        <TimelineOppositeContent>
          <Moment fromNow>{event.timestamp}</Moment>
        </TimelineOppositeContent>
        <TimelineSeparator>
          {event.event.includes("Application") && (
            <TimelineDot color="primary" variant="outlined">
              <ProductAdminAccountsIcon decorative={true} />
            </TimelineDot>
          )}

          {event.event.includes("Audience") && (
            <TimelineDot color="primary" variant="outlined">
              <ProductAdminUsersIcon decorative={true} />
            </TimelineDot>
          )}

          {event.event.includes("Page") && (
            <TimelineDot color="primary" variant="outlined">
              <ProductAPIExplorerIcon decorative={true} />
            </TimelineDot>
          )}

          {!event.event.includes("Application") &&
            !event.event.includes("Audience") &&
            !event.event.includes("Page") && (
              <TimelineDot color="primary" variant="outlined">
                <ProductInsightsIcon decorative={true} />
              </TimelineDot>
            )}

          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Text as={"p"}>
            <strong>{event.event}</strong>
          </Text>
          {event.url && (
            <Anchor href={event.url} showExternal target="_blank">
              {event.title}
            </Anchor>
          )}
        </TimelineContent>
      </TimelineItem>
    );
  });

  return <Timeline>{timelineItems}</Timeline>;
};

export default EventTimeline;

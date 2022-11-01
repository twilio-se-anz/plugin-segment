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
import { Anchor, SkeletonLoader, Stack, Text } from "@twilio-paste/core";
import { ProductAdminUsersIcon } from "@twilio-paste/icons/esm/ProductAdminUsersIcon";
import { ProductAdminAccountsIcon } from "@twilio-paste/icons/esm/ProductAdminAccountsIcon";
import { ProductAPIExplorerIcon } from "@twilio-paste/icons/esm/ProductAPIExplorerIcon";
import { ProductInsightsIcon } from "@twilio-paste/icons/esm/ProductInsightsIcon";
import * as Flex from "@twilio/flex-ui";
import { withTaskContext } from "@twilio/flex-ui";

type Props = {
  task?: any;
};

const EventTimeline = (props: Props) => {
  const [segmentEvents, setSegmentEvents] = useState<EventResponse[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("EventTimeline props", props.task.attributes);

    async function getEvents() {
      // const eventsObj = await getEventsForUser("00Q4Y0000023WEcUAM");
      if (props.task?.attributes?.email) {
        const eventsObj = await getEventsForUser(props.task.attributes.email);
        setSegmentEvents(eventsObj);
      }

      setLoading(false);
    }
    getEvents();
  }, [props?.task?.attributes?.email]);

  if (loading)
    return (
      <Stack orientation={"vertical"} spacing={"space70"}>
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </Stack>
    );
  if (!segmentEvents) return <>No CDP events</>;

  const timelineItems = segmentEvents.map((event: EventResponse) => {
    return (
      <TimelineItem style={{ textAlign: "left" }}>
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

export default withTaskContext(EventTimeline);

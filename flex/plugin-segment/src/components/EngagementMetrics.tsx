import React, { useEffect, useState } from "react";
import { Box, Stack, SkeletonLoader, Card, Heading } from "@twilio-paste/core";

import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";

import { getTraitsForUser } from "../services/segmentService";
import { SegmentTraits } from "../types/SegmentTraits";
import { withTaskContext } from "@twilio/flex-ui";
import Progress from "./Progress";

type Props = {
  task?: any;
};

const EngagementMetrics = (props: Props) => {
  const [traits, setTraits] = useState({} as SegmentTraits);
  const [digitalEngagmentRating, setDigitalEngagmentRating] = useState(0);
  const [marketingEngagmentRating, setMarketingEngagmentRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTraits() {
      if (props.task?.attributes?.email) {
        const traitsObj = await getTraitsForUser(props.task.attributes.email);
        setTraits(traitsObj);
        if (traitsObj && traitsObj.digital_engagement_score)
          setDigitalEngagmentRating(
            traitsObj.digital_engagement_score as number
          );
        if (traitsObj && traitsObj.marketing_engagement_score)
          setMarketingEngagmentRating(
            traitsObj.marketing_engagement_score as number
          );
        console.log("Traits", traitsObj);
      }
      setLoading(false);
    }
    getTraits();
  }, []);

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

  return (
    <>
      <Box>
        <Typography component="legend">Digital Engagment</Typography>
        <Progress value={digitalEngagmentRating * 100} />
      </Box>
      <Box>
        <Typography component="legend">Marketing Engagment</Typography>
        <Progress value={marketingEngagmentRating * 100} />
      </Box>
    </>
  );
};

export default withTaskContext(EngagementMetrics);

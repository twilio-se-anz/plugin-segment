import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  Card,
  Avatar,
  MediaBody,
  MediaFigure,
  MediaObject,
  Stack,
  Separator,
  Badge,
  SkeletonLoader,
} from "@twilio-paste/core";

import { ThumbsUpIcon } from "@twilio-paste/icons/esm/ThumbsUpIcon";
import { BusinessIcon } from "@twilio-paste/icons/esm/BusinessIcon";
import { CommunityIcon } from "@twilio-paste/icons/esm/CommunityIcon";
import { StarIcon } from "@twilio-paste/icons/esm/StarIcon";

import { getTraitsForUser } from "../services/segmentService";
import { SegmentTraits } from "../types/SegmentTraits";
import { withTaskContext } from "@twilio/flex-ui";

type Props = {
  task?: any;
};

const CustomerInfo = (props: Props) => {
  const [traits, setTraits] = useState({} as SegmentTraits);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTraits() {
      if (props.task?.attributes?.email) {
        const traitsObj = await getTraitsForUser(props.task.attributes.email);
        setTraits(traitsObj);
      }
      setLoading(false);
    }
    getTraits();
  }, []);

  if (loading)
    return (
      <Card>
        <Stack orientation={"vertical"} spacing={"space70"}>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </Stack>
      </Card>
    );

  return (
    <Card>
      <Stack orientation={"vertical"} spacing={"space40"}>
        {traits && traits.first_name && traits.last_name && (
          <MediaObject as="div" verticalAlign="center">
            <MediaFigure as="div" spacing="space40">
              <Avatar
                size="sizeIcon90"
                name={traits.first_name + " " + traits.last_name}
              />
            </MediaFigure>
            <MediaBody as="div">
              <Text
                as="h2"
                variant="heading50"
                fontSize={"fontSize60"}
                fontWeight="fontWeightBold"
              >
                {traits.first_name} {traits.last_name}
              </Text>
            </MediaBody>
          </MediaObject>
        )}

        <Table>
          <THead>
            <Tr>
              <Th>Customer Information</Th>
            </Tr>
          </THead>
          <TBody>
            <Tr>
              <Td>
                <Text as="span" display={"flex"}>
                  <StarIcon decorative={true} about="Age Group" />
                  <Box marginLeft="space40">35-45</Box>
                </Text>
              </Td>
            </Tr>

            <Tr>
              <Td>
                <Text as="span" display={"flex"}>
                  <ThumbsUpIcon decorative={true} about="Location" />
                  <Box marginLeft="space40">Newtown</Box>
                </Text>
              </Td>
            </Tr>

            <Tr>
              <Td>
                <Text as="span" display={"flex"}>
                  <BusinessIcon decorative={true} about="Segment" />
                  <Box marginLeft="space40">High Net Wealth</Box>
                </Text>
              </Td>
            </Tr>

            <Tr>
              <Td>
                <Text as="span" display={"flex"}>
                  <CommunityIcon decorative={true} about="Technology Profile" />
                  <Box marginLeft="space40">Digital Native</Box>
                </Text>
              </Td>
            </Tr>
          </TBody>
        </Table>
      </Stack>
    </Card>
  );
};

export default withTaskContext(CustomerInfo);

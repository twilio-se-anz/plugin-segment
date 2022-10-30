import React from "react";
import {
  Box,
  Button,
  Card,
  Column,
  Grid,
  Heading,
  Paragraph,
  Stack,
} from "@twilio-paste/core";
import CustomerInfo from "../components/CustomerInfo";
// import FauxHistory from "../Common/FauxHistory";
// import FauxSuggestions from "../Common/FauxSuggestions";

const FauxService = () => {
  return (
    <Box as="main" padding="space70">
      <Grid gutter="space30">
        <Column span={4}>
          <Stack orientation={"vertical"} spacing="space50">
            <CustomerInfo />

            <Card padding="space70">
              <Heading as="h4" variant="heading40">
                TIP: Solve for the customer
              </Heading>
              <Paragraph>
                Rather than looking for shortcuts or handing the case off to
                another rep, be invested in the situation as the customer. Look
                for long-term solutions that foster customer success, not quick
                fixes that will require more attention later.
              </Paragraph>
            </Card>
          </Stack>
        </Column>

        <Column span={8}>
          <Card padding="space70">
            <Stack orientation={"vertical"} spacing="space50">
              <Heading as={"h2"} variant={"heading40"}>
                Customer Context
              </Heading>
              {/* <FauxHistory /> */}
              <Heading as={"h2"} variant={"heading40"}>
                Proactive Knowledge
              </Heading>
              {/* <FauxSuggestions /> */}
            </Stack>
          </Card>
        </Column>
      </Grid>
    </Box>
  );
};

export default FauxService;

import React from "react";
import { Flex, Stack, Box, Separator, Heading } from "@twilio-paste/core";

const Banner = () => {
  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Flex hAlignContent="center" vertical grow>
        <Box display="flex" columnGap="space40" rowGap="space60">
          <Stack
            orientation={"vertical"}
            spacing={"space40"}
            style={{ textAlign: "center" }}
          >
            <img
              src={process.env.REACT_APP_LOGO_URL}
              style={{ width: "600px" }}
            />
          </Stack>
        </Box>
      </Flex>
    </div>
  );
};

export default Banner;

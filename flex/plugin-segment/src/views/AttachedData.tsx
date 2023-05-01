import { withTaskContext } from "@twilio/flex-ui";
import { DataTable } from "../components/DataTable";
import React from "react";
import { Alert, Box, Text } from "@twilio-paste/core";

export type AttachedDataViewProps = {
  task: any;
};

function getKVPs(data: any) {
  let returnData: any = {};
  Object.entries(data).map(([k, v]) => {
    if (typeof v === "string" && typeof k === "string") {
      if (k === "From" || k === "To") return;
      returnData[k] = v;
    }
  });
  return returnData;
}

const VirtualAgentView = (props: AttachedDataViewProps) => {
  // Show transcript if we have a AgentHandoffParameters
  if (props?.task?.attributes)
    return (
      <Box width={"100%"} padding={"space40"}>
        <DataTable data={getKVPs(props.task.attributes)} />
      </Box>
    );

  return (
    <Box width={"100%"} padding={"space40"}>
      <Alert variant="warning">
        <Text as="p">
          <strong>No Attached Data</strong>
          {" - "}
          Check task attributes
        </Text>
      </Alert>
    </Box>
  );
};

export default withTaskContext(VirtualAgentView);

import React from "react";
import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";
import { CustomizationProvider } from "@twilio-paste/core/customization";
import Panel from "./components/Panel";
import { WorkerAcceptTaskActionPayload } from "@twilio/flex-ui/src/actions/WorkerActions";
import { sendToSegment } from "./services/segmentService";
import { ContentFragmentConditionFunction, ITask, Tab } from "@twilio/flex-ui";
import AttachedData from "./views/AttachedData";
import EventTimeline from "./components/EventTimeline";

const PLUGIN_NAME = "SegmentPlugin";

export default class SegmentPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    // Add Paste
    flex.setProviders({
      PasteThemeProvider: CustomizationProvider,
    });

    // When inside an iframe, ensure left panel is always shown
    if (window.top != window.self) {
      flex.AgentDesktopView.defaultProps.splitterOptions = {
        initialFirstPanelSize: "460px",
        minimumFirstPanelSize: "460px",
        minimumSecondPanelSize: "0px",
      };
    } else {
      flex.AgentDesktopView.defaultProps.splitterOptions = {
        initialFirstPanelSize: "400px",
      };
    }

    /**********************
     *  TAB Attached data
     **********************/
    const shouldDisplayAttachedDataTab: ContentFragmentConditionFunction =
      (props: { task: any }) => {
        const t = props.task;
        if (t && t.attributes) return true;
        return false;
      };

    flex.TaskCanvasTabs.Content.add(
      <Tab
        uniqueName="attached-data"
        key="attached-data"
        label="Interaction Data"
      >
        <AttachedData />
      </Tab>,
      {
        sortOrder: 4,
        if: shouldDisplayAttachedDataTab,
      }
    );

    const shouldDisplayCDPTab: ContentFragmentConditionFunction = (props: {
      task: any;
    }) => {
      const t = props.task;
      if (t && t.attributes?.email) return true;
      return false;
    };

    flex.TaskCanvasTabs.Content.add(
      <Tab uniqueName="cdp-timeline" key="cdp-timeline" label="CDP">
        <EventTimeline />
      </Tab>,
      {
        sortOrder: 3,
        if: shouldDisplayCDPTab,
      }
    );

    /**********************
     *  Show Panel 2
     **********************/
    const shouldDisplayFauxSegmentPanel: ContentFragmentConditionFunction = (
      props: any
    ) => {
      const t = props.tasks.get(props.selectedTaskSid);
      return (t && t.attributes?.faux) === "true" ? true : false;
    };

    const rightPanel = <Panel key="panel-replacement" />;

    flex.AgentDesktopView.Panel2.Content.replace(rightPanel, {
      sortOrder: -1,
      if: shouldDisplayFauxSegmentPanel,
    });

    flex.RootContainer.Content.remove("project-switcher");

    flex.Actions.addListener(
      "beforeAcceptTask",
      async (payload: WorkerAcceptTaskActionPayload) => {
        if (payload.task?.attributes.email) {
          await sendToSegment({
            actor: "Flex",
            eventName: "Agent Accept",
            userId: payload.task?.attributes.email,
            ConversationSid: payload.task?.attributes.conversationSid,
            direction: payload.task?.attributes.direction,
            channelType: payload.task?.attributes.channelType,
          });
        }
      }
    );

    flex.Actions.addListener(
      "beforeCompleteTask",
      async (payload: WorkerAcceptTaskActionPayload) => {
        if (payload.task?.attributes.email) {
          await sendToSegment({
            actor: "Flex",
            eventName: "Agent Complete",
            userId: payload.task?.attributes.email,
            ConversationSid: payload.task?.attributes.conversationSid,
            direction: payload.task?.attributes.direction,
            channelType: payload.task?.attributes.channelType,
          });
        }
      }
    );
  }
}

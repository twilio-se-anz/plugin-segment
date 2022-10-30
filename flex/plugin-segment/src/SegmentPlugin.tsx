import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import { Tab } from '@twilio/flex-ui';
import TraitsChips from './components/TraitsChips';
import SegmentData from './views/SegmentData';
import { CustomizationProvider } from "@twilio-paste/core/customization";


const PLUGIN_NAME = 'SegmentPlugin';

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

    flex.AgentDesktopView.defaultProps.splitterOptions = { initialFirstPanelSize: "400px", minimumFirstPanelSize: "400px" };

    flex.AgentDesktopView.Panel2.Content.replace(<SegmentData key="segment-data" />, { sortOrder: -1 })

    flex.TaskCanvasTabs.Content.add(<Tab
      label="Traits"
      uniqueName="incident-all"
      key="incident-all"
    >
      <TraitsChips key="incident-all" />
    </Tab>);
  }
}

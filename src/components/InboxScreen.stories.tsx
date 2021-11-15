import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { action } from '@storybook/addon-actions';

import { PureInboxScreen, InboxScreenProps } from './InboxScreen';
import * as TaskListStories from './TaskList.stories';

const store = {
    getState: () => ({ tasks: TaskListStories.Default.args?.tasks }),
    subscribe: () => undefined,
    dispatch: action('dispatch'),
} as unknown as Store;

export default {
    component: PureInboxScreen,
    title: 'InboxScreen',
    decorators: [(story) => <Provider store={store}>{story()}</Provider>]
} as Meta;

const Template: Story<InboxScreenProps> = (args) => <PureInboxScreen {...args} />

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
    error: 'Beep Boop',
};

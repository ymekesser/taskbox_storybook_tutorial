import { Story } from '@storybook/react';
import React from 'react';

import { Task, TaskProps } from './Task';

export default {
    component: Task,
    title: 'Task',
}

const Template: Story<TaskProps> = (args) => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
    task: {
        id: '1',
        title: 'Test Task',
        state: 'TASK_INBOX',
    },
    onArchiveTask: (_: string) => { },
    onPinTask: (_: string) => { },
}

export const Pinned = Template.bind({});
Pinned.args = {
    ...Default.args,
    task: {
        ...Default.args.task!,
        state: 'TASK_PINNED',
    }
};

export const Archived = Template.bind({});
Archived.args = {
    ...Default.args,
    task: {
        ...Default.args.task!,
        state: 'TASK_ARCHIVED',
    }
};

export const LongTitle = Template.bind({});
LongTitle.args = {
    ...Default.args,
    task: {
        ...Default.args.task!,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra mi efficitur bibendum rutrum. Curabitur interdum accumsan velit, in vestibulum augue faucibus ac."
    }
}

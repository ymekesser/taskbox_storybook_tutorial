import React from 'react';

import { Task, TaskProps } from './Task';

export default {
    component: Task,
    title: 'Task',
}

const defaultArgs = {
    task: {
        id: '1',
        title: 'Test Task',
        state: 'TASK_INBOX',
    },
    onArchiveTask: (x: string) => { },
    onPinTask: (x: string) => { },
};

const Template = (args: TaskProps) => () => <Task {...args} />;

export const Default = Template(defaultArgs);

export const Pinned = Template({
    ...defaultArgs, task: {
        ...defaultArgs.task,
        state: 'TASK_PINNED',
    }
});

export const Archived = Template({
    ...defaultArgs, task: {
        ...defaultArgs.task,
        state: 'TASK_ARCHIVED',
    }
});

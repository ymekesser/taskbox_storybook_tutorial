import React from 'react';

import { PureTaskList, TaskListProps } from './TaskList';

export default {
    component: PureTaskList,
    title: 'TaskList',
    decorators: [(story: any) => <div style={{ padding: '3rem' }}>{story()}</div>]
}

const defaultTaskArgs = {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
}


const defaultArgs: TaskListProps = {
    loading: false,
    onArchiveTask: (_: string) => { },
    onPinTask: (_: string) => { },
    tasks: [
        { ...defaultTaskArgs, id: '1', title: 'Task 1' },
        { ...defaultTaskArgs, id: '2', title: 'Task 2' },
        { ...defaultTaskArgs, id: '3', title: 'Task 3' },
        { ...defaultTaskArgs, id: '4', title: 'Task 4' },
        { ...defaultTaskArgs, id: '5', title: 'Task 5' },
        { ...defaultTaskArgs, id: '6', title: 'Task 6' },
    ]
};

const Template = (args: TaskListProps) => () => <PureTaskList {...args} />;

export const Default = Template(defaultArgs);

export const WithPinnedTasks = Template({
    ...defaultArgs,
    tasks: [
        ...defaultArgs.tasks.slice(0, 4),
        { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' }
    ]
});

export const Loading = Template({
    ...defaultArgs,
    tasks: [],
    loading: true,
});

export const Empty = Template({
    ...defaultArgs,
    tasks: [],
    loading: false,
});

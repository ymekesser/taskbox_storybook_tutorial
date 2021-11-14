import React, { FC } from 'react';

import { Task, TaskState } from './Task';
import { connect } from 'react-redux';
import { archiveTaskAction, pinTaskAction } from '../lib/redux';

export interface TaskListProps {
    loading: boolean;
    tasks: TaskState[];
    onArchiveTask: (id: string) => void;
    onPinTask: (id: string) => void;
};

export const PureTaskList: FC<TaskListProps> = ({ loading, tasks, onPinTask, onArchiveTask }) => {
    const events = {
        onPinTask,
        onArchiveTask,
    };

    if (loading) {
        return LoadingPlaceholder;
    }

    if (tasks.length === 0) {
        return EmptyPlaceholder;
    }

    const sortedTasks = sortTasks(tasks);

    return (<div className="list-items">
        {sortedTasks.map(t => (
            <Task key={t.id} task={t} {...events}></Task>
        ))}
    </div>
    );
}

function sortTasks(tasks: TaskState[]) {
    return [
        ...tasks.filter(t => t.state === 'TASK_PINNED'),
        ...tasks.filter(t => t.state !== 'TASK_PINNED'),
    ]
}

const LoadingRow = (
    <div className="loading-item">
        <span className="glow-checkbox"></span>
        <span className="glow-text">
            <span> Loading </span>
            <span> cool </span>
            <span> state </span>
        </span>
    </div>
)

const LoadingPlaceholder = (
    <div className="list-items">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
    </div>
)

const EmptyPlaceholder = (
    <div className="list-items">
        <div className="wrapper-message">
            <span className="icon-check"></span>
            <div className="title-message">You have no tasks</div>
            <div className="subtitle-message">Sit back and relax</div>
        </div>
    </div>
)

export default connect(
    ({ tasks }: any) => ({
        tasks: tasks.filter((t: TaskState) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'),
    }),
    dispatch => ({
        onArchiveTask: (id: string) => dispatch(archiveTaskAction(id)),
        onPinTask: (id: string) => dispatch(pinTaskAction(id)),
    })
)(PureTaskList)
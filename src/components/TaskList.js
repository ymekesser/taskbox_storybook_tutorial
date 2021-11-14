import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';
import { connect } from 'react-redux';
import { archiveTaskAction, pinTaskAction } from '../lib/redux';

export function PureTaskList({ loading, tasks, onPinTask, onArchiveTask }) {
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

function sortTasks(tasks) {
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

PureTaskList.propTypes = {
 /** Checks if it's in loading state */
 loading: PropTypes.bool,
 /** The list of tasks */
 tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
 /** Event to change the task to pinned */
 onPinTask: PropTypes.func,
 /** Event to change the task to archived */
 onArchiveTask: PropTypes.func,
};
PureTaskList.defaultProps = {
 loading: false,
};

export default connect(
    ({tasks}) => ({
        tasks: tasks.filter(t => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'),
    }),
    dispatch => ({
        onArchiveTask: id => dispatch(archiveTaskAction(id)),
        onPinTask: id => dispatch(pinTaskAction(id)),
    })
)(PureTaskList)
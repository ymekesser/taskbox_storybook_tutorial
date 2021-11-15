import React, { FC } from 'react';

export type State = 'TASK_INBOX' | 'TASK_PINNED' | 'TASK_ARCHIVED';

export interface TaskState {
    id: string;
    title: string;
    state: State;
}

export interface TaskProps {
    task: TaskState,
    onArchiveTask: (id: string) => void,
    onPinTask: (id: string) => void,
}

export const Task: FC<TaskProps> = ({ task: { id, title, state }, onArchiveTask, onPinTask }) => {
    return (
        <div className={`list-item ${state}`}>
            <label className="checkbox">
                <input
                    type="checkbox"
                    defaultChecked={state === 'TASK_ARCHIVED'}
                    disabled={true}
                    name="checked"
                />
                <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
            </label>

            <div className="title">
                <input type="text" value={title} readOnly={true} placeholder="Input title" />
            </div>

            <div className="actions" onClick={event => event.stopPropagation()}>
                {state !== 'TASK_ARCHIVED' && (
                    <a onClick={() => onPinTask(id)}>
                        <span className={`icon-star`} />
                    </a>
                )}
            </div>
        </div>
    )
}

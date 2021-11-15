import React, { FC } from 'react';
import { connect } from 'react-redux';

import TaskList from './TaskList';

export interface InboxScreenProps {
    error: string,
}

export const PureInboxScreen: FC<InboxScreenProps> = ({ error }) => {
    return error
        ? <div className="page lists-show">
            <div className="wrapper-message">
                <span className="icon-face-sad" />
                <div className="title-message">Oh no!</div>
                <div className="subtitle-message">Something went wrong</div>
            </div>
        </div>
        : <div className="page lists-show">
            <nav>
                <h1 className="title-page">
                    <span className="title-wrapper">Taskbox</span>
                </h1>
            </nav>
            <TaskList loading={false} />
        </div>;
}

export default connect(({ error }: InboxScreenProps) => ({ error }))(PureInboxScreen);
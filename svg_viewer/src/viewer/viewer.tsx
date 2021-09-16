import React from 'react';

import { circles } from './figures'
import { Manager } from './manager/manager';
import { ViewerManager } from './viewerManager';

export const Viewer: React.FC = () => {
    const manager: Manager = new ViewerManager()
    manager.svg = circles

    return (
        <>
            {manager.component}
        </>
    )
}
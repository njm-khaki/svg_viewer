import React from 'react';

import { circles } from './figures'
import { Manager } from './manager/manager';
import { ViewerManager } from './viewerManager';

/**
 * SVGビューワーをコンポーネントに落とし込む
 * @returns 
 */
export const Viewer: React.FC = () => {
    // ビューワーのインスタンス作成
    const manager: Manager = new ViewerManager()
    // ビューワーにSVFを設定する
    manager.svg = circles

    return (
        <>
            {/* ビューワーからJSX.Elementを取得 */}
            {manager.component}
        </>
    )
}
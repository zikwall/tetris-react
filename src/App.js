import React from 'react';
import { View, Panel, PanelHeader, PanelHeaderContent } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './assets/css/app.css';

import Tetris from "./Tetris";

function App() {
    return (
        <View activePanel="main">
            <Panel id="main">
                <PanelHeader>
                    <PanelHeaderContent>
                        Tetris
                    </PanelHeaderContent>
                </PanelHeader>
                <Tetris />
            </Panel>
        </View>
    );
}

export default App;

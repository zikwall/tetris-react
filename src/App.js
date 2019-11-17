import React from 'react';
import { View, Panel, PanelHeader, PanelHeaderContent, HeaderButton, platform, IOS } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './assets/css/app.css';
import Icon28Menu from '@vkontakte/icons/dist/28/menu';
import Icon24Services from '@vkontakte/icons/dist/24/services';
import Icon36Article from '@vkontakte/icons/dist/36/article';

import Tetris from "./Tetris";

function App() {
    const osname = platform();

    return (
        <View activePanel="main">
            <Panel id="main">
                <PanelHeader left={
                    <HeaderButton>
                        {
                            osname === IOS ? <Icon28Menu /> : <Icon36Article />
                        }
                    </HeaderButton>
                }>
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

import React from 'react';
import { View, Panel, PanelHeader } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

function App() {
  return (
      <View activePanel="main">
        <Panel id="main">
          <PanelHeader>Tetris</PanelHeader>


        </Panel>
      </View>
  );
}

export default App;

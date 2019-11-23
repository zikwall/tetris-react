import React from 'react';
import Immutable from 'immutable';
import propTypes from 'prop-types';

import './index.css';
import Button from './button';
import store from '../../store';
import todo from '../../control/todo';

export default class Keyboard extends React.Component {
  componentDidMount() {
    const touchEventCatch = {};

    const mouseDownEventCatch = {};
    document.addEventListener('touchstart', (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
    }, true);

    document.addEventListener('touchend', (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
    }, true);

    document.addEventListener('gesturestart', (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
    });

    document.addEventListener('mousedown', (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
    }, true);

    Object.keys(todo).forEach((key) => {
      this[`dom_${key}`].dom.addEventListener('mousedown', () => {
        if (touchEventCatch[key] === true) {
          return;
        }
        todo[key].down(store);
        mouseDownEventCatch[key] = true;
      }, true);
      this[`dom_${key}`].dom.addEventListener('mouseup', () => {
        if (touchEventCatch[key] === true) {
          touchEventCatch[key] = false;
          return;
        }
        todo[key].up(store);
        mouseDownEventCatch[key] = false;
      }, true);
      this[`dom_${key}`].dom.addEventListener('mouseout', () => {
        if (mouseDownEventCatch[key] === true) {
          todo[key].up(store);
        }
      }, true);
      this[`dom_${key}`].dom.addEventListener('touchstart', () => {
        touchEventCatch[key] = true;
        todo[key].down(store);
      }, true);
      this[`dom_${key}`].dom.addEventListener('touchend', () => {
        todo[key].up(store);
      }, true);
    });
  }

  shouldComponentUpdate({ keyboard, filling }) {
    return !Immutable.is(keyboard, this.props.keyboard) || filling !== this.props.filling;
  }

  render() {
    const keyboard = this.props.keyboard;
    return (
        <div
            className="keyboard"
            style={{
              marginTop: 20 + this.props.filling,
            }}
        >
          <Button
              color="blue"
              size="s1"
              top={0}
              left={374}
              label={'Rotation'}
              arrow="translate(0, 63px)"
              position
              active={keyboard.get('rotate')}
              ref={(c) => { this.dom_rotate = c; }}
          />
          <Button
              color="blue"
              size="s1"
              top={180}
              left={374}
              label={'Down'}
              arrow="translate(0,-71px) rotate(180deg)"
              active={keyboard.get('down')}
              ref={(c) => { this.dom_down = c; }}
          />
          <Button
              color="blue"
              size="s1"
              top={90}
              left={284}
              label={'Left'}
              arrow="translate(60px, -12px) rotate(270deg)"
              active={keyboard.get('left')}
              ref={(c) => { this.dom_left = c; }}
          />
          <Button
              color="blue"
              size="s1"
              top={90}
              left={464}
              label={'Right'}
              arrow="translate(-60px, -12px) rotate(90deg)"
              active={keyboard.get('right')}
              ref={(c) => { this.dom_right = c; }}
          />
          <Button
              color="blue"
              size="s0"
              top={100}
              left={52}
              label={`Drop (SPACE)`}
              active={keyboard.get('drop')}
              ref={(c) => { this.dom_space = c; }}
          />
          <Button
              color="red"
              size="s2"
              top={0}
              left={196}
              label={`Reset(R)`}
              active={keyboard.get('reset')}
              ref={(c) => { this.dom_r = c; }}
          />
          <Button
              color="green"
              size="s2"
              top={0}
              left={106}
              label={`Sound(S)`}
              active={keyboard.get('music')}
              ref={(c) => { this.dom_s = c; }}
          />
          <Button
              color="green"
              size="s2"
              top={0}
              left={16}
              label={`Pause(P)`}
              active={keyboard.get('pause')}
              ref={(c) => { this.dom_p = c; }}
          />
        </div>
    );
  }
}

Keyboard.propTypes = {
  filling: propTypes.number.isRequired,
  keyboard: propTypes.object.isRequired,
};

import React from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';
import { transform } from '../../../unit/const';
import './index.css';

export default class Button extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.active !== this.props.active;
  }

  render() {
    const {
      active, color, size, top, left, label, position, arrow,
    } = this.props;
    return (
        <div
            className={cn({ "button": true, [color]: true, [size]: true })}
            style={{ top, left }}
        >
          <i
              className={cn({ "active": active })}
              ref={(c) => { this.dom = c; }}
          />
          { size === 's1' && <em
              style={{
                [transform]: `${arrow} scale(1,2)`,
              }}
          /> }
          <span className={cn({ "position": position })}>{label}</span>
        </div>
    );
  }
}

Button.propTypes = {
  color: propTypes.string.isRequired,
  size: propTypes.string.isRequired,
  top: propTypes.number.isRequired,
  left: propTypes.number.isRequired,
  label: propTypes.string.isRequired,
  position: propTypes.bool,
  arrow: propTypes.string,
  active: propTypes.bool.isRequired,
};


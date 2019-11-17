import React from 'react';
import propTypes from 'prop-types';
import Number from '../number';

const DF = 'Point';
const ZDF = 'Max';
const SLDF = 'Last Round';

export default class Point extends React.Component {
  constructor() {
    super();
    this.state = {
      label: '',
      number: 0,
    };
  }

  componentWillMount() {
    this.onChange(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onChange(nextProps);
  }

  shouldComponentUpdate({ cur, point, max }) {
    const props = this.props;
    return cur !== props.cur || point !== props.point || max !== props.max || !props.cur;
  }

  onChange({ cur, point, max }) {
    clearInterval(Point.timeout);
    if (cur) {
      this.setState({
        label: point >= max ? ZDF : DF,
        number: point,
      });
    } else {
      const toggle = () => {
        this.setState({
          label: SLDF,
          number: point,
        });
        Point.timeout = setTimeout(() => {
          this.setState({
            label: ZDF,
            number: max,
          });
          Point.timeout = setTimeout(toggle, 3000);
        }, 3000);
      };

      if (point !== 0) {
        toggle();
      } else {
        this.setState({
          label: ZDF,
          number: max,
        });
      }
    }
  }

  render() {
    return (
      <div>
        <p>{ this.state.label }</p>
        <Number number={this.state.number} />
      </div>
    );
  }
}

Point.statics = {
  timeout: null,
};

Point.propTypes = {
  cur: propTypes.bool,
  max: propTypes.number.isRequired,
  point: propTypes.number.isRequired,
};


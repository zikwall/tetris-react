import React from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';
import './index.css';

export default class Logo extends React.Component {
  state = {
    style: "r1",
    display: 'none',
  };

  componentWillMount() {
    this.animate(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
        (
            [this.props.cur, nextProps.cur].indexOf(false) !== -1 &&
            (this.props.cur !== nextProps.cur)
        ) ||
        (this.props.reset !== nextProps.reset)
    ) {
      this.animate(nextProps);
    }
  }

  shouldComponentUpdate({ cur, reset }) {
    return cur !== this.props.cur || reset !== this.props.reset || !cur;
  }

  animate({ cur, reset }) {
    clearTimeout(Logo.timeout);
    this.setState({
      style: "r1",
      display: 'none',
    });
    if (cur || reset) {
      this.setState({ display: 'none' });
      return;
    }

    let m = 'r';
    let count = 0;

    const set = (func, delay) => {
      if (!func) {
        return;
      }
      Logo.timeout = setTimeout(func, delay);
    };

    const show = (func) => {
      set(() => {
        this.setState({
          display: 'block',
        });
        if (func) {
          func();
        }
      }, 150);
    };

    const hide = (func) => {
      set(() => {
        this.setState({
          display: 'none',
        });
        if (func) {
          func();
        }
      }, 150);
    };

    const eyes = (func, delay1, delay2) => {
      set(() => {
        this.setState({ style: m + 2 });
        set(() => {
          this.setState({ style: m + 1 });
          if (func) {
            func();
          }
        }, delay2);
      }, delay1);
    };

    const run = (func) => {
      set(() => {
        this.setState({ style: m + 4 });
        set(() => {
          this.setState({ style: m + 3 });
          count++;
          if (count === 10 || count === 20 || count === 30) {
            m = m === 'r' ? 'l' : 'r';
          }
          if (count < 40) {
            run(func);
            return;
          }
          this.setState({ style: m + 1 });
          if (func) {
            set(func, 4000);
          }
        }, 100);
      }, 100);
    };

    const dra = () => {
      count = 0;
      eyes(() => {
        eyes(() => {
          eyes(() => {
            this.setState({ style: m + 2});
            run(dra);
          }, 150, 150);
        }, 150, 150);
      }, 1000, 1500);
    };

    show(() => {
      hide(() => {
        show(() => {
          hide(() => {
            show(() => {
              dra();
            });
          });
        });
      });
    });
  }

  render() {
    if (this.props.cur) {
      return null;
    }
    return (
        <div className="logo" style={{ display: this.state.display }}>
          <div className={cn({ bg: true, 'dragon': true, [this.state.style]: true })} />
        </div>
    );
  }
}

Logo.propTypes = {
  cur: propTypes.bool,
  reset: propTypes.bool.isRequired,
};

Logo.statics = {
  timeout: null,
};

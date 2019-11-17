import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import propTypes from 'prop-types';

import './tetris.css';
import './loader.css';
import Matrix from './components/matrix';
import Decorate from './components/decorate';
import Number from './components/number';
import Next from './components/next';
import Music from './components/music';
import Pause from './components/pause';
import Point from './components/point';
import Logo from './components/logo';
import Keyboard from './components/keyboard';

import { transform, lastRecord, speeds} from './unit/const';
import { visibilityChangeEvent, isFocus } from './unit/';
import states from './control/states';

class Tetris extends React.Component {
    state = {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
    };

    componentWillMount() {
        window.addEventListener('resize', this.resize.bind(this), true);
    }

    componentDidMount() {
        if (visibilityChangeEvent) {
            document.addEventListener(visibilityChangeEvent, () => {
                states.focus(isFocus());
            }, false);
        }

        if (lastRecord) { // 读取记录
            if (lastRecord.cur && !lastRecord.pause) {
                const speedRun = this.props.speedRun;
                let timeout = speeds[speedRun - 1] / 2;
                timeout = speedRun < speeds[speeds.length - 1] ? speeds[speeds.length - 1] : speedRun;
                states.auto(timeout);
            }
            if (!lastRecord.cur) {
                states.overStart();
            }
        } else {
            states.overStart();
        }
    }

    resize() {
        this.setState({
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight,
        });
    }

    render() {
        let filling = 0;
        const size = (() => {
            const w = this.state.w;
            const h = this.state.h;
            const ratio = h / w;
            let scale;
            let css = {};
            if (ratio < 1.5) {
                scale = h / 960;
            } else {
                scale = w / 640;
                filling = (h - (960 * scale)) / scale / 3;
                css = {
                    paddingTop: Math.floor(filling) + 42,
                    paddingBottom: Math.floor(filling),
                    marginTop: Math.floor(-480 - (filling * 1.5)),
                };
            }
            css[transform] = `scale(${scale})`;
            return css;
        })();

        return (
            <div
                className="app"
                style={size}
            >
                <div className={classnames({'rect': true, 'drop': this.props.drop })}>
                    <Decorate />
                    <div className="screen">
                        <div className="panel">
                            <Matrix
                                matrix={this.props.matrix}
                                cur={this.props.cur}
                                reset={this.props.reset}
                            />
                            <Logo cur={!!this.props.cur} reset={this.props.reset} />
                            <div className="state">
                                <Point cur={!!this.props.cur} point={this.props.points} max={this.props.max} />
                                <p>{ this.props.cur ? 'Cleans' : 'Start Line' }</p>
                                <Number number={this.props.cur ? this.props.clearLines : this.props.startLines} />
                                <p>{'Level'}</p>
                                <Number
                                    number={this.props.cur ? this.props.speedRun : this.props.speedStart}
                                    length={1}
                                />
                                <p>{'Next'}</p>
                                <Next data={this.props.next} />
                                <div className="bottom">
                                    <Music data={this.props.music} />
                                    <Pause data={this.props.pause} />
                                    <Number time />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Keyboard filling={filling} keyboard={this.props.keyboard} />
            </div>
        );
    }
}

Tetris.propTypes = {
    music: propTypes.bool.isRequired,
    pause: propTypes.bool.isRequired,
    matrix: propTypes.object.isRequired,
    next: propTypes.string.isRequired,
    cur: propTypes.object,
    dispatch: propTypes.func.isRequired,
    speedStart: propTypes.number.isRequired,
    speedRun: propTypes.number.isRequired,
    startLines: propTypes.number.isRequired,
    clearLines: propTypes.number.isRequired,
    points: propTypes.number.isRequired,
    max: propTypes.number.isRequired,
    reset: propTypes.bool.isRequired,
    drop: propTypes.bool.isRequired,
    keyboard: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    pause: state.get('pause'),
    music: state.get('music'),
    matrix: state.get('matrix'),
    next: state.get('next'),
    cur: state.get('cur'),
    speedStart: state.get('speedStart'),
    speedRun: state.get('speedRun'),
    startLines: state.get('startLines'),
    clearLines: state.get('clearLines'),
    points: state.get('points'),
    max: state.get('max'),
    reset: state.get('reset'),
    drop: state.get('drop'),
    keyboard: state.get('keyboard'),
});

export default connect(mapStateToProps)(Tetris);

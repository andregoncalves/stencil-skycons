import { Component, Prop, Element, Watch, Method } from '@stencil/core';
import Skycons from './skycons';

@Component({
  tag: 'st-skycons'
})
export class StSkycons {

  @Element() el: HTMLElement;

  @Prop() color: string = 'black';
  @Prop() autoplay: boolean = true;
  @Prop() icon: string;
  @Prop() width: string = '64';
  @Prop() height: string = '64';

  skycons: any;

  @Watch('icon')
  validateIcon(newValue: string) {
    const isBlank = typeof newValue == null;

    const validValues = [
      'CLEAR_DAY',
      'CLEAR_NIGHT',
      'PARTLY_CLOUDY_DAY',
      'PARTLY_CLOUDY_NIGHT',
      'CLOUDY',
      'RAIN',
      'SLEET',
      'SNOW',
      'WIND',
      'FOG'
    ];

    if (isBlank) { throw new Error('icon: required') };

    if (validValues.indexOf(newValue) == -1) {
      throw new Error('icon: invalid icon name');
    }
  }

  constructor () {
  }

  componentWillLoad () {
    this.skycons = new Skycons({'color': this.color, "resizeClear": true })
  }

  componentDidLoad () {
    const canvasEl = this.el.querySelector('canvas');
    this._setSize(canvasEl);
    this._setIcon(canvasEl);

    if (this.autoplay)
      this.skycons.play();
  }

  componentDidUpdate () {
    const canvasEl = this.el.querySelector('canvas');
    this._setSize(canvasEl);
    this._setIcon(canvasEl);
  }

  componentDidUnload () {
    this.skycons.pause()
    this.skycons.remove(this.el.querySelector('canvas'))
  }

  _setIcon (el) {
    this.skycons.set(el, this.skycons[this.icon]);
  }

  _setSize (el) {
    el.setAttribute('width', this.width);
    el.setAttribute('height', this.height);
  }

  @Method()
  play () {
    this.skycons.play();
  }

  @Method()
  pause () {
    this.skycons.pause();
  }

  render() {
    return (
      <canvas></canvas>
    );
  }
}

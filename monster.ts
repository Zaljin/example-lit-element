import { LitElement, html, property, customElement } from 'lit-element';

@customElement('my-monster')
export class MyMonster extends LitElement {
  constructor() {
    super();
  }

  @property() name: string = '';
  @property() level: number = 1;
  @property() weight: number = 1;

  render() {
    return html``;
  }

  connectedCallback() {
    this.parentElement._registerMonster({
      name: this.name,
      level: this.level,
      weight: this.weight,
    });
  }

  disconnectedCallback() {
    this.parentElement._unregisterMonster({
      name: this.name,
      level: this.level,
      weight: this.weight,
    });
  }
}
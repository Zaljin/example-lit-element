import { LitElement, html, property, customElement } from 'lit-element';

@customElement('simple-button')
export class SimpleButton extends LitElement {
  @property() name = 'World';
  @property() target: string = '';

  render() {
    return html`<button @click="${this.handleClick}">${this.name}</button>`;
  }

  handleClick(event: Event) {
    if (this.target) {
      let propogatedEvent = new Event('update');
      document.getElementById(this.target).setAttribute('name', this.name);
      this.dispatchEvent(propogatedEvent);
    } 
  }
}
import { LitElement, html, property, customElement } from 'lit-element';

@customElement('my-encounter')
export class SimpleWrapper extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <my-random-monster-encounter id="monsterEncounter">
        <my-monster name="Goblin" level="1" active></my-monster>
        <my-monster name="Orc" level="2"></my-monster>
        <my-monster name="Bandit" level="2"></my-monster>
        <my-monster name="Hobgoblin" level="3"></my-monster>
        <my-monster name="Giant Rat" level="1"></my-monster>
      </my-random-monster-encounter>
      <button @click="${this.clickHandler}">Next Encounter</button>
    `;
  }

  clickHandler() {
    this.shadowRoot.getElementById('monsterEncounter').next();
  }
}

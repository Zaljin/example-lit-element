import { LitElement, html, property, customElement } from "lit-element";

@customElement("my-monster-maker")
export class MyMonsterMaker extends LitElement {
  _monster = {};

  render() {
    return html`
      <label for="monsterName">Monster Name</label>
      <input id="monsterName" type="text" />
      <button @click="${this.createMonster}">Create</button>
    `;
  }

  createMonster() {
    let valid = () => {};
    let invalid = () => {};
    const success = new Promise((resolve, reject) => {
      valid = resolve;
      invalid = reject;
    });
    const event = new CustomEvent("create", {
      detail: {
        monster: this.shadowRoot.getElementById("monsterName").value,
        valid: () => {
          this.shadowRoot.getElementById("monsterName").value = '';
          valid();
        },
        invalid: () => {
          console.log('Monster with that name already exists!');
          invalid();
        }
      }
    });

    this.dispatchEvent(event);
  }
}

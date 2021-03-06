import { LitElement, html, property, query, customElement } from "lit-element";

@customElement("my-encounter")
export class MyEncounter extends LitElement {
  constructor() {
    super();
  }

  _monsters = [
    { name: "goblin", level: 1, weight: 1 },
    { name: "orc", level: 2, weight: 1 },
    { name: "bandit", level: 2, weight: 1 },
    { name: "hobgoblin", level: 3, weight: 1 },
    { name: "giant rat", level: 1, weight: 1 }
  ];

  @query("#monsterEncounter") randomMonster;
  @query("#monsterEncounter2") randomMonsterB;
  @query("#monsterMaker") monsterMaker;

  render() {
    return html`
      <my-random-monster id="monsterEncounter">
        ${this._renderMonsters()}
      </my-random-monster>
      <my-random-monster-2 id="monsterEncounter2"></my-random-monster-2>
      <button @click="${this.clickHandler}">Next Encounter</button>
      <hr />
      <my-monster-maker id="monsterMaker"></my-monster-maker>
    `;
  }

  _renderMonsters() {
    return this._monsters.map(
      monster => html`
        <my-monster
          name="${monster.name}"
          level="${monster.level}"
        ></my-monster>
      `
    );
  }

  firstUpdated() {
    this.randomMonsterB.monsters = this._monsters;
    this.monsterMaker.addEventListener("create", evt => {
      const newMonster = evt.detail.monster;
      const exists = this._monsters.some(
        monster => monster.name === newMonster
      );
      if (!exists) {
        evt.detail.valid();
        this._monsters.push({
          name: newMonster,
          level: 1,
          weight: 1
        });

        this.randomMonsterB.monsters = this._monsters;
        this.requestUpdate();
      } else {
        evt.detail.invalid();
      }
    });
  }

  clickHandler() {
    this.randomMonster.next();
    this.randomMonsterB.next();
  }
}

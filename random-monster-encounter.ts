import { LitElement, html, property, customElement } from 'lit-element';

@customElement('my-random-monster-encounter')
export class MyRandomMonsterEncounter extends LitElement {
  constructor() {
    super();
  }

  _monsters = [];
  _activeMonster = undefined;

  render() {
    const hasActiveMonster = !!this._activeMonster;
    return html`
      ${hasActiveMonster ? this._buildMonsterTemplate() : ''}
    `;
  }

  next() {
    let totalWeight = this._monsters.reduce((weight, m) => weight + m.weight, 0);
    let weightedRandom = Math.random() * totalWeight;
    this._monsters.some(monster => {
      if (weightedRandom < monster.weight) {
        this._activeMonster = monster;
        return true;
      } else {
        weightedRandom -= monster.weight;
        return false;
      }
    });
    this.requestUpdate();
  }

  _buildMonsterTemplate() {
    return html`
      <div class="monster-header">
        <div class="monster-name">${this._activeMonster.name}</div>
        <div class="monster-level">${this._activeMonster.level}</div>
      </div>
    `;
  }

  _registerMonster(monster: { name: string, level: number, weight: number }) {
    this._monsters = [...this._monsters, monster];
    this.next();
  }

  _unregisterMonster(monster: { name: string, level: number, weight: number }) {
    this._monsters.splice(this._monsters.findIndex(m => m.name === monster.name), 0);
    this._monsters = [...this._monsters];
  }
}
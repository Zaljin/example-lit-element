import { LitElement, html, property, customElement } from "lit-element";

@customElement("my-random-monster-2")
export class MyRandomMonster2 extends LitElement {
  _monsters = [];
  set monsters(value: any[]) {
    this._monsters = [...value];
  }
  get monsters() {
    return [...this._monsters];
  }
  _activeMonster = undefined;

  render() {
    const hasActiveMonster = !!this._activeMonster;
    return html`
      ${hasActiveMonster ? this._buildMonsterTemplate() : ""}
    `;
  }

  next() {
    let totalWeight = this._monsters.reduce(
      (weight, m) => weight + m.weight,
      0
    );
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
}

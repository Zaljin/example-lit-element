import { LitElement, html, property, customElement } from "lit-element";

@customElement("my-random-monster-encounter")
export class MyRandomMonsterEncounter extends LitElement {
  constructor() {
    super();
    this._monsterListMutations.observe(this, {
      childList: true,
    });
  }

  _monsters = [];
  _activeMonster = undefined;

  _monsterListMutations = new MutationObserver((mutationsList, observer) => {
    mutationsList.forEach(mutation => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(node => {
          if (node.nodeName.toLowerCase() === "my-monster") {
            let monsterNode = node as any;
            this._registerMonster(monsterNode.monster);
            monsterNode.addEventListener("updated", evt => {
              this._updateMonster(evt.detail.monster);
            });
          }
        });
        mutation.removedNodes.forEach(node => {
          if (node.nodeName === "my-monster") {
            this._unregisterMonster((node as any).monster);
          }
        });
      }
    });
  });

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

    this._monsters.forEach(monster => monster.el.removeAttribute("active"));
    this._monsters.some(monster => {
      if (weightedRandom < monster.weight) {
        this._activeMonster = monster;
        monster.el.setAttribute("active", "");
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

  _registerMonster(monster: {
    id: number;
    name: string;
    level: number;
    weight: number;
  }) {
    this._monsters = [...this._monsters, monster];
  }

  _updateMonster(monster: {
    id: number;
    name: string;
    level: number;
    weight: number;
  }) {
    this._monsters.splice(
      this._monsters.findIndex(m => m.id === monster.id),
      1
    );
    this._monsters = [...this._monsters, monster];
    if (this._activeMonster && this._activeMonster.id === monster.id) {
      this._activeMonster = monster;
      this.requestUpdate();
    }
  }

  _unregisterMonster(monster: {
    id: number;
    name: string;
    level: number;
    weight: number;
  }) {
    this._monsters.splice(
      this._monsters.findIndex(m => m.id === monster.id),
      1
    );
    this._monsters = [...this._monsters];
  }
}

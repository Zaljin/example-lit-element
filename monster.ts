import { LitElement, html, property, customElement } from 'lit-element';

let monsterId = 0;

@customElement('my-monster')
export class MyMonster extends LitElement {
  _monster = {
    id: ++monsterId,
    name: '',
    level: 1,
    weight: 1,
    treasure: [],
    el: this,
  };

  get monster() {
    return { ...this._monster };
  }

  @property() set name(value: string) {
    this._monster = {
      ...this._monster,
      name: value,
    };
    this.updateMonster();
  }
  get name(): string {
    return this._monster.name;
  }

  @property() set level(value: number) {
    this._monster = {
      ...this._monster,
      level: value,
    };
    this.updateMonster();
  }
  get level(): number {
    return this._monster.level;
  }

  @property() set weight(value: number) {
    this._monster = {
      ...this._monster,
      weight: value,
    };
    this.updateMonster();
  }
  get weight(): number {
    return this._monster.weight;
  }

  @property() set treasure(value: string[]) {
    this._monster = {
      ...this._monster,
      treasure: value,
    };
    this.updateMonster();
  }
  get treasure(): string[] {
    return this._monster.treasure;
  }

  createRenderRoot() {
    return this;
  }

  updateMonster() {
    const changed = new CustomEvent('updated', {
      detail: {
        monster: { ...this._monster },
      }
    });
    this.dispatchEvent(changed);
  }
}
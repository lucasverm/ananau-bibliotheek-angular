import { GebruikerItem } from './gebruiker-item.model';
import { _ } from 'underscore';

export class Item {
    id: string;
    naam: string;
    beschikbaar: boolean;
    gearchiveerd: boolean;
    gebruikerItems: GebruikerItem[];
    toegevoegdOp: Date;

    constructor() {}

    static fromJSON(json: any): Item {
        var item = new Item();
        item.id = json.id;
        item.naam = json.naam;
        item.beschikbaar = json.beschikbaar;
        item.gearchiveerd = json.gearchiveerd;
        item.gebruikerItems = json.gebruikerItems.map(GebruikerItem.fromJSON);
        item.toegevoegdOp = new Date(json.toegevoegdOp);
        return item;
    }
    public ontleendDoor(): string {
        let gebruiker = this.gebruikerItems[0].gebruiker
        return gebruiker.voornaam + " " + gebruiker.achternaam;
    }

    public ontleendOp(): Date {
        return _.sortBy([...this.gebruikerItems], 'ontleendOp').reverse()[0].OntleendOp;
    }

}

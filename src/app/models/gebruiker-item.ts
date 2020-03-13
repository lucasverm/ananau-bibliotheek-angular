import { Gebruiker } from './gebruiker';
import { Item } from './item';

export class GebruikerItem {
          id: string;
          gebruiker: Gebruiker;
          item: Item;
           OntleendOp: Date;
          TerugOp:  Date;
}

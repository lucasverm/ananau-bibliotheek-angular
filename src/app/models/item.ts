import { GebruikerItem } from './gebruiker-item';

export class Item {
    id: string;
    naam: string;
    beschikbaar: boolean;
    gebruikertems: GebruikerItem[];
}

import { GebruikerItem } from './gebruiker-item.model';

export class Gebruiker {
    id: string;
    voornaam: string;
    achternaam: string;
    email: string;
    wachtwoord: string;
    geboortedatum: Date;
    telefoonNummer: String;
    type: string;
    gebruikertems: GebruikerItem[];
}

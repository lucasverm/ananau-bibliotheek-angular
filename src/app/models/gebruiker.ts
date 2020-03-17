import { GebruikerItem } from './gebruiker-item';

export class Gebruiker {
    id: string;
    voornaam: string;
    achternaam: string;
    email: string;
    wachtwoord: string;
    geboortedatum: Date
    foto: string;
    type: string;
    gebruikertems: GebruikerItem[];
}

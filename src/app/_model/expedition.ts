import {Colis} from "./colis";
import {Utilisateur} from "./utilisateur";
import {Adresse} from "./adresse";
import {StatusExpedition} from "./status-expedition";

export class Expedition {
  id: string;
  dateDepart: string;
  dateArrive: string;
  heureDepart: string;
  heureArrive: string;
  dateLastUpdate: string;
  dateCreated: string;
  colis: Colis[];
  utilisateur: Utilisateur;
  adresseSource: Adresse;
  adresseDestination: Adresse;
  expeditionStatus: StatusExpedition;
}

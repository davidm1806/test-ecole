import {Utilisateur} from "./utilisateur";
import {Agence} from "./agence";

export class Employer {
  id: string;
  telephone: string;
  email: string;
  matricule: string;
  private dateCreated: string;
  private dateLastUpdate: string;
  userAccount: Utilisateur;
  agence: Agence;

}

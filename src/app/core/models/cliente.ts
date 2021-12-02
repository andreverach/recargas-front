import { Recarga } from "./recarga";

export interface Cliente {
  //player
  id         : string;
  username   : string;
  fullname   : string;
  code       : string;
  created_at : string;
  updated_at : string;
  recharges  : Recarga[];
}

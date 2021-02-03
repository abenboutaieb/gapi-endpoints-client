import {Scope} from './scopes';

export class AuthContext {
  apis: string;
  clientId: string;
  scope: Scope[];
  additionalScopes: Scope[];
}

/**
 * @flow
 * @relayHash 41867c06ca6477eb153df6b156047cb1
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type AuthenticateUserMutationVariables = {|
  email: string;
  password: string;
|};
export type AuthenticateUserMutationResponse = {|
  +authenticateUser: ?{|
    +token: string;
  |};
|};
*/


/*
mutation AuthenticateUserMutation(
  $email: String!
  $password: String!
) {
  authenticateUser(email: $email, password: $password) {
    token
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "email",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "password",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuthenticateUserMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "email",
            "variableName": "email",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "password",
            "variableName": "password",
            "type": "String!"
          }
        ],
        "concreteType": "AuthenticateUserPayload",
        "name": "authenticateUser",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "token",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "AuthenticateUserMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "email",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "password",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "AuthenticateUserMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "email",
            "variableName": "email",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "password",
            "variableName": "password",
            "type": "String!"
          }
        ],
        "concreteType": "AuthenticateUserPayload",
        "name": "authenticateUser",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "token",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation AuthenticateUserMutation(\n  $email: String!\n  $password: String!\n) {\n  authenticateUser(email: $email, password: $password) {\n    token\n  }\n}\n"
};

module.exports = batch;

export const mocaconnectschema = `\
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "description": "Verifiable credential for gamers including connected platforms, games played, ranks, experience, and basic profile info",
    "title": "Gamer Credential",
    "type": "object",
    "$metadata": {
      "uris": {
        "jsonLdContext": "https://credential-moca.api.sandbox.air3.com/dstorage/download/c21sc051dyr3v02w8311we"
      },
      "type": "GamingProfile",
      "version": "1.1"
    },
    "properties": {
      "subjectPosition": {
        "type": "string",
        "enum": [
          "none",
          "index",
          "value"
        ]
      },
      "credentialSchema": {
        "type": "object",
        "properties": {
          "id": {
            "format": "uri",
            "type": "string"
          },
          "type": {
            "type": "string"
          }
        },
        "required": [
          "id",
          "type"
        ]
      },
      "credentialSubject": {
        "title": "Credential subject",
        "type": "object",
        "properties": {
          "connected": {
            "description": "True if the player is connected/verified on at least one platform (Steam or Epic)",
            "type": "boolean",
            "title": "Connected Platforms"
          },
          "country": {
            "description": "Country of residence",
            "type": "string",
            "title": "Country"
          },
          "game": {
            "description": "Game the player is associated with (Valorant, CS2)",
            "type": "string",
            "title": "Game"
          },
          "name": {
            "description": "Player’s full name",
            "type": "string",
            "title": "Full Name"
          },
          "xp": {
            "description": "Duration of gaming experience (e.g., 3.8 Years)",
            "type": "string",
            "title": "Gaming Experience"
          },
          "rank": {
            "description": "Player’s rank/level in the selected game",
            "type": "string",
            "title": "Rank"
          },
          "id": {
            "format": "uri",
            "title": "Credential subject ID",
            "type": "string"
          },
          "age": {
            "description": "Player’s age",
            "type": "number",
            "title": "Age"
          }
        },
        "required": [
          "connected",
          "game",
          "rank",
          "name",
          "age",
          "country",
          "id"
        ]
      },
      "type": {
        "type": [
          "string",
          "array"
        ],
        "items": {
          "type": "string"
        }
      },
      "@context": {
        "type": [
          "string",
          "array",
          "object"
        ]
      },
      "version": {
        "type": "integer"
      },
      "issuer": {
        "format": "uri",
        "type": [
          "string",
          "object"
        ],
        "properties": {
          "id": {
            "format": "uri",
            "type": "string"
          }
        },
        "required": [
          "id"
        ]
      },
      "issuanceDate": {
        "format": "date-time",
        "type": "string"
      },
      "updatable": {
        "type": "boolean"
      },
      "revNonce": {
        "type": "integer"
      },
      "id": {
        "type": "string"
      },
      "merklizationRootPosition": {
        "type": "string",
        "enum": [
          "none",
          "index",
          "value"
        ]
      },
      "expirationDate": {
        "format": "date-time",
        "type": "string"
      }
    },
    "required": [
      "@context",
      "id",
      "type",
      "issuanceDate",
      "credentialSubject",
      "credentialSchema",
      "credentialStatus",
      "issuer"
    ]
  }
  `;

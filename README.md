# Score

## Development process

`ng serve` to run program locally
`ng build` to build program WITHOUT updating version number
`npm run build` to build program and automatically update version number to next minor one
`firebase deploy` to deploy program to Firebase (sometimes you might need `firebase login --reauth`)

## Backups

Use `firestore-export` to backup database (`node-firestore-import-export`)

Example: `firestore-export --accountCredentials .\<Firebase API-key file>.json --backupFile .\<20240307_pretty>.json --prettyPrint`
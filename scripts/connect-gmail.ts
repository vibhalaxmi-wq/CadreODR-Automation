import { authenticate } from '@google-cloud/local-auth';
import fs from 'node:fs';
import path from 'node:path';

async function main() {
  const projectRoot = process.cwd();

  const auth = await authenticate({
    keyfilePath: path.join(projectRoot, 'credentials.json'),
    scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
  });

  fs.writeFileSync(
    path.join(projectRoot, 'token.json'),
    JSON.stringify(auth.credentials, null, 2)
  );

  console.log('Gmail connected. token.json was created.');
}

main().catch(console.error);
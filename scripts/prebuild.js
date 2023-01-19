//@ts-check
import { config as env } from 'dotenv';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function main () {
  const { parsed } = env()

  /**
   * @type {import('../src/types/user').UserProfile}
   */
  // @ts-ignore
  const user = await (await fetch(`https://linkfree.eddiehub.io/api/users/${parsed.LINKFREE_USERNAME}`)).json()

  const file = Buffer.from(await (await fetch(user.avatar)).arrayBuffer())

  writeFileSync(join(__dirname, '../public/avatar.png'), file)
}

main()

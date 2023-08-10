export class Hash {
  static async getHashedPassword(password: string) {
    const { pbkdf2Sync } = await import('node:crypto');
    const hashedPasswordBytes = pbkdf2Sync(password, 'salt', 6, 16, 'sha512');

    return hashedPasswordBytes.toString('hex');
  }
}

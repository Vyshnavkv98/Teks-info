import bcrypt from 'bcrypt'

export class hashBcrypt {
    constructor() {
        this.saltRounds = 10;

    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(this.saltRounds);

          let hashedPassword = await bcrypt.hash(String(password), salt);
          return hashedPassword
    }

}
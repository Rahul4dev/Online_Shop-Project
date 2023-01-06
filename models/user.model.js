const bcrypt = require('bcryptjs');

const db = require('../data/database');

class User {
    constructor(email, password, fullname, street, postal, city) {
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.address = {
            street : street,
            postalCode : postal,
            city : city
        };
        
    }

    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12);

        await db.getDb().collection('users').insertOne({
            email: this.email,
            password : hashedPassword,
            name : this.fullname,
            address : this.address,
        });        
    }

    isUserExists() {
        return db.getDb().collection('users').findOne({email: this.email});
    }

    async existsAlready() {
       const existingUser =  await this.isUserExists();
       if(existingUser) {
        return true;
       }
       return false;
    }

    comparePassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword);
    }
}

module.exports = User;
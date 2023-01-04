const mongoDbStore = require("connect-mongodb-session");
const expressSession =  require('express-session');

function createSessionStore() {
    const MongoDbStore = mongoDbStore(expressSession);

    const store = new MongoDbStore({
      uri: "mongodb://127.0.0.1:27017",
      databaseName: "online-shop",
      collection: "sessions",
    });

    store.on('error', (error) => {
        console.log(error);
    })

     return store;
}

function createSessionConfig() {
    return {
        secret: 'super-secret',  // we should select it long and complex string
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    };
} 

module.exports = createSessionConfig;
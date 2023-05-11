const { client, getAllUsers } = require("./index");

async function dropTables() {
  try {
    console.log("starting to drop tables...");
    await client.query(` DROP TABLE IF EXISTS users;`);
    console.log(" finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("starting to build tables...");
    await client.query(`
    CREATE TABLE  users (
        id SERIAL PRIMARY KEY, 
        username varchar(255) UNIQUE NOT NULL,
        password varchar (255) NOT NULL
    );
    `);
    console.log("finished building tables!");
  } catch (error) {
    console.error("error building tables!");
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

async function testDB() {
  try {
    console.log("starting to test database...");
    const users = await getAllUsers();
    // client.connect();
    // const { users } = await client.query(`SELECT * FROM users;`);
    console.log(users);
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}
testDB();

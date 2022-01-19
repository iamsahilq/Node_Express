import { join } from 'path';
import { Low, JSONFile } from 'lowdb';
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

const initDb = async () => {
  db.data ||= { users: [] };
  await db.write();
};

export const Users = {
  getUsers: async () => {
    // If file.json doesn't exist, db.data will be null
    // Set default data
    await db.read();

    if (!db.data) {
      initDb();
    }

    // You can also use this syntax if you prefer
    const { users } = db.data;
    return users;
  },
  addUser: async (user) => {
    // If file.json doesn't exist, db.data will be null
    // Set default data
    await db.read();
    if (!db.data) {
      initDb();
    }
    db.data.users.push(user);

    await db.write();
    const { users } = db.data;

    return users;
  },
};

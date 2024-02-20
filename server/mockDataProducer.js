import { faker } from '@faker-js/faker';
import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const { PORT, DATABASE_URL } = process.env;

const pool = new pg.Pool({
  connectionString: DATABASE_URL,
});

await pool.connect();

//name, description, birthday, profile_pic, kind
let animal = {name: '', description: '', birthday: '', profile_pic: '', kind: ''};
//loop 1,000,000 times

const insertPromises = [];
console.log('connected');
//pick species
for (let i = 0; i < 1000000; i++) {
  //create a mock animal
  createDog(animal);
  //append a mock animal
  insertPromises.push(pool.query(
    'INSERT INTO pets(name, description, birthday, profile_pic, kind) VALUES ($1, $2, $3, $4, $5)',
    [animal.name, animal.description, animal.birthday, animal.profile_pic, animal.kind]));
}

Promise.all(insertPromises)
  .then((data) => {console.log('Complete'); process.exit(0)})
  .catch((err) => console.log(err));



function createDog(animal) {
  animal.name = faker.person.firstName();
  animal.description = faker.animal.dog();
  animal.description = animal.description.includes("'") ? 'Derp' : animal.description;
  animal.birthday = faker.date.birthdate({
    max: 15,
    min: 1,
    mode: 'age',
  }).toISOString().split('T')[0];
  animal.profile_pic = faker.image.url();
  animal.kind = 'dog';
};

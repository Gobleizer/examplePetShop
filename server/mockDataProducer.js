import fs from 'node:fs';
import { faker } from '@faker-js/faker';

//name, description, birthday, profile_pic, kind
let animal = {name: '', description: '', birthday: '', profile_pic: '', kind: ''};
let content = '';
//loop 1,000,000 times


//pick species
for (let i = 0; i < 1000000; i++) {
  //create a mock animal
  createDog(animal);
  //append a mock animal
  content = `('${animal.name}', '${animal.description}', '${animal.birthday}', '${animal.profile_pic}', '${animal.kind}'),`;
  if (i === 999999) {
    content = content.slice(0, content.length);
  }
  fs.appendFileSync('mockSeedData.sql', content);
}



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

//end file
fs.appendFileSync('mockSeedData.sql', ';');

import faker from 'faker';
import { cities } from '../actions/citiesList';
import { normalize } from 'normalizr';

export function generateFakeList(quantity) {
  const list = [];
  for (let i = 1; i < quantity + 1; i += 1) {
    list.push({
      id: i.toString(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    });
  }
  return list;
}

export function generateFakeNestedList(quantity) {
  const nestedList = [];
  for (let i = 1; i < quantity + 1; i += 1) {
    nestedList.push({
      id: i.toString(),
      city: faker.address.city(),
      habitants: generateFakeList(quantity)
    });
  }
  return nestedList;
}

console.log('Received data: ', generateFakeNestedList(3));
console.log('Normalized data: ', normalize(generateFakeNestedList((3)), cities));

import faker from 'faker';

let id = 1;
export function generateFakeList(quantity) {
  const list = [];
  for (let i = 1; i < quantity + 1; i += 1) {
    list.push({
      id: id.toString(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    });
    id += 1;
  }
  return list;
}

export function generateFakeCitiesList(quantity) {
  const nestedList = [];
  for (let i = 1; i < quantity + 1; i += 1) {
    nestedList.push({
      id: id.toString(),
      city: faker.address.city(),
      habitants: generateFakeList(quantity)
    });
    id += 1;
  }

  return nestedList;
}

console.log(generateFakeCitiesList(1));

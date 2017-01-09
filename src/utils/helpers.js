import faker from 'faker';

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
      firstName: faker.name.firstName(),
      // categories: [
      //   {id: (faker.random.uuid()).toString(), name: faker.commerce.product()},
      //   {id: (faker.random.uuid()).toString(), name: faker.commerce.product()}
      // ]
    });
  }
  return nestedList;
}

import faker from 'faker';

export function generateFakeList(quantity, initialId = 1) {
  const list = [];
  for (let i = initialId; i < quantity + initialId; i += 1) {
    list.push({
      id: i.toString(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    });
  }
  return list;
}

export function generateFakeCompaniesList(quantity) {
  const list = [];
  for (let i = 1; i < quantity + 1; i += 1) {
    list.push({
      id: i.toString(),
      companyName: faker.company.companyName(),
      employees: generateFakeList(5, i * 5)
    });
  }
  return list;
}

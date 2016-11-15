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

export function generateCompanyList(quantity) {
  const list = [];
  for (let i = 1; i < quantity + 1; i += 1) {
    list.push({
      id: id.toString(),
      companyName: faker.company.companyName(),
      employee: generateFakeList(5)
    });
  }
  return list;
}

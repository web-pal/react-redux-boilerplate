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

export function genaratorId() {
  let id = 0;
  return () => {
    id += 1;
    return id.toString();
  };
}

export function generateFakeEmployees(quantity) {
  const employees = [];
  const getId = genaratorId();
  for (let i = 1; i < quantity + 1; i += 1) {
    employees.push({
      id: getId(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    });
  }
  return employees;
}

export function generateFakeCompanies(quantity) {
  const companies = [];
  for (let i = 1; i < quantity + 1; i += 1) {
    companies.push({
      id: i.toString(),
      companyName: faker.company.companyName(),
      employees: generateFakeEmployees(6)
    });
  }
  return companies;
}

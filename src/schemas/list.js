import { schema } from 'normalizr';

export const listDefaults = {
  removeInprocess: false,
  editInprocess: false
};

export const list = new schema.Entity(
  'list', {}, {
    processStrategy: value => ({ ...value, ...listDefaults })
  }
);

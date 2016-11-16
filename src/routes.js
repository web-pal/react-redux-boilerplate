import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Base from './containers/Base/Base';
import Index from './containers/Index/Index';
import List from './containers/List/List';
import Form from './containers/Form/Form';
import CompanyList from './containers/CompanyList/List';

export const urls = {
  index: '/',
  list: '/list',
  companyList: '/company_list',
  form: '/form'
};

export const routes = (
  <Route path={urls.index} component={Base}>
    <IndexRoute component={Index} />
    <Route path={urls.list} component={List} />
    <Route path={urls.companyList} component={CompanyList} />
    <Route path={urls.form} component={Form} />
  </Route>
);

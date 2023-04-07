import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import promiseMiddleware from 'redux-promise-middleware';
import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware';
import ReducerRegistry from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import { Middleware, Reducer } from 'redux';
import { dependantsReducer, dependenciesReducer, loadPackage, packageDetailsReducer } from './package';
import thunk from 'redux-thunk';
import reduceReducers from 'reduce-reducers';
import { inventoryReducer } from './inventory';

export let registry: ReducerRegistry<Reducer>;

export function init(...middleware: Middleware[]) {
  registry = getRegistry({}, [
    thunk,
    promiseMiddleware,
    notificationsMiddleware({ errorDescriptionKey: ['detail', 'stack'] }),
    ...middleware
  ]);
  //registry.register({ 'trust/loadPackage': loadPackage });
  //registry.register({ trust: dependenciesReducer });
  //registry.register({ trust: dependantsReducer });
  registry.register({
    trust: reduceReducers(
      dependenciesReducer,
      dependantsReducer,
      packageDetailsReducer
    ),
  });
  registry.register({
    trusted_inventory: inventoryReducer,
  });
  return registry;
}

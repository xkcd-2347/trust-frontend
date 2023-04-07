import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

const initialState = {
  dependencies: [],
  dependants: [],
  details: {},
};

export const loadPackage = (
  purl: string
): ThunkAction<any, any, any, AnyAction> => {
  return async (dispatch: any) => {
    dispatch(setPackageDetails({}));
    dispatch(setDependencies([]));
    dispatch(setDependants([]));
    const dependencies = await fetch('/api/package/dependencies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([purl]),
    });

    const jsonDependencies = await dependencies.json();
    dispatch(setDependencies(jsonDependencies[0]));

    const dependants = await fetch('/api/package/dependants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([purl]),
    });

    const jsonDependants = await dependants.json();
    dispatch(setDependants(jsonDependants[0]));

    const details = await fetch('/api/package', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([purl]),
    });

    const jsonDetails = await details.json();
    dispatch(setPackageDetails(jsonDetails[0]));
  };
};

export const setPackageDetails = (details: object) => {
  return {
    type: 'trust/pkg-details',
    details: details,
  };
};

export function selectPackageDetails(state: any) {
  return state.trust.details;
}

export function packageDetailsReducer(state = initialState, action: AnyAction) {
  if (action.type == 'trust/pkg-details') {
    return {
      ...state,
      details: action.details,
    };
  } else {
    return state;
  }
}

export const setDependencies = (deps: object) => {
  return {
    type: 'trust/dependencies',
    dependencies: deps,
  };
};

export function dependenciesReducer(state = initialState, action: AnyAction) {
  if (action.type == 'trust/dependencies') {
    return {
      ...state,
      dependencies: action.dependencies,
    };
  } else {
    return state;
  }
}

export function selectDependencies(state: any) {
  return state.trust.dependencies;
}

export const setDependants = (deps: object) => {
  return {
    type: 'trust/dependants',
    dependants: deps,
  };
};

export function dependantsReducer(state = initialState, action: AnyAction) {
  if (action.type == 'trust/dependants') {
    console.log('SET DEP', action.dependants);
    return {
      ...state,
      dependants: action.dependants,
    };
  } else {
    return state;
  }
}

export function selectDependants(state: any) {
  console.log('STATE', state);
  console.log('STATE', state);
  console.log('STATE', state);
  console.log('STATE', state);
  return state.trust.dependants;
}

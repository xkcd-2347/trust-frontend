import React, { Suspense, lazy } from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { InvalidObject } from '@redhat-cloud-services/frontend-components/InvalidObject';

import { Bullseye, Spinner } from '@patternfly/react-core';

const PackagePage = lazy(
  () =>
    import(
      /* webpackChunkName: "InventoryPage" */ './Routes/PackagePage/PackagePage'
    )
);

const VulnPage = lazy(
  () => import(/* webpackChunkName: "VulnPage" */ './Routes/VulnPage/VulnPage')
);

const TutorialsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "TutorialsPage" */ './Routes/TutorialsPage/TutorialsPage'
    )
);

const TutorialPage = lazy(
  () =>
    import(
      /* webpackChunkName: "TutorialPage" */ './Routes/TutorialPage/TutorialPage'
    )
);

const SearchPage = lazy(
  () =>
    import(
      /* webpackChunkName: "SearchPage" */ './Routes/SearchPage/SearchPage'
    )
);

const OverviewPage = lazy(
  () =>
    import(
      /* webpackChunkName: "OverviewPage" */ './Routes/OverviewPage/OverviewPage'
    )
);
const OopsPage = lazy(
  () => import(/* webpackChunkName: "OopsPage" */ './Routes/OopsPage/OopsPage')
);
const NoPermissionsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "NoPermissionsPage" */ './Routes/NoPermissionsPage/NoPermissionsPage'
    )
);

const InventoryPage = lazy (
  () =>
    import(
      /* webpackChunkName: "InventoryPage" */ './Routes/InventoryPage/InventoryPage'
      )
)

export const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    <RouterRoutes>
      <Route path="no-permissions" element={<NoPermissionsPage />} />
      <Route path="oops" element={<OopsPage />} />
      <Route path="tutorial" element={<TutorialsPage />} />
      <Route path="tutorial/:id" element={<TutorialPage />} />
      <Route path="inventory" element={<InventoryPage />} />
      <Route path="package/:purl" element={<PackagePage />} />
      <Route path="vuln/:id" element={<VulnPage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="/" element={<OverviewPage />} />
      {/* Finally, catch all unmatched routes */}
      <Route path="*" element={<InvalidObject />} />
    </RouterRoutes>
  </Suspense>
);

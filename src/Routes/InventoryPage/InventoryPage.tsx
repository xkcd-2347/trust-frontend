import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Grid,
  GridItem,
  Spinner,
  Stack,
  StackItem,
  Tab,
  TabTitleText,
  Tabs,
  Title,
} from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';

const SampleComponent = lazy(
  () => import('../../Components/SampleComponent/sample-component')
);

import './inventory-page.scss';
import AppLink from '../../Components/AppLink';
import {
  loadPackage,
  selectDependants,
  selectDependencies,
  setDependants,
  setDependencies,
} from '../../store/package';
import Dependency from '../../Components/Dependency/dependency';
import { useLocation, useParams } from 'react-router-dom';
import Dependant from '../../Components/Dependant/dependant';
import { loadInventory, selectInventory } from '../../store/inventory';
import {
  Table,
  TableComposable,
  TableHeader,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
const InventoryPage = () => {
  const dispatch = useDispatch();

  const inventory = useSelector(selectInventory);
  const location = useLocation();

  useEffect(() => {
    console.log('location changed');
    dispatch(loadInventory());
  }, [location]);

  useEffect(() => {
    insights?.chrome?.appAction?.('sample-page');
  }, []);

  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [isBox, setIsBox] = React.useState<boolean>(false);
  // Toggle currently active tab
  const handleTabClick = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  //console.log('dependencies: ', dependencies);
  //console.log('dependants: ', dependants);

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title="Package" />
        <p> A single Trusted Content Package! </p>
      </PageHeader>
      <Main>
        <Grid>
          <GridItem span={8}>
            {/*<Title headingLevel='h1'>Package long name</Title>*/}
            <Title headingLevel="h2">Inventory</Title>
            <TableComposable>
              <Thead>
                <Th>Upstream</Th>
                <Th>Trusted</Th>
              </Thead>
              <Tbody>
                {inventory.map((each: any) => {
                  return (
                    <Tr key={each.purl}>
                      <Td>{each.purl}</Td>
                      <Td>{each.trustedVersions[0].purl}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </TableComposable>
          </GridItem>
          <GridItem span={4}>RHS</GridItem>
        </Grid>
      </Main>
    </React.Fragment>
  );
};
export default InventoryPage;

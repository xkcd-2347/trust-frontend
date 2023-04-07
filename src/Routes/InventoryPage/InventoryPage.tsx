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
  TextInput,
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

  const [filter, setFilter] = React.useState<string>('');
  const [filteredInventory, setFilteredInventory] = React.useState<any>([]);

  const doFilter = (input: any) => {
    setFilter(input);
  };

  useEffect(() => {
    setFilteredInventory(
      inventory
        .sort((left: any, right: any) => {
          if (left.purl == right.purl) {
            return 0;
          } else if (left.purl < right.purl) {
            return -1;
          } else {
            return 1;
          }
        })
        .filter((each: any) => {
          return each.purl.includes(filter);
        })
    );
  }, [filter, inventory]);

  //console.log('dependencies: ', dependencies);
  //console.log('dependants: ', dependants);

  console.log('redraw filtered', filteredInventory.length);

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title="Inventory" />
      </PageHeader>
      <Main>
        <Grid>
          <GridItem span={8}>
            <TextInput onChange={doFilter} />
          </GridItem>
          <GridItem span={8}>
            <TableComposable variant="compact">
              <Tbody>
                {filteredInventory.map((each: any) => {
                  return (
                    <Tr key={each.purl}>
                      <Td>
                        <AppLink
                          to={
                            '/package/' +
                            encodeURIComponent(each.trustedVersions[0].purl)
                          }
                        >
                          {each.trustedVersions[0].purl}
                        </AppLink>
                      </Td>
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

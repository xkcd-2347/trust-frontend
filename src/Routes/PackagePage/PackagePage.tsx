import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  Button, Grid, GridItem,
  Spinner,
  Stack,
  StackItem, Tabs, Tab, TabTitleText,
  Title
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

import './package-page.scss';
import AppLink from '../../Components/AppLink';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
const PackagePage = () => {
  const dispatch = useDispatch();

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


  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title="Package" />
        <p> A single Trusted Content Package! </p>
      </PageHeader>
      <Main>
        <Grid>
          <GridItem span={8}>
            <Title headingLevel="h1">Package long name</Title>
            <Grid hasGutter>
              <GridItem span={6}>
                <Title headingLevel="h2">1.0.0</Title>
              </GridItem>
              <GridItem span={6}>
                <Title headingLevel="h3">Published 4 months ago</Title>
              </GridItem>
              <GridItem>
                [link to catalog page]
              </GridItem>
              <GridItem>
                <Tabs
                  activeKey={activeTabKey}
                  onSelect={handleTabClick}
                  isBox={isBox}
                  aria-label="Tabs"
                  role="region"
                >
                  <Tab eventKey={0} title={<TabTitleText>Vulnerabilities</TabTitleText>}>
                    List of vulns
                  </Tab>
                  <Tab eventKey={1} title={<TabTitleText>Dependencies</TabTitleText>}>
                    List of dependencies
                  </Tab>
                  <Tab eventKey={2} title={<TabTitleText>Dependents</TabTitleText>}>
                    List of dependents
                  </Tab>
                  <Tab eventKey={3} title={<TabTitleText>Versions</TabTitleText>}>
                    List of versions
                  </Tab>
                </Tabs>

              </GridItem>
            </Grid>
          </GridItem>
          <GridItem span={4}>
            RHS
          </GridItem>
        </Grid>
      </Main>
    </React.Fragment>
  );
};

export default PackagePage;

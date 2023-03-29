import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  Button, Grid, GridItem,
  Spinner,
  Stack,
  StackItem, Tab, Tabs, TabTitleText,
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

import './vuln-page.scss';
import AppLink from '../../Components/AppLink';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
const VulnPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    insights?.chrome?.appAction?.('sample-page');
  }, []);

  const handleAlert = () => {
    dispatch(
      addNotification({
        variant: 'success',
        title: 'Notification title',
        description: 'notification description',
      })
    );
  };

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title="Vulnerability" />
        <p> A single Vulnerability! </p>
      </PageHeader>
      <Main>
        <Grid>
          <GridItem span={8}>
            <Title headingLevel="h1">Vulnerability long name</Title>
            <Title headingLevel="h2">CVE-867-5309</Title>
            <Grid hasGutter>
              <GridItem span={6}>
                <Title headingLevel="h3">Published 29 Oct, 1973</Title>
              </GridItem>
              <GridItem span={6}>
                <Title headingLevel="h3">Updated 31 Oct, 1992</Title>
              </GridItem>
              <GridItem>
                [link to prodsec CVE/advisory page]
              </GridItem>
              <GridItem>
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

export default VulnPage;

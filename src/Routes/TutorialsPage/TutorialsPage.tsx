import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  Button,
  Spinner,
  Stack,
  StackItem,
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

import './tutorials-page.scss';
import AppLink from '../../Components/AppLink';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
const TutorialsPage = () => {
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
        <PageHeaderTitle title="Tutorials" />
        <p> Tutorial! </p>
      </PageHeader>
      <Main>
        <Stack hasGutter>
          <StackItem>
            <Title headingLevel="h2" size="3xl">
              <AppLink to="tutorial/1">Tutorial 1</AppLink>
            </Title>
          </StackItem>
          <StackItem>
            <Title headingLevel="h2" size="3xl">
              <AppLink to="tutorial/2">Tutorial 2</AppLink>
            </Title>
          </StackItem>
          <StackItem>
            <Title headingLevel="h2" size="3xl">
              <AppLink to="tutorial/3">Tutorial 3</AppLink>
            </Title>
          </StackItem>
        </Stack>
      </Main>
    </React.Fragment>
  );
};

export default TutorialsPage;

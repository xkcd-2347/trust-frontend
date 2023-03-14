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

import './tutorial-page.scss';
import AppLink from '../../Components/AppLink';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
const TutorialPage = () => {
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
        <PageHeaderTitle title="Tutorial" />
        <p> A single tutorial! </p>
      </PageHeader>
      <Main> </Main>
    </React.Fragment>
  );
};

export default TutorialPage;

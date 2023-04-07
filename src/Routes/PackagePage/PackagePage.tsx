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
  Title, Label
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
import {
  loadPackage,
  selectDependants,
  selectDependencies,
  selectPackageDetails,
  setDependants,
  setDependencies,
} from '../../store/package';
import Dependency from '../../Components/Dependency/dependency';
import { useLocation, useParams } from 'react-router-dom';
import Dependant from '../../Components/Dependant/dependant';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
const PackagePage = () => {
  //const purl = 'pkg:maven/io.vertx/vertx-web@4.3.7';
  const { purl } = useParams();
  const dispatch = useDispatch();

  const dependencies = useSelector(selectDependencies);
  const dependants = useSelector(selectDependants);
  const details = useSelector(selectPackageDetails);
  const location = useLocation();

  useEffect(() => {
    console.log('location changed');
    dispatch(loadPackage(purl ?? ''));
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

  let trusted_badge;
  if (details.trusted) {
    trusted_badge = <Label color={'green'}>Trusted</Label>;
  } else {
    trusted_badge = <Label color={'red'}>Not Trusted</Label>;
  }

  console.log('dependencies: ', dependencies);
  console.log('dependants: ', dependants);
  console.log('details', details);

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
            <Title headingLevel="h2">{purl} {trusted_badge}</Title>
            <Grid hasGutter>
              <GridItem span={6}>
                <Title headingLevel="h3">Published 4 months ago</Title>
              </GridItem>
              <GridItem>[link to catalog page]</GridItem>
              <GridItem>
                <Tabs
                  activeKey={activeTabKey}
                  onSelect={handleTabClick}
                  isBox={isBox}
                  aria-label="Tabs"
                  role="region"
                >
                  <Tab
                    eventKey={0}
                    title={<TabTitleText>Vulnerabilities</TabTitleText>}
                  >
                    List of vulns
                  </Tab>
                  <Tab
                    eventKey={1}
                    title={<TabTitleText>Dependencies</TabTitleText>}
                  >
                    {dependencies.map((dep: any) => {
                      return <Dependency purl={dep.purl} href={dep.href} trusted={dep.trusted}/>;
                    })}
                  </Tab>
                  <Tab
                    eventKey={2}
                    title={<TabTitleText>Dependents</TabTitleText>}
                  >
                    {dependants.map((dep: any) => {
                      return <Dependant purl={dep.purl} href={dep.href} />;
                    })}
                  </Tab>
                  <Tab
                    eventKey={3}
                    title={<TabTitleText>Versions</TabTitleText>}
                  >
                    List of versions
                  </Tab>
                </Tabs>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem span={4}>RHS</GridItem>
        </Grid>
      </Main>
    </React.Fragment>
  );
};

export default PackagePage;

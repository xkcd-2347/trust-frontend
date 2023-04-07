import './dependant.scss';
import React from 'react';
import * as H from 'history';
import AppLink from '../AppLink';
import { PackageURL } from 'packageurl-js';
import { Card, CardBody } from '@patternfly/react-core';

export interface DependencyProps {
  purl: string;
  href: string;
}

/**
 * This is a dumb component that only recieves properties from a smart component.
 * Dumb components are usually functions and not classes.
 *
 * @param props the props given by the smart component.
 */
const Dependant: React.VFC<DependencyProps> = (props: DependencyProps) => {
  console.log( "dependent -> ", props.purl);
  const purl = PackageURL.fromString(props.purl);

  return (<Card>
    <CardBody>
      <AppLink to={'/package/' + encodeURIComponent(props.purl)}>{props.purl}</AppLink>
    </CardBody>
  </Card>);
};

Dependant.displayName = 'Dependant';

export default Dependant;

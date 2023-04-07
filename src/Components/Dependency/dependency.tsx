import './dependency.scss';
import React from 'react';
import * as H from 'history';
import AppLink from '../AppLink';
import { Card, CardBody, CodeBlock, Label } from '@patternfly/react-core';
import { PackageURL } from 'packageurl-js';

export interface DependencyProps {
  purl: string;
  href: string;
  trusted?: boolean;
}

/**
 * This is a dumb component that only recieves properties from a smart component.
 * Dumb components are usually functions and not classes.
 *
 * @param props the props given by the smart component.
 */
const Dependency: React.VFC<DependencyProps> = (props: DependencyProps) => {
  console.log( "dependency -> ", props.purl);
  const purl = PackageURL.fromString(props.purl);

  let trusted_badge;
  if (props.trusted) {
    trusted_badge = <Label color={'green'}>Trusted</Label>;
  } else {
    trusted_badge = <span/>
  }

  if (purl.type == 'maven') {
    return (
      <Card>
        <CardBody>
          <AppLink to={'/package/' + encodeURIComponent(props.purl)}>
            {purl.namespace}:{purl.name}:{purl.version}
            {trusted_badge}
            <br/>
            <CodeBlock>
              <pre>
              &lt;dependency&gt;<br/>
                &lt;groupId&gt;{purl.namespace}&lt;/groupId&gt;<br/>
                &lt;artifactId&gt;{purl.namespace}&lt;/artifactId&gt;<br/>
                &lt;version&gt;{purl.version}&lt;/version&gt;<br/>
              &lt;/dependency&gt;<br/>
              </pre>
            </CodeBlock>
          </AppLink>
        </CardBody>
      </Card>
    );
  } else {
    return (
      <Card>
        <CardBody>
          <AppLink to={'/package/' + encodeURIComponent(props.purl)}>
            {props.purl}
          </AppLink>
        </CardBody>
      </Card>
    );
  }
};

Dependency.displayName = 'Dependency';

export default Dependency;

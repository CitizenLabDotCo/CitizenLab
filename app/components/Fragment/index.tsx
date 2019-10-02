import React, { PureComponent } from 'react';
import styled from 'styled-components';
import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';
import { isNilOrError } from 'utils/helperUtils';
import GetFeatureFlag, { GetFeatureFlagChildProps } from 'resources/GetFeatureFlag';
import { adopt } from 'react-adopt';

const StyledIframe = styled.iframe`
  border: 0;
  height: ${props => props.height ? `${props.height}px` : 'auto'};
  width: 100%;
`;

interface DataProps {
  tenant: GetTenantChildProps;
  fragmentsFeatureFlag: GetFeatureFlagChildProps;
}

interface InputProps {
  name: string;
  title?: string;
  children: any;
}

interface Props extends DataProps, InputProps {}

interface State {
  iframeHeight?: number;
}

/**
 * Wrap content in a named fragment to allow the content to be overridden
 * for a specific tenant
*/
class Fragment extends PureComponent<Props, State> {

  iframeNode: HTMLIFrameElement;

  constructor(props) {
    super(props);
    this.state = {
      iframeHeight: undefined
    };
  }

  fragmentUrl = () : string => {
    const { tenant } = this.props;
    if (!isNilOrError(tenant)) {
      return `/fragments/${tenant.id}/${this.props.name}.html`;
    } else {
      return '';
    }
  }

  fragmentActive = () : boolean => {
    const { tenant, fragmentsFeatureFlag } = this.props;
    if (isNilOrError(tenant) || !fragmentsFeatureFlag || !tenant.attributes.settings.fragments) {
      return false;
    } {
      return tenant.attributes.settings.fragments.enabled_fragments.includes(this.props.name);
    }
  }

  setIframeRef = (ref) => {
    this.iframeNode = ref;
  }

  setIframeHeight = () => {
    if (this.iframeNode && this.iframeNode.contentWindow) {
      this.setState({
        iframeHeight: this.iframeNode.contentWindow.document.body.scrollHeight * 1.1,
      });
    }
  }

  render() {
    const { children, title } = this.props;
    const { iframeHeight } = this.state;

    if (this.fragmentActive()) {
      return (
        <StyledIframe
          title={title}
          ref={this.setIframeRef}
          src={this.fragmentUrl()}
          height={iframeHeight}
          onLoad={this.setIframeHeight}
        />
      );
    } else {
      return children;
    }

  }
}

const Data = adopt<DataProps, InputProps>({
  tenant: <GetTenant />,
  fragmentsFeatureFlag: <GetFeatureFlag name="fragments" />
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {(dataProps) => <Fragment {...inputProps} {...dataProps} />}
  </Data>
);

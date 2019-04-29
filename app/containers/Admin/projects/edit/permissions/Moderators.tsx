import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import messages from './messages';
import ModeratorList from './ModeratorList';
import UserSearch from 'components/UserSearch';
import { GetModeratorsChildProps } from 'resources/GetModerators';
import { SubSectionTitle } from 'components/admin/Section';
import InfoTooltip from 'components/admin/InfoTooltip';
import { InjectedIntlProps } from 'react-intl';

interface InputProps {
  projectId: string;
}

interface Props extends InputProps {
  moderators: GetModeratorsChildProps;
}

const Container = styled.div`
  width: 100%;
  margin-bottom: 25px;
`;

const StyledA = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

class Moderators extends PureComponent<Props & InjectedIntlProps>{
  render() {
    const { moderators, projectId } = this.props;

    return (
      <Container>
        <SubSectionTitle>
          <FormattedMessage {...messages.moderatorsSectionTitle} />
          <InfoTooltip
            {...messages.moderatorsSectionTooltip}
            values={{
              moreInfoModeratorLink: (
                <StyledA href={this.props.intl.formatMessage(messages.moreInfoModeratorLink)} target="_blank">
                  <FormattedMessage {...messages.moreInfoModeratorLinkText} />
                </StyledA>)
            }}
          />
        </SubSectionTitle>
        {/* <StyledWarning text={<FormattedMessage {...messages.moderatorsRoleExplanation} />} /> */}
        <UserSearch projectId={projectId} moderators={moderators} />
        <ModeratorList moderators={moderators} projectId={projectId} />
      </Container>
    );
  }
}

const ModeratorsWithIntl = injectIntl(Moderators);

export default ModeratorsWithIntl;

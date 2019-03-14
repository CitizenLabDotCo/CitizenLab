import React, { PureComponent } from 'react';
import { isNilOrError } from 'utils/helperUtils';

// components
import Button from 'components/UI/Button';
import OfficialFeedbackPost from './OfficialFeedbackPost';

// resources
import GetOfficialFeedbacks, { GetOfficialFeedbacksChildProps } from 'resources/GetOfficialFeedbacks';

// styles
import styled from 'styled-components';
import { colors } from 'utils/styleUtils';

// i18n
import messages from './messages';
import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps, FormattedDate } from 'react-intl';
import { adopt } from 'react-adopt';

const FeedbackHeader = styled.div`
  color: ${colors.clRed};
  margin-top: 50px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
`;

const FeedbackTitle = styled.h4`
  margin-bottom: 0;
  font-weight: 500;
`;

const StyledSpan = styled.span`
  font-weight: 500;
`;

const Container = styled.div`
  margin-bottom: 100px;
`;

const LoadMoreButton = styled(Button)`
`;

interface InputProps {
  ideaId: string;
  editingAllowed: boolean | null;
}

interface DataProps {
  officialFeedbacks: GetOfficialFeedbacksChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {
}

interface State {}

class OfficialFeedbackFeed extends PureComponent<Props & InjectedIntlProps, State> {
  render() {
    const { officialFeedbacks, editingAllowed } = this.props;

    if (officialFeedbacks) {
      const { officialFeedbacksList, querying, hasMore, loadingMore, onLoadMore } = officialFeedbacks;

      if (!isNilOrError(officialFeedbacksList) && officialFeedbacksList.data && officialFeedbacksList.data.length > 0) {
        const updateDate = (officialFeedbacksList.data[0].attributes.updated_at || officialFeedbacksList.data[0].attributes.created_at);

        return (
          <Container>
            <FeedbackHeader>
              <FeedbackTitle>
                <FormattedMessage {...messages.officialUpdates} />
              </FeedbackTitle>
                <FormattedMessage
                  {...messages.lastUpdate}
                  values={{ lastUpdateDate: (<StyledSpan><FormattedDate value={updateDate} /></StyledSpan>) }}
                />
            </FeedbackHeader>
            {officialFeedbacksList.data.map(officialFeedbackPost => {
              return (
                <OfficialFeedbackPost
                  key={officialFeedbackPost.id}
                  editingAllowed={editingAllowed}
                  officialFeedbackPost={officialFeedbackPost}
                />
              );
            })}

            {!querying && hasMore &&
              <LoadMoreButton
                onClick={onLoadMore}
                size="1"
                style="secondary-outlined"
                text={<FormattedMessage {...messages.showPreviousUpdates} />}
                processing={loadingMore}
                height="50px"
                icon="showMore"
                iconPos="left"
                textColor={colors.clRed}
                fontWeight="500"
                borderColor="#ccc"
              />
            }
          </Container>
        );
      }
    }

    return null;
  }
}

const Data = adopt<DataProps, InputProps>({
  officialFeedbacks: ({ ideaId, render }) => <GetOfficialFeedbacks ideaId={ideaId}>{render}</GetOfficialFeedbacks>
});

const OfficialFeedbackFeedWithIntl = injectIntl<Props>(OfficialFeedbackFeed);

const WrappedOfficialFeedback = (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <OfficialFeedbackFeedWithIntl {...inputProps} {...dataProps} />}
  </Data>
);

export default WrappedOfficialFeedback;

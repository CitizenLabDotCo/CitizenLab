import React, { memo } from 'react';
import { get } from 'lodash-es';

// components
import SuccessCard from './SuccessCard';
import ContentContainer from 'components/ContentContainer';
import Icon from 'components/UI/Icon';

// style
import styled from 'styled-components';
import { media, colors, fontSizes } from 'utils/styleUtils';

// data
import { adopt } from 'react-adopt';
import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';
import { isNilOrError } from 'utils/helperUtils';

// intl
import messages from './messages';
import { FormattedMessage } from 'utils/cl-intl';

interface InputProps {}
interface DataProps {
  tenant: GetTenantChildProps;
}

interface Props extends InputProps, DataProps {}

const StyledContentContainer: any = styled(ContentContainer)`
  background: ${colors.background};
  padding-top: 80px;
  padding-bottom: 80px;
`;

const SuccessIcon = styled(Icon)`
  color: ${colors.clGreen};
  height: 20px;
  margin-right: 15px;
`;

const SuccessTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${fontSizes.xl}px;
  margin-bottom: 20px;
`;

const StoriesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ShouldBeInitiatives = memo(({ tenant }: Props) => {
  if (isNilOrError(tenant)) return null;
  console.log(get(tenant, 'attributes.settings.initiatives.success_stories'));
  const successStories = get(tenant, 'attributes.settings.initiatives.success_stories');

  if (successStories && successStories.length === 3) {
    return (
      <StyledContentContainer mode="page">
        <SuccessTitle>
          <SuccessIcon name="successStory" />
          <FormattedMessage {...messages.successStoryTitle} />
        </SuccessTitle>
        <StoriesContainer>
          {successStories.map(story => (
            <SuccessCard
              key={story.page_slug}
              location={story.location}
              imageUrl={story.image_url}
              pageSlug={story.page_slug}
            />
          ))}
        </StoriesContainer>
      </StyledContentContainer>
    );
  }
  return null;
});

const Data = adopt<DataProps, InputProps>({
  tenant: <GetTenant />,
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataprops => <ShouldBeInitiatives {...inputProps} {...dataprops} />}
  </Data>
);

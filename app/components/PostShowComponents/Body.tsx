import React, { memo /*, useState */ } from 'react';
import useWindowSize from 'hooks/useWindowSize';

// components
import QuillEditedContent from 'components/UI/QuillEditedContent';

// typings
import { Locale } from 'typings';

// styling
import styled, { useTheme } from 'styled-components';
import { viewportWidths } from 'utils/styleUtils';
import useFeatureFlag from 'hooks/useFeatureFlag';
import PostShowComponentsBody from 'modules/machine_translations/citizen/components/PostShowComponentsBody';

const Container = styled.div``;

interface Props {
  postId: string;
  body: string;
  locale: Locale;
  translateButtonClicked?: boolean;
  className?: string;
  postType: 'idea' | 'initiative';
  color?: string;
}

const Body = memo<Props>(
  ({
    postId,
    body,
    locale,
    translateButtonClicked,
    className,
    postType,
    color,
  }) => {
    const windowSize = useWindowSize();
    const theme: any = useTheme();
    const smallerThanSmallTablet = windowSize
      ? windowSize.windowWidth <= viewportWidths.smallTablet
      : false;

    const isMachineTranslationsEnabled = useFeatureFlag('machine_translations');

    return (
      <Container id={`e2e-${postType}-description`} className={className}>
        <QuillEditedContent
          textColor={color || theme.colorText}
          fontSize={smallerThanSmallTablet ? 'base' : 'large'}
          fontWeight={400}
        >
          <div aria-live="polite">
            {isMachineTranslationsEnabled ? (
              <PostShowComponentsBody
                postId={postId}
                locale={locale}
                postType={postType}
                body={body}
                translateButtonClicked={translateButtonClicked}
              />
            ) : (
              <span dangerouslySetInnerHTML={{ __html: body }} />
            )}
          </div>
        </QuillEditedContent>
      </Container>
    );
  }
);

export default Body;

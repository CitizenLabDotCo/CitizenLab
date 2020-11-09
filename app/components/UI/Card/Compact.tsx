import React, { memo, MouseEvent } from 'react';
import bowser from 'bowser';

// components
import Link from 'utils/cl-router/Link';
import LazyImage from 'components/LazyImage';

// styling
import styled from 'styled-components';
import {
  fontSizes,
  defaultCardStyle,
  defaultCardHoverStyle,
} from 'utils/styleUtils';

// utils
import { truncate } from 'utils/textUtils';

// assets
import placeholderImage from './placeholder.png';

const Container = styled(Link)`
  width: 100%;
  height: 174px;
  margin-bottom: 24px;
  cursor: pointer;
  display: flex;
  padding: 16px;
  align-items: center;
  ${defaultCardStyle};

  &.desktop {
    ${defaultCardHoverStyle};
  }
`;

const ImageWrapper = styled.div`
  width: 142px;
  height: 142px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-top-left-radius: ${(props: any) => props.theme.borderRadius};
  border-top-right-radius: ${(props: any) => props.theme.borderRadius};
  flex-shrink: 0;
`;

const Image = styled(LazyImage)`
  width: 100%;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 142px;
  margin-left: 20px;
`;

const Title = styled.h3<{ title?: string }>`
  color: ${(props) => props.theme.colorText};
  font-size: ${fontSizes.large}px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: normal;
  margin: 0;
  margin-bottom: 10px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
`;

const Body = styled.div`
  flex-grow: 1;
`;

const Footer = styled.footer``;

interface Props {
  to: string;
  imageUrl?: string | null;
  author?: {
    name: string;
    id: string;
  } | null;
  title: JSX.Element | string;
  body?: JSX.Element | string;
  footer?: JSX.Element | string;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

export const Card = ({
  to,
  onClick,
  imageUrl,
  title,
  body,
  footer,
  className,
}: Props) => (
  <Container
    onClick={onClick}
    to={to}
    className={`e2e-card ${className} ${
      !(bowser.mobile || bowser.tablet) ? 'desktop' : 'mobile'
    }`}
  >
    <ImageWrapper>
      {imageUrl ? (
        <Image src={imageUrl} alt="" />
      ) : (
        <Image src={placeholderImage} alt="" />
      )}
    </ImageWrapper>

    <ContentWrapper>
      {typeof title === 'string' ? (
        <Title title={title} className="e2e-card-title">
          {truncate(title, 60)}
        </Title>
      ) : (
        <Title className="e2e-card-title">{title}</Title>
      )}

      <Body>{body}</Body>

      <Footer>{footer}</Footer>
    </ContentWrapper>
  </Container>
);

export default memo<Props>(Card);

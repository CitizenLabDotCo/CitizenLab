import React, { memo } from 'react';

import styled, { withTheme } from 'styled-components';
import { fontSizes, colors, booleanClass, invisibleA11yText, media } from 'utils/styleUtils';
import { FormattedMessage, IMessageInfo } from 'utils/cl-intl';
// tslint:disable-next-line:no-vanilla-formatted-messages
import { Messages, FormattedMessage as OriginalFormattedMessage } from 'react-intl';
import Icon, { IconNames } from 'components/UI/Icon';
import Button from '../Button';
import messages from './messages';

export const FormSection = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 30px 40px;
  color: ${({ theme }) => theme.colorText};
  margin-bottom: 10px;
  max-width: 620px;
  min-width: 560px;
`;

const TitleContainer = styled.div`
  margin-bottom: 30px;
`;

const FormSectionTitleStyled = styled.h2`
  font-size: ${fontSizes.xl}px;
  font-weight: 600;
  line-height: 28px;
`;
const FormSectionSubtitleStyled = styled.p`
  font-size: ${fontSizes.large}px;
  font-weight: 400;
  color: ${colors.label};
  line-height: 21px;
`;

interface FormSectionTitleProps extends IMessageInfo {
  subtitleMessage?: Messages['key'];
}

export const FormSectionTitle = memo(({ message, values, subtitleMessage }: FormSectionTitleProps) => (
  <TitleContainer>
    <FormSectionTitleStyled>
      <FormattedMessage {...message} values={values} />
    </FormSectionTitleStyled>
    {subtitleMessage &&
      <FormSectionSubtitleStyled>
        <FormattedMessage {...subtitleMessage} />
      </FormSectionSubtitleStyled>
    }
  </TitleContainer>
));

const FormLabelStyled: any = styled.label`
  font-size: ${fontSizes.large}px;
  color: ${({ theme }) => theme.colorText};
  font-weight: ${(props) => (props as any).thin ? 400 : 600};
  line-height: 21px;

  &.invisible {
    ${invisibleA11yText}
  }
`;

const FormSubtextStyled = styled.span`
  font-size: ${fontSizes.base}px;
  color: ${colors.label};
  font-weight: 300;
`;

const Spacer = styled.div`
  height: 12px;
`;
const OptionalText = styled.span`
  font-weight: 500;
`;

interface FormLabelGenericProps {
  id?: string;
  htmlFor?: string;
  children?: any;
  hidden?: boolean;
  className?: string;
  thin?: boolean;
  noSpace?: boolean;
  optional?: boolean;
}

interface FormLabelProps extends FormLabelGenericProps {
  labelMessage: Messages['key'];
  labelMessageValues?: OriginalFormattedMessage.Props['values'];
  subtextMessage?: Messages['key'];
  subtextMessageValues?: OriginalFormattedMessage.Props['values'];
}

export const FormLabel = memo(({
  labelMessage,
  labelMessageValues,
  subtextMessage,
  subtextMessageValues,
  id,
  htmlFor,
  children,
  className,
  hidden,
  thin,
  noSpace,
  optional,
}: FormLabelProps) => (
  <FormLabelStyled thin={thin} id={id} className={`${booleanClass(className, className)}${booleanClass(hidden, 'invisible')}`} htmlFor={htmlFor}>
    <FormattedMessage {...labelMessage} values={labelMessageValues} />
    {optional &&
      <OptionalText>
        {' ('}
        <FormattedMessage {...messages.optional} />
        {')'}
      </OptionalText>
    }
    {subtextMessage &&
      <>
        <br/>
        <FormSubtextStyled>
          <FormattedMessage {...subtextMessage} values={subtextMessageValues} />
        </FormSubtextStyled>
      </>
    }
    {!noSpace && <Spacer />}
    {children}
  </FormLabelStyled>
));

interface FormLabelValueProps extends FormLabelGenericProps {
  labelValue: JSX.Element | string;
  subtextValue?: JSX.Element;
}

export const FormLabelValue = memo(({
  labelValue,
  subtextValue,
  id,
  htmlFor,
  className,
  hidden,
  thin,
  noSpace
}: FormLabelValueProps) => (
  <FormLabelStyled thin={thin} id={id} className={`${booleanClass(className, className)}${booleanClass(hidden, 'invisible')}`} htmlFor={htmlFor}>
    {labelValue}
    {subtextValue &&
      <>
        <br/>
        <FormSubtextStyled>
          {subtextValue}
        </FormSubtextStyled>
      </>
    }
    {!noSpace && <Spacer />}
  </FormLabelStyled>
));

interface FormLabelWithIconProps extends FormLabelProps {
  iconName: IconNames;
}

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  width: 16px;
  height: 16px;
  margin-left: 10px;
`;

export const FormLabelWithIcon = memo(({
  labelMessage,
  labelMessageValues,
  subtextMessage,
  subtextMessageValues,
  id,
  htmlFor,
  children,
  className,
  hidden,
  thin,
  noSpace,
  iconName
}: FormLabelWithIconProps) => (
  <FormLabelStyled thin={thin} id={id} className={`${booleanClass(className, className)}${booleanClass(hidden, 'invisible')}`} htmlFor={htmlFor}>
    <LabelContainer>
      <FormattedMessage {...labelMessage} values={labelMessageValues} />
      <StyledIcon name={iconName} />
    </LabelContainer>
    {subtextMessage &&
      <>
        <br/>
        <FormSubtextStyled>
            <FormattedMessage {...subtextMessage} values={subtextMessageValues} />
        </FormSubtextStyled>
      </>
    }
    {!noSpace && <Spacer />}
    {children}
  </FormLabelStyled>
));

interface FormSubmitFooterProps extends IMessageInfo {
  disabled?: boolean;
  processing?: boolean;
  onSubmit: () => void;
  theme: any;
  className?: string;
}

const SubmitFooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  border-top: 1px solid #e8e8e8;
`;

const SubmitFooterInner = styled.div`
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 28px;
  padding-right: 28px;
  padding-top: 12px;
  padding-bottom: 12px;
  background: #fff;

  ${media.smallerThanMaxTablet`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `}

  ${media.smallerThanMinTablet`
    padding: 15px;
  `}
`;

export const FormSubmitFooter = withTheme(memo(({
  message,
  values,
  theme,
  onSubmit,
  className,
  ...otherProps
}: FormSubmitFooterProps) => (
  <SubmitFooterContainer className={className}>
    <SubmitFooterInner>
      <Button
        fontWeight="500"
        padding="13px 22px"
        bgColor={theme.colorMain}
        textColor="#FFF"
        type="submit"
        onClick={onSubmit}
        {...otherProps}
      >
        <FormattedMessage {...message} values={values} />
      </Button>
    </SubmitFooterInner>
  </SubmitFooterContainer>
)));

import React, { memo } from 'react';

import styled from 'styled-components';
import { booleanClass } from 'utils/styleUtils';
import { FormattedMessage } from 'utils/cl-intl';
import Icon, { IconNames } from 'components/UI/Icon';
import { FormLabelProps, FormLabelStyled, FormSubtextStyled } from '.';
import { Spacer } from '../Modal';

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

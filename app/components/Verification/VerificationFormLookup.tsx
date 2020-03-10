import React, { memo, useCallback, useState } from 'react';
import { isEmpty, get } from 'lodash-es';
import { reportError } from 'utils/loggingUtils';
import { API_PATH } from 'containers/App/constants';
import streams from 'utils/streams';
import { isNilOrError } from 'utils/helperUtils';

// components
import Input from 'components/UI/Input';
import Error from 'components/UI/Error';
import IconTooltip from 'components/UI/IconTooltip';
import Collapse from 'components/UI/Collapse';
import { FormContainer, Title, Form, FormField, StyledLabel, LabelTextContainer, Footer, SubmitButton, CancelButton, HelpImage } from './styles';

// hooks
import useAuthUser from 'hooks/useAuthUser';

// services
import { verifyIDLookup } from 'services/verify';

// i18n
import messages from './messages';
import { FormattedMessage } from 'utils/cl-intl';
import T from 'components/T';

// typings
import { IDLookupMethod } from 'services/verificationMethods';

interface Props {
  onCancel: () => void;
  onVerified: () => void;
  showHeader?: boolean;
  className?: string;
  method: IDLookupMethod;
}

const VerificationFormLookup = memo<Props>(({ onCancel, onVerified, showHeader, className, method }) => {

  const authUser = useAuthUser();

  const [cardId, setCardId] = useState<string>('');
  const [cardIdError, setCardIdError] = useState<JSX.Element | null>(null);
  const [formError, setFormError] = useState<JSX.Element | null>(null);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  const inModal = !window.location.pathname.endsWith('/sign-up');

  const onCardIdChange = useCallback((cardId: string) => {
    setCardIdError(null);
    setCardId(cardId);
  }, []);

  const onSubmit = useCallback(async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let hasEmptyFields = false;

    // first reset the errors
    setCardIdError(null);
    setFormError(null);

    if (isEmpty(cardId)) {
      setCardIdError(<FormattedMessage {...messages.emptyFieldError} />);
      hasEmptyFields = true;
    }

    if (!hasEmptyFields) {
      try {
        await verifyIDLookup(cardId);

        const endpointsToRefetch = [`${API_PATH}/users/me`, `${API_PATH}/projects`];
        const partialEndpointsToRefetch = [`${API_PATH}/projects/`, `${API_PATH}/ideas/`];

        if (!isNilOrError(authUser)) {
          endpointsToRefetch.push(`${API_PATH}/users/${authUser.data.id}`);
        }

        await streams.fetchAllWith({
          apiEndpoint: endpointsToRefetch,
          partialApiEndpoint: partialEndpointsToRefetch
        });

        onVerified();
      } catch (error) {

        if (get(error, 'json.errors.base[0].error') === 'taken') {
          setFormError(<FormattedMessage {...messages.takenFormError} />);
        } else if (get(error, 'json.errors.base[0].error') === 'no_match') {
          setFormError(<FormattedMessage {...messages.noMatchFormError} />);
        } else if (get(error, 'json.errors.cardId[0].error') === 'invalid') {
          setCardIdError(<FormattedMessage {...messages.invalidCardIdError} />);
        } else {
          reportError(error);
          setFormError(<FormattedMessage {...messages.somethingWentWrongError} />);
        }
      }
    }

  }, [cardId, authUser]);

  const onCancelButtonClicked = useCallback(() => {
    onCancel();
  }, []);

  const onToggleHelpButtonClick = useCallback(() => {
    setShowHelp(showHelp => !showHelp);
  }, []);

  return (
    <FormContainer className={className} inModal={inModal}>
      {showHeader &&
        <Title>
          <strong><FormattedMessage {...messages.verifyYourIdentity} /></strong>
        </Title>
      }

      <Form inModal={inModal}>
        <FormField>
          <StyledLabel htmlFor="cardId">
            <LabelTextContainer>
              <T value={method.attributes.card_id_multiloc} />
              <IconTooltip maxTooltipWidth={200} content={<T value={method.attributes.card_id_tooltip_multiloc} />} />
            </LabelTextContainer>
              <Input
                id="cardId"
                type="text"
                placeholder={method.attributes.card_id_placeholder}
                onChange={onCardIdChange}
                value={cardId}
                error={cardIdError}
              />
          </StyledLabel>
          <Collapse
            opened={showHelp}
            onToggle={onToggleHelpButtonClick}
            label={<FormattedMessage {...messages.showCOWHelp} />}
          >
            <HelpImage src={method.attributes.explainer_image_url} alt="help" />
          </Collapse>
        </FormField>

        {formError &&
          <Error text={formError} />
        }

        <Footer>
          <SubmitButton onClick={onSubmit}>
            <FormattedMessage {...messages.submit} />
          </SubmitButton>
          <CancelButton onClick={onCancelButtonClicked} buttonStyle="secondary">
            <FormattedMessage {...messages.cancel} />
          </CancelButton>
        </Footer>
      </Form>
    </FormContainer>
  );
});

export default VerificationFormLookup;

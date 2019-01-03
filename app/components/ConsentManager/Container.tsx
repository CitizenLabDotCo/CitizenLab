import React, { PureComponent } from 'react';
import { Subscription } from 'rxjs';

// Events
import eventEmitter from 'utils/eventEmitter';

// Components
import Banner from './Banner';
import PreferencesDialog from './PreferencesDialog';
import CancelDialog from './CancelDialog';
import Modal from 'components/UI/Modal';
import Button from 'components/UI/Button';

import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from './messages';

import { ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES } from './categories';

import { IDestination, CustomPreferences } from './';

import styled from 'styled-components';
import { colors } from 'utils/styleUtils';
import { darken } from 'polished';

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  button {
    margin : 4px;
  }
  Button.button.primary-inverse span {
    color: ${colors.adminTextColor}
  }
  Button.button.primary:not(.disabled) {
    background-color: ${colors.adminTextColor};
    &:hover, &:focus {
      background-color: ${darken(0.1, colors.adminTextColor)};
    }
  }
`;

interface Props {
  setPreferences: Function;
  resetPreferences: () => void;
  saveConsent: () => void;
  destinations: IDestination[];
  newDestinations: IDestination[];
  preferences: CustomPreferences;
  isConsentRequired: boolean;
  implyConsentOnInteraction: boolean;
}

interface State {
  isDialogOpen: boolean;
  isCancelling: boolean;
}

class Container extends PureComponent<Props & InjectedIntlProps, State> {
  subscriptions: Subscription[] = [];

  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      isCancelling: false
    };
  }
  componentDidMount() {
    this.subscriptions = [
      eventEmitter.observeEvent('openConsentManager').subscribe(this.openDialog)
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  openDialog = () => {
    this.setState({
      isDialogOpen: true
    });
  }

  closeDialog = () => {
    this.setState({
      isDialogOpen: false
    });
  }

  handleBannerAccept = () => {
    const { saveConsent } = this.props;

    saveConsent();
  }

  handleCategoryChange = (category, value) => {
    const { setPreferences } = this.props;

    setPreferences({
      [category]: value
    });
  }

  handleSave = (categoryDestinations) => (e) => {
    e.preventDefault();

    if (!this.validate(categoryDestinations)) {
      return;
    }

    const { saveConsent } = this.props;

    this.setState({
      isDialogOpen: false
    });
    saveConsent();
  }

  handleCancel = () => {
    const { resetPreferences, newDestinations, preferences } = this.props;

    const isEmpty = Object.keys(preferences).every(e => preferences[e] === null);

    // Only show the cancel confirmation if there's unconsented destinations...
    // or if the user made a choice
    if (newDestinations.length > 0 && !isEmpty) {
      this.setState({
        isCancelling: true
      });
    } else {
      this.setState({
        isDialogOpen: false
      });
      resetPreferences();
    }
  }

  handleCancelBack = () => {
    this.setState({
      isCancelling: false
    });
  }

  handleCancelConfirm = () => {
    const { resetPreferences } = this.props;

    this.setState({
      isCancelling: false,
      isDialogOpen: false
    });
    resetPreferences();
  }

  validate = (categoryDestinations) => {
    let res = true;
    for (const category of Object.keys(categoryDestinations)) {
      if (categoryDestinations[category].length > 0) {
        res = res && !(this.props[category] === null);
      }
    }
    return res;
  }

  render() {
    const {
      destinations,
      newDestinations,
      preferences,
      isConsentRequired,
      intl,
    } = this.props;
    const { isDialogOpen, isCancelling } = this.state;
    const categoryDestinations = {
      analytics: [] as IDestination[],
      advertising: [] as IDestination[],
      functional: [] as IDestination[],
    };

    for (const destination of destinations) {
      if (ADVERTISING_CATEGORIES.find(c => c === destination.category)) {
        categoryDestinations.advertising.push(destination);
      } else if (FUNCTIONAL_CATEGORIES.find(c => c === destination.category)) {
        categoryDestinations.functional.push(destination);
      } else {
        // Fallback to analytics
        categoryDestinations.analytics.push(destination);
      }
    }

    return (
      <>
        <Modal
          opened={isDialogOpen}
          close={this.closeDialog}
          label={intl.formatMessage(messages.modalLabel)}
          fixedHeight={false}
          header={<FormattedMessage {...messages.title} tagName="h1" />}
          footer={<ButtonContainer>
            <Button onClick={this.handleCancel} style="primary-inverse">
              <FormattedMessage {...messages.cancel} />
            </Button>
            <Button
              onClick={this.handleSave(categoryDestinations)}
              style="primary"
            >
              <FormattedMessage  {...messages.save} />
            </Button>
          </ButtonContainer>}
        >
          {!isCancelling &&
            <PreferencesDialog
              onChange={this.handleCategoryChange}
              categoryDestinations={categoryDestinations}
              analytics={preferences.analytics}
              advertising={preferences.advertising}
              functional={preferences.functional}
            />
          }
          {isCancelling &&
            <CancelDialog
              onCancelConfirm={this.handleCancelConfirm}
              onCancelBack={this.handleCancelBack}
            />
          }
        </Modal>
        {isConsentRequired && newDestinations.length > 0 && (
          <Banner
            onAccept={this.handleBannerAccept}
            onChangePreferences={this.openDialog}
          />
        )}
      </>
    );
  }
}

export default injectIntl(Container);

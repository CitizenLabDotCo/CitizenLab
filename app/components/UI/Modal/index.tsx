import React from 'react';
import ReactDOM from 'react-dom';
import { isFunction, isBoolean, isString } from 'lodash-es';
import clHistory from 'utils/cl-router/history';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import FocusTrap from 'focus-trap-react';

// components
import Icon from 'components/UI/Icon';
import clickOutside from 'utils/containers/clickOutside';

// animations
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

// Translation
import messages from './messages';
import { FormattedMessage } from 'utils/cl-intl';

// analytics
import { injectTracks } from 'utils/analytics';
import tracks from './tracks';

// style
import styled from 'styled-components';
import { media, colors, fontSizes } from 'utils/styleUtils';
import { hideVisually } from 'polished';

const timeout = 400;
const easing = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

const ModalContent = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
`;

const CloseIcon = styled(Icon)`
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  fill: ${colors.mediumGrey};

  ${media.smallerThanMinTablet`
    flex: 0 0 18px;
    width: 18px;
    height: 18px;
  `}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;

  &:hover,
  &:focus,
  &:active {
    ${CloseIcon} {
      fill: #000;
    }
  }

  ${media.smallerThanMinTablet`
    height: 18px;
    width: 18px;
  `}
`;

const HiddenSpan = styled.span`${hideVisually()}`;

const ModalContainer: any = styled(clickOutside)`
  width: 100%;
  max-width: ${(props: any) => props.width};
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  outline: none;
  overflow: hidden;
  padding: ${(props: any) => props.hasHeaderOrFooter ? 0 : '40px'};
  position: relative;

  &.fixedHeight {
    height: 600px;
  }

  ${media.smallerThanMaxTablet`
    &.fixedHeight {
      height: 80vh;
    }

    ${media.smallerThanMinTablet`
      width: 85vw;
      max-height: 85vh;
    `}
  `}
`;

const Overlay = styled(FocusTrap)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background: rgba(0, 0, 0, 0.75);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  overflow: hidden;
  z-index: 1000000;
  will-change: opacity, transform;

  ${media.smallerThanMaxTablet`
    padding: 0;
    /* height: calc(100vh - ${props => props.theme.mobileMenuHeight}px); */
    /* bottom: auto; */
  `}

  &.modal-enter {
    opacity: 0;

    ${ModalContainer} {
      opacity: 0;
      transform: translateY(-40px);
    }

    &.modal-enter-active {
      opacity: 1;
      transition: opacity ${timeout}ms ${easing};

      ${ModalContainer} {
        opacity: 1;
        transform: translateY(0px);
        transition: opacity ${timeout}ms ${easing},
                    transform ${timeout}ms ${easing};
      }
    }
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: solid 1px ${colors.separation};
  background: #fff;

  ${media.smallerThanMinTablet`
    padding-left: 20px;
    padding-right: 20px;
  `}
`;

const HeaderTitle = styled.h1`
  color: ${colors.text};
  font-size: ${fontSizes.xxl}px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  margin-right: 45px;
  padding: 0;

  ${media.smallerThanMinTablet`
    font-size: ${fontSizes.xl}px;
    margin-right: 35px;
  `}
`;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-top: solid 1px ${colors.separation};
  background: #fff;
`;

const Skip = styled.div`
  color: #fff;
  font-size: ${fontSizes.base}px;
  text-align: center;
  text-decoration: underline;
  margin-top: 15px;
  cursor: pointer;

  ${media.smallerThanMaxTablet`
    display: none;
  `}
`;

export const Spacer = styled.div`
  flex: 1;
`;

interface ITracks {
  clickCloseButton: () => void;
  clickOutsideModal: () => void;
  clickBack: () => void;
}

type Props = {
  opened: boolean;
  fixedHeight?: boolean | undefined;
  width?: string | undefined;
  close: () => void;
  className?: string;
  header?: JSX.Element;
  footer?: JSX.Element;
  hasSkipButton?: boolean;
  skipText?: JSX.Element;
  label?: string;
};

type State = {};

class Modal extends React.PureComponent<Props & ITracks, State> {
  private unlisten: Function | null;
  private goBackUrl: string | null;
  private el: HTMLDivElement;
  private ModalPortal = document.getElementById('modal-portal');
  private ModalContentElement: HTMLDivElement | null;
  private ModalCloseButton: HTMLButtonElement | null;

  constructor(props: Props & ITracks) {
    super(props);
    this.unlisten = null;
    this.goBackUrl = null;
    this.el = document.createElement('div');
    this.ModalContentElement = null;
  }

  componentDidMount() {
    if (!this.ModalPortal) {
      console.log('There was no Portal to insert the modal. Please make sure you have a Portal root');
    } else {
      this.ModalPortal.appendChild(this.el);
    }

    if (this.props.opened) {
      this.openModal();
    }
  }

  componentWillUnmount() {
    if (this.props.opened) {
      this.cleanup();
    }

    if (!this.ModalPortal) {
      console.log('There was no Portal to insert the modal. Please make sure you have a Portal root');
    } else {
      this.ModalPortal.removeChild(this.el);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.opened && this.props.opened) {
      this.openModal();
    } else if (prevProps.opened && !this.props.opened) {
      this.cleanup();
    }
  }

  openModal = () => {
    this.goBackUrl = window.location.href;

    window.addEventListener('popstate', this.handlePopstateEvent);
    disableBodyScroll(this.ModalContentElement);

    this.unlisten = clHistory.listen(this.props.close);

    if (this.ModalCloseButton) {
      this.ModalCloseButton.focus();
    }
  }

  manuallyCloseModal = () => {
    this.props.close();
  }

  handlePopstateEvent = () => {
    if (location.href === this.goBackUrl) {
      this.props.clickBack();
    }

    this.props.close();
  }

  cleanup = () => {
    this.goBackUrl = null;
    window.removeEventListener('popstate', this.handlePopstateEvent);
    enableBodyScroll(this.ModalContentElement);

    if (isFunction(this.unlisten)) {
      this.unlisten();
    }
  }

  clickOutsideModal = () => {
    this.props.clickOutsideModal();
    this.manuallyCloseModal();
  }

  clickCloseButton = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.clickCloseButton();
    this.manuallyCloseModal();
  }

  setCloseButtonRef = (element: HTMLButtonElement) => {
    this.ModalCloseButton = (element || null);
  }
  setContentRef = (element: HTMLDivElement) => {
    this.ModalContentElement = (element || null);
  }

  onOpen = () => {
    this.setState({ isOpen: true }, () => {
      if (this.ModalCloseButton) {
        this.ModalCloseButton.focus();
      }
    });
  }

  render() {
    let { fixedHeight, width } = this.props;
    const { children, opened, header, footer, hasSkipButton, skipText, label } = this.props;

    fixedHeight = (isBoolean(fixedHeight) ? fixedHeight : true);
    width = (isString(width) ? width : '650px');

    const element = (opened ? (
      <CSSTransition
        classNames="modal"
        in={opened}
        timeout={timeout}
        mountOnEnter={true}
        unmountOnExit={true}
        exit={false}
      >
        <Overlay
          id="e2e-modal-container"
          className={this.props.className}
          aria-modal="true"
          role="dialog"
          aria-label={label}
        >
          <ModalContainer
            className={`modalcontent ${fixedHeight && 'fixedHeight'}`}
            width={width}
            onClickOutside={this.clickOutsideModal}
            hasHeaderOrFooter={header !== undefined || footer !== undefined}
          >
            <CloseButton
              className="e2e-modal-close-button"
              onClick={this.clickCloseButton}
              innerRef={this.setCloseButtonRef}
            >
              <HiddenSpan>
                <FormattedMessage {...messages.closeButtonLabel} />
              </HiddenSpan>
              <CloseIcon name="close3" />
            </CloseButton >

            {header &&
              <HeaderContainer>
                <HeaderTitle>{header}</HeaderTitle>
              </HeaderContainer>
            }

            <ModalContent
              innerRef={this.setContentRef}
            >
              {children}
            </ModalContent>
            <Spacer />

            {footer && <FooterContainer>{footer}</FooterContainer>}

            {hasSkipButton && skipText &&
              <Skip onClick={this.clickCloseButton}>{skipText}</Skip>
            }
          </ModalContainer>
        </Overlay>
      </CSSTransition>
    ) : undefined);

    return ReactDOM.createPortal(
      <TransitionGroup
        tabIndex="-1"
        component="aside"
      >
        {element}
      </TransitionGroup>,
      document.body
    );
  }
}

const WrappedModal = injectTracks<Props>(tracks)(Modal);
WrappedModal.displayName = 'ModalWithTracks';

export default WrappedModal;

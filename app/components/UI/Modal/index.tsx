import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import clHistory from 'utils/cl-router/history';
import eventEmitter from 'utils/eventEmitter';
import { FocusOn } from 'react-focus-on';
import bowser from 'bowser';

// i18n
import messages from './messages';
import { FormattedMessage } from 'utils/cl-intl';

// components
import Icon from 'components/UI/Icon';
import clickOutside from 'utils/containers/clickOutside';

// animations
import CSSTransition from 'react-transition-group/CSSTransition';

// analytics
import { trackEventByName } from 'utils/analytics';
import tracks from './tracks';

// style
import styled from 'styled-components';
import { media, colors, fontSizes } from 'utils/styleUtils';

const timeout = 400;
const easing = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

const ModalContent = styled.div<{ hasHeaderOrFooter: boolean }>`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding: ${({ hasHeaderOrFooter }) => hasHeaderOrFooter ? 0 : '40px'};

  ${media.smallerThanMinTablet`
    padding: ${({ hasHeaderOrFooter }) => hasHeaderOrFooter ? 0 : '20px'};
  `}
`;

const CloseIcon = styled(Icon)`
  width: 17px;
  height: 17px;
  fill: ${colors.label};
  transition: all 100ms ease-out;

  ${media.smallerThanMinTablet`
    width: 15px;
    height: 15px;
  `}
`;

const CloseButton = styled.button`
  width: 31px;
  height: 31px;
  position: absolute;
  top: 21px;
  right: 27px;
  cursor: pointer;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  &:hover {
    ${CloseIcon} {
      fill: #000;
    }
  }

  ${media.smallerThanMinTablet`
    top: 12px;
    right: 11px;
  `}
`;

const ModalContainer = styled(clickOutside)`
  width: 100%;
  max-height: 80vh;
  margin-top: 60px;
  background: #fff;
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  flex-direction: column;
  outline: none;
  overflow: hidden;
  padding: 0px;
  position: relative;

  &.fixedHeight {
    height: 100%;
    max-height: 600px;
  }

  @media (min-height: 1200px) {
    margin-top: 120px;
  }

  ${media.smallerThanMinTablet`
    margin-top: 40px;
    padding: 0px;

    &.fixedHeight {
      height: auto;
      max-height: 85vh;
    }
  `}
`;

const StyledFocusOn = styled(FocusOn)<{ width: number }>`
  width: 100%;
  max-width: ${({ width }) => width}px;
  height: 100vh;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.75);
  padding-left: 30px;
  padding-right: 30px;
  overflow: hidden;
  z-index: 1000001;
  will-change: opacity, transform;

  ${media.biggerThanMinTablet`
    justify-content: center;
  `}

  ${media.smallerThanMinTablet`
    padding-left: 12px;
    padding-right: 12px;
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
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: solid 1px ${colors.separation};
  background: #fff;

  ${media.smallerThanMinTablet`
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    padding-right: 20px;
  `}
`;

const HeaderTitle = styled.h1`
  width: 100%;
  color: ${colors.text};
  font-size: ${fontSizes.xxl}px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  margin-right: 45px;
  padding: 0;

  ${media.smallerThanMinTablet`
    font-size: ${fontSizes.large}px;
    margin-right: 35px;
  `}
`;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-top: solid 1px ${colors.separation};
  background: #fff;

  ${media.smallerThanMinTablet`
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
  `}
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

const Spacer = styled.div`
  flex: 1;
`;

export type Props = {
  opened: boolean;
  fixedHeight?: boolean;
  width?: number;
  close: () => void;
  className?: string;
  /*
    If you don't provide a header, you can give the header/title
    an id="modal-header". See VerificationMethods component for an example
  */
  header?: JSX.Element | string;
  footer?: JSX.Element;
  hasSkipButton?: boolean;
  skipText?: JSX.Element;
  children?: any;
  closeOnClickOutside?: boolean;
};

type State = {};

export default class Modal extends PureComponent<Props, State> {
  unlisten: null | (() => void);

  static defaultProps = {
    fixedHeight: false,
    width: 650
  };

  constructor(props: Props) {
    super(props);
    this.unlisten = null;
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.opened && this.props.opened) {
      this.openModal();
    } else if (prevProps.opened && !this.props.opened) {
      this.cleanup();
    }
  }

  componentWillUnmount() {
    this.cleanup();
  }

  openModal = () => {
    window.addEventListener('popstate', this.handlePopstateEvent);
    window.addEventListener('keydown', this.handleKeypress);
    eventEmitter.emit('modal', 'modalOpened', null);
    this.unlisten = clHistory.listen(() => this.props.close());
  }

  manuallyCloseModal = () => {
    this.props.close();
    eventEmitter.emit('modal', 'modalClosed', null);
  }

  handlePopstateEvent = () => {
    this.props.close();
  }

  handleKeypress = (event) => {
    if (event.type === 'keydown' && event.key === 'Escape') {
      event.preventDefault();
      this.props.close();
    }
  }

  cleanup = () => {
    window.removeEventListener('popstate', this.handlePopstateEvent);
    window.removeEventListener('keydown', this.handleKeypress);
    this.unlisten && this.unlisten();
    this.unlisten = null;
  }

  clickOutsideModal = () => {
    if (this.props.closeOnClickOutside !== false) {
      trackEventByName(tracks.clickOutsideModal);
      this.manuallyCloseModal();
    }
  }

  clickCloseButton = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    event.stopPropagation();
    trackEventByName(tracks.clickCloseButton);
    this.manuallyCloseModal();
  }

  setCloseButtonRef = (element: HTMLButtonElement) => {
    // remove focus on close button after modal has opened
    setTimeout(() => element && element.blur(), 80);
  }

  removeFocus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  render() {
    const { width, children, opened, header, footer, hasSkipButton, skipText } = this.props;
    const hasFixedHeight = this.props.fixedHeight || bowser.msie;
    const hasHeaderOrFooter = header !== undefined || footer !== undefined;
    const modalPortalElement = document?.getElementById('modal-portal');

    if (modalPortalElement) {
      return ReactDOM.createPortal((
        <CSSTransition
          classNames="modal"
          in={opened}
          timeout={timeout}
          mountOnEnter={true}
          unmountOnExit={true}
          enter={true}
          exit={false}
        >
          <Overlay
            id="e2e-modal-container"
            className={this.props.className}
          >
            <StyledFocusOn
              width={width as number}
              autoFocus={true}
            >
              <ModalContainer
                className={`modalcontent ${hasFixedHeight ? 'fixedHeight' : ''}`}
                onClickOutside={this.clickOutsideModal}
                ariaLabelledBy="modal-header"
                aria-modal="true"
                role="dialog"
              >
                <CloseButton
                  className="e2e-modal-close-button"
                  onMouseDown={this.removeFocus}
                  onClick={this.clickCloseButton}
                  ref={this.setCloseButtonRef}
                >
                  <CloseIcon title={<FormattedMessage {...messages.closeModal} />} name="close" />
                </CloseButton >

                {header &&
                  <HeaderContainer>
                    <HeaderTitle id="modal-header">{header}</HeaderTitle>
                  </HeaderContainer>
                }

                <ModalContent hasHeaderOrFooter={hasHeaderOrFooter}>
                  {children}
                </ModalContent>

                <Spacer aria-hidden />

                {footer && <FooterContainer>{footer}</FooterContainer>}

                {hasSkipButton && skipText &&
                  <Skip onClick={this.clickCloseButton}>{skipText}</Skip>
                }
              </ModalContainer>
            </StyledFocusOn>
          </Overlay>
        </CSSTransition>
      ), modalPortalElement);
    }

    return null;
  }
}

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import clHistory from 'utils/cl-router/history';
import eventEmitter from 'utils/eventEmitter';
import { FocusOn } from 'react-focus-on';

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
import { media, colors, fontSizes, customOutline, boxShadowOutline } from 'utils/styleUtils';

const timeout = 400;
const easing = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

export const ModalContent = styled.div<{ noPadding?: boolean | undefined }>`
  flex: 1 1 auto;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding: ${({ noPadding }) => noPadding ? 0 : '30px'};

  ${media.smallerThanMinTablet`
    padding: ${({ noPadding }) => noPadding ? 0 : '20px'};
  `}
`;

const CloseButton = styled.button`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 20px;
  right: 25px;
  cursor: pointer;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border-radius: 50%;
  background: #fff;
  transition: all 100ms ease-out;
  outline: none;

  &:hover {
    background: #ececec;
  }

  &.focus-visible {
    ${boxShadowOutline};
  }

  ${media.smallerThanMinTablet`
    top: 13px;
    right: 15px;
  `}
`;

const CloseIcon = styled(Icon)`
  width: 12px;
  height: 12px;
  fill: #000;
`;

const StyledFocusOn = styled(FocusOn)<{ width: number }>`
  width: 100%;
  max-width: ${({ width }) => width}px;
  display: flex;
`;

const ModalContainer = styled(clickOutside)`
  width: 100%;
  max-height: 85vh;
  margin-top: 55px;
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

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-start;
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

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-right: 45px;
  border-bottom: solid 1px #e0e0e0;
  background: #fff;

  ${media.smallerThanMinTablet`
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    padding-right: 20px;
  `}
`;

export const HeaderTitle = styled.h1`
  width: 100%;
  color: ${colors.text};
  font-size: ${fontSizes.xl}px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  padding: 0;
`;

export const HeaderSubtitle = styled.h2`
  width: 100%;
  color: ${colors.text};
  font-size: ${fontSizes.base}px;
  font-weight: 300;
  line-height: normal;
  margin: 0;
  margin-top: 5px;
  padding: 0;
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

export type Props = {
  opened: boolean;
  fixedHeight?: boolean;
  width?: number;
  close: () => void;
  className?: string;
  header?: JSX.Element | string;
  footer?: JSX.Element;
  hasSkipButton?: boolean;
  skipText?: JSX.Element;
  noPadding?: boolean;
  noClose?: boolean;
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
    eventEmitter.emit('modalOpened');
    this.unlisten = clHistory.listen(() => this.closeModal());
  }

  closeModal = () => {
    if (!this.props.noClose) {
      this.props.close();
    }
  }

  handlePopstateEvent = () => {
    this.closeModal();
  }

  handleKeypress = (event) => {
    if (event.type === 'keydown' && event.key === 'Escape') {
      event.preventDefault();
      this.closeModal();
    }
  }

  cleanup = () => {
    window.removeEventListener('popstate', this.handlePopstateEvent);
    window.removeEventListener('keydown', this.handleKeypress);
    eventEmitter.emit('modalClosed');
    this.unlisten && this.unlisten();
    this.unlisten = null;
  }

  clickOutsideModal = () => {
    if (this.props.closeOnClickOutside !== false) {
      trackEventByName(tracks.clickOutsideModal);
      this.closeModal();
    }
  }

  clickCloseButton = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    event.stopPropagation();
    trackEventByName(tracks.clickCloseButton);
    this.closeModal();
  }

  removeFocus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  render() {
    const { width, children, opened, header, footer, hasSkipButton, skipText, noClose } = this.props;
    const hasFixedHeight = this.props.fixedHeight;
    const noPadding = header !== undefined || footer !== undefined || this.props.noPadding;
    const modalPortalElement = document?.getElementById('modal-portal');

    if (modalPortalElement && width) {
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
            <StyledFocusOn width={width}>
              <ModalContainer
                className={`modalcontent ${hasFixedHeight ? 'fixedHeight' : ''}`}
                onClickOutside={this.clickOutsideModal}
                ariaLabelledBy="modal-header"
                aria-modal="true"
                role="dialog"
              >
                {!noClose &&
                  <CloseButton
                    className="e2e-modal-close-button"
                    onMouseDown={this.removeFocus}
                    onClick={this.clickCloseButton}
                  >
                    <CloseIcon title={<FormattedMessage {...messages.closeModal} />} name="close" />
                  </CloseButton >
                }

                {header &&
                  <HeaderContainer>
                    <HeaderTitle id="modal-header">{header}</HeaderTitle>
                  </HeaderContainer>
                }

                <ModalContent noPadding={noPadding}>
                  {children}
                </ModalContent>

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

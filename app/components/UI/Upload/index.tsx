import * as React from 'react';
import * as Dropzone from 'react-dropzone';
import * as _ from 'lodash';
import { media } from 'utils/styleUtils';
import { darken } from 'polished';
import Icon from 'components/UI/Icon';
import Error from 'components/UI/Error';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import styled from 'styled-components';

const UploadIcon = styled.div`
  height: 40px;
  margin-top: 5px;
  margin-bottom: 5px;

  svg {
    fill: #aaa;
  }
`;

const UploadMessage: any = styled.span`
  max-width: 80%;
  color: #aaa;
  font-size: 17px;
  line-height: 24px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 5px;
`;

const StyledDropzone = styled(Dropzone)`
  width: 100%;
  min-height: 140px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  border-color: #999;
  border-width: 1.5px; 
  border-style: dashed;
  padding: 20px;
  padding-bottom: 0px;
  position: relative;
  background: #fff;

  ${media.smallPhone`
    flex-direction: column;
  `}
`;

const StyledDropzoneWrapper: any = styled.div`
  &:not(.disabled) ${StyledDropzone} {
    cursor: pointer;
  }

  &.disabled ${StyledDropzone} {
    cursor: default;
  }

  &:not(.disabled):hover,
  &:not(.disabled).dropzoneActive {
    ${StyledDropzone} {
      border-color: #000;
    }

    ${UploadIcon} {
      svg {
        fill: #000;
      }
    }

    ${UploadMessage} {
      color: #000;
    }
  }
`;

const UploadMessageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const UploadedItem = styled.div`
  margin-right: 0px;
  margin-bottom: 20px;
  border: solid 1px #ccc;
  border-radius: 5px;
  position: relative;
  background-size: cover;

  ${media.notPhone`
    width: calc(33% - 13px);
    height: 130px;

    &:not(:nth-child(3n)) {
      margin-right: 20px;
    }
  `}

  ${media.phone`
    width: calc(50% - 10px);
    height: 130px;

    &:not(:nth-child(2n)) {
      margin-right: 20px;
    }
  `}

  ${media.smallPhone`
    width: 100%;
  `}
`;

const RemoveUploadedItem = styled.div`
  width: 28px;
  height: 28px;
  position: absolute;
  top: -11px;
  right: -11px;
  z-index: 1;
  padding: 2px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;

  &:hover svg {
    fill: ${props => darken(0.2, (props.theme.color.main || '#000'))};
  }

  svg {
    fill: ${props => props.theme.color.main || '#777'};
  }
`;

type Props = {
  intl: ReactIntl.InjectedIntl;
  items: Dropzone.ImageFile[];
  accept?: string | null | undefined;
  maxSize: number;
  maxItems: number;
  placeholder?: string | null | undefined;
  destroyPreview?: boolean;
  onAdd: (arg: Dropzone.ImageFile) => void;
  onRemove: (arg: Dropzone.ImageFile) => void;
};

type State = {
  errorMessage: string | null;
  dropzoneActive: boolean;
  disabled: boolean;
};

export class Upload extends React.PureComponent<Props, State> {
  private emptyArray: never[];

  constructor() {
    super();
    this.emptyArray = [];
    this.state = {
      errorMessage: null,
      dropzoneActive: false,
      disabled: false
    };
  }

  componentWillUnmount() {
    if (this.props.destroyPreview === true || this.props.destroyPreview === undefined) {
      _(this.props.items).filter(item => item.preview).forEach(item => this.destroyPreview(item));
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { items, maxItems } = this.props;

    if (maxItems && _.size(nextProps.items) >= maxItems) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  }

  onDrop = (items: Dropzone.ImageFile[]) => {
    const { formatMessage } = this.props.intl;
    const maxItemsCount = this.props.maxItems;
    const oldItemsCount = _.size(this.props.items);
    const newItemsCount = _.size(items);
    const remainingItemsCount = maxItemsCount - oldItemsCount;

    this.setState({ errorMessage: null, dropzoneActive: false });

    if (!this.state.disabled) {
      if (maxItemsCount && newItemsCount > remainingItemsCount) {
        const errorMessage = (maxItemsCount === 1 ? formatMessage(messages.onlyOneImage) : formatMessage(messages.onlyXImages, { maxItemsCount }));
        this.setState({ errorMessage });
        setTimeout(() => this.setState({ errorMessage: null }), 6000);
      } else {
        items.forEach(item => this.props.onAdd(item));
      }
    } else {
      const errorMessage = formatMessage(messages.limitReached);
      this.setState({ errorMessage });
      setTimeout(() => this.setState({ errorMessage: null }), 6000);
    }
  }

  onDragEnter = () => {
    this.setState(state => ({ dropzoneActive: (!state.disabled && true) || false }));
  }

  onDragLeave = () => {
    this.setState({ dropzoneActive: false });
  }

  onDropRejected = (items: Dropzone.ImageFile[]) => {
    const { maxSize, intl } = this.props;
    const { formatMessage } = intl;

    if (items.some(item => item.size > maxSize)) {
      const errorMessage = formatMessage(messages.errorMaxSizeExceeded, { maxFileSize: maxSize / 1000000 });
      this.setState({ errorMessage, dropzoneActive: false });
      setTimeout(() => this.setState({ errorMessage: null }), 6000);
    }
  }

  removeItem = (item: Dropzone.ImageFile, event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    this.destroyPreview(item);
    this.props.onRemove(item);
  }

  destroyPreview(item: Dropzone.ImageFile) {
    if (item && item.preview) {
      window.URL.revokeObjectURL(item.preview);
    }
  }

  render() {
    let { items, accept, placeholder } = this.props;
    const { maxSize, maxItems } = this.props;
    const { errorMessage, dropzoneActive, disabled } = this.state;

    items = (items || this.emptyArray);
    accept = (accept || '*');
    placeholder = (placeholder || 'Drop your file here');

    return (
      <div>
        <StyledDropzoneWrapper 
          className={`
            ${dropzoneActive ? 'dropzoneActive' : ''} 
            ${disabled ? 'disabled' : ''}
          `}
        >
          <StyledDropzone
            disableClick={disabled}
            accept={accept}
            maxSize={maxSize}
            onDrop={this.onDrop}
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
            onDropRejected={this.onDropRejected}
          >
            { !items || items.length < 1
              ? (
                <UploadMessageContainer>
                  <UploadIcon><Icon name="upload" /></UploadIcon>
                  <UploadMessage dangerouslySetInnerHTML={{ __html: placeholder }} />
                </UploadMessageContainer>
              )
              : (items.map((item, index) => {
                  const _onClick = (event) => this.removeItem(item, event);

                  return (
                    <UploadedItem key={index} style={{ backgroundImage: `url(${item.preview})` }}>
                      <RemoveUploadedItem onClick={_onClick}>
                        <Icon name="close" />
                      </RemoveUploadedItem>
                    </UploadedItem>
                  );
                }))
            }
          </StyledDropzone>
        </StyledDropzoneWrapper>
        <Error text={errorMessage} />
      </div>
    );
  }
}

export default injectIntl(Upload);

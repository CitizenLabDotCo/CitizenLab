import * as React from 'react';
import * as Dropzone from 'react-dropzone';
import * as _ from 'lodash';
import { media } from 'utils/styleUtils';
import { darken } from 'polished';
import Icon from 'components/UI/Icon';
import Error from 'components/UI/Error';
import Spinner from 'components/UI/Spinner';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import messages from './messages';
import styled from 'styled-components';
import { getBase64FromFile } from 'utils/imageTools';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const DropzoneContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropzonePlaceholderText = styled.div`
  color: #aaa;
  font-size: 15px;
  line-height: 20px;
  font-weight: 400;
  text-align: center;
`;

const DropzonePlaceholderIcon = styled(Icon)`
  height: 38px;
  fill: #aaa;
  margin-bottom: 5px;
`;

const DropzoneContent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const StyledDropzone = styled(Dropzone)`
  border-radius: 5px;
  border-color: #999;
  border-width: 1.5px;
  border-style: dashed;
  position: relative;
  cursor: pointer;
  background: #fff;

  &:hover {
    border-color: #000;

    ${DropzonePlaceholderText} {
      color: #000;
    }

    ${DropzonePlaceholderIcon} {
      fill: #000;
    }
  }
`;

const Image: any = styled.div`
  background-repeat: no-repeat;
  background-position: center center;
  background-size: ${(props: any) => props.objectFit};
  background-image: url(${(props: any) => props.src});
  position: relative;
  border-radius: 5px;
  border: solid 1px #ccc;
`;

const Box: any = styled.div`
  width: 100%;
  max-width: ${(props: any) => props.maxWidth ? props.maxWidth : '100%'};
  margin-bottom: 15px;

  &.hasSpacing {
    margin-right: 15px;
  }

  ${Image},
  ${StyledDropzone} {
    width: 100%;
    height: 100%;
    height: ${(props: any) => props.ratio !== 1 ? 'auto' : props.maxWidth};
    padding-bottom: ${(props: any) => props.ratio !== 1 ? `${Math.round(props.ratio * 100)}%` : '0'};
  }
`;

const RemoveIcon = styled(Icon)`
  height: 10px;
  fill: #333;
`;

const RemoveButton = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -15px;
  right: -15px;
  z-index: 1;
  cursor: pointer;
  border-radius: 50%;
  border: solid 2px #fff;
  background: #e0e0e0;

  &:hover {
    background: #d0d0d0;

    ${RemoveIcon} {
      fill: #000;
    }
  }
`;

type Props = {
  images: Dropzone.ImageFile[] | File[] | null;
  acceptedFileTypes?: string | null | undefined;
  imagePreviewRatio?: number
  maxImagePreviewWidth?: string;
  maxImageFileSize?: number;
  maxNumberOfImages?: number;
  placeholder?: string | null | undefined;
  errorMessage?: string | null;
  objectFit?: 'cover' | 'contain' | undefined;
  onAdd: (arg: Dropzone.ImageFile) => void;
  onUpdate: (arg: Dropzone.ImageFile[] | File[] | null) => void;
  onRemove: (arg: Dropzone.ImageFile) => void;
};

type State = {
  images: Dropzone.ImageFile[] | null;
  errorMessage: string | null;
  processing: boolean;
};

class ImagesDropzone extends React.PureComponent<Props & InjectedIntlProps, State> {
  constructor(props: Props) {
    super(props as any);
    this.state = {
      images: [],
      errorMessage: null,
      processing: false
    };
  }

  async componentWillMount() {
    const images = await this.getImagesWithPreviews(this.props.images);
    this.props.onUpdate(images);
    this.setState({ images, processing: false });
  }

  async componentWillReceiveProps(nextProps: Props) {
    const { maxNumberOfImages } = this.props;

    if (nextProps.images !== this.props.images && (!maxNumberOfImages || (maxNumberOfImages && (_.size(nextProps.images) <= maxNumberOfImages)))) {
      const images = await this.getImagesWithPreviews(nextProps.images);
      this.setState({ images, processing: false });
    }

    if (nextProps.errorMessage && nextProps.errorMessage !== this.props.errorMessage) {
      this.setState({ errorMessage: nextProps.errorMessage });
    }

    if (!nextProps.errorMessage && this.props.errorMessage) {
      this.setState({ errorMessage: null });
    }
  }

  getImagesWithPreviews = async (images: Dropzone.ImageFile[] | File[] | null) => {
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i += 1) {
        const image = images[i];

        if (!_.has(image, 'preview')) {
          image['preview'] = await getBase64FromFile(image);
        }

        images[i] = image;
      }
    }

    return images;
  }

  onDrop = async (images: Dropzone.ImageFile[]) => {
    const { formatMessage } = this.props.intl;
    const maxItemsCount = this.props.maxNumberOfImages;
    const oldItemsCount = _.size(this.props.images);
    const newItemsCount = _.size(images);
    const remainingItemsCount = (maxItemsCount ? maxItemsCount - oldItemsCount : null);

    this.setState({ errorMessage: null, processing: true });

    if (maxItemsCount && remainingItemsCount && newItemsCount > remainingItemsCount) {
      const errorMessage = (maxItemsCount === 1 ? formatMessage(messages.onlyOneImage) : formatMessage(messages.onlyXImages, { maxItemsCount }));
      this.setState({ errorMessage });
      setTimeout(() => this.setState({ errorMessage: null }), 6000);
    } else {
      const imagesWithPreviews = await this.getImagesWithPreviews(images);
      _(imagesWithPreviews).forEach(image => this.props.onAdd(image));
    }
  }

  onDropRejected = (images: Dropzone.ImageFile[]) => {
    const { formatMessage } = this.props.intl;
    const maxSize = this.props.maxImageFileSize || 5000000;

    if (images.some(image => image.size > maxSize)) {
      const errorMessage = formatMessage(messages.errorMaxSizeExceeded, { maxFileSize: maxSize / 1000000 });
      this.setState({ errorMessage });
      setTimeout(() => this.setState({ errorMessage: null }), 6000);
    }
  }

  removeImage = (removedImage: Dropzone.ImageFile, event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onRemove(removedImage);
  }

  render() {
    let { acceptedFileTypes, placeholder, objectFit } = this.props;
    let { images } = this.state;
    const { maxImageFileSize, maxNumberOfImages, maxImagePreviewWidth, imagePreviewRatio } = this.props;
    const { formatMessage } = this.props.intl;
    const { errorMessage, processing } = this.state;

    console.log('processing: ' + processing);

    images = (_.compact(images) || null);
    acceptedFileTypes = (acceptedFileTypes || '*');
    placeholder = (placeholder || formatMessage(messages.dropYourImageHere));
    objectFit = (objectFit || 'cover');

    const imageList = ((images && images.length > 0) ? (
      images.map((image, index) => {
        const _onClick = (event) => this.removeImage(image, event);
        const hasSpacing = ((images && index + 1 === images.length && index + 1 === maxNumberOfImages) ? '' : 'hasSpacing');

        return (
          <Box
            key={index}
            maxWidth={maxImagePreviewWidth}
            ratio={imagePreviewRatio}
            className={hasSpacing}
          >
            <Image src={image.preview} objectFit={objectFit}>
              <RemoveButton onClick={_onClick}>
                <RemoveIcon name="close2" />
              </RemoveButton>
            </Image>
          </Box>
        );
      })
    ) : null);

    const imageDropzone = ((!maxNumberOfImages || images.length < maxNumberOfImages) ? (
      <Box
        maxWidth={maxImagePreviewWidth}
        ratio={imagePreviewRatio}
      >
        <StyledDropzone
          accept={acceptedFileTypes}
          maxSize={maxImageFileSize}
          disablePreview={true}
          onDrop={this.onDrop}
          onDropRejected={this.onDropRejected}
        >
          {!processing ? (
            <DropzoneContent>
              <DropzonePlaceholderIcon name="upload" />
              <DropzonePlaceholderText>{placeholder}</DropzonePlaceholderText>
            </DropzoneContent>
          ) : (
            <DropzoneContent>
              <Spinner />
            </DropzoneContent>
          )}
        </StyledDropzone>

        <Error text={errorMessage} />
      </Box>
    ) : null);

    return (
      <Container>
        {imageList}
        {imageDropzone}
      </Container>
    );
  }
}

export default injectIntl<Props>(ImagesDropzone);

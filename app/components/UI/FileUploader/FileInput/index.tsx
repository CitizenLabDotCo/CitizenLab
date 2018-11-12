import React, { PureComponent, createRef, FormEvent, KeyboardEvent } from 'react';
import { getBase64FromFile, createObjectUrl } from 'utils/imageTools';
import { UploadFile } from 'typings';

// i18n
import messages from '../messages';
import { FormattedMessage } from 'utils/cl-intl';

// styling
import styled from 'styled-components';
import { colors, fontSizes } from 'utils/styleUtils';

// components
import Icon from 'components/UI/Icon';

const Container = styled.div`
  margin-bottom: 10px;
`;

const StyledIcon = styled(Icon)`
  width: 24px;
  height: 18px;
  fill: ${colors.label};
  margin-right: 10px;
`;

const Input = styled.input`
   display: none;
 `;

const Label = styled.label`
  display: flex;
  /* max-width: 520px; */
  align-items: center;
  cursor: pointer;
  border: 1px dashed ${colors.label};
  border-radius: 5px;
  font-size: ${fontSizes.base}px;
  padding: 10px 20px;
  color: ${colors.label};
  background: #fff;

  &:hover {
    color: #000;
    border-color: #000;

    ${StyledIcon} {
      fill: #000;
    }
  }
`;

interface Props {
  onAdd: (file: UploadFile) => void;
  className?: string;
}

export default class FileInput extends PureComponent<Props> {
  private fileInput = createRef<HTMLInputElement>();

  onClick = (event: FormEvent<any>) => {
    // reset the value of the input field
    // so we can upload the same file again after deleting it
    event.currentTarget.value = null;
  }

  onChange = () => {
    const current = this.fileInput.current;

    if (current && current.files && current.files.length > 0) {
      const file = current.files[0] as UploadFile;

      getBase64FromFile(file).then((res) => {
        file.filename = file.name;
        file.base64 = res;
        file.url = createObjectUrl(file);
        file.remote = false;
        this.props.onAdd(file);
      });
    }
  }

  handleKeyPress = (event: KeyboardEvent<any>) => {
    const fileInput = this.fileInput.current;

    if (fileInput && event.key === 'Enter') {
      fileInput.click();
    }
  }

  render() {
    const { className } = this.props;

    return (
      <Container className={className}>
        <Input
          id="project-attachment-uploader"
          onChange={this.onChange}
          onClick={this.onClick}
          type="file"
          innerRef={this.fileInput}
          accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .sxw, .sxc, .sxi, .sdw, .sdc, .sdd, .csv, .mp3, .mp4, .mkv, .avi"
        />
        <Label htmlFor="project-attachment-uploader">
          <StyledIcon name="upload-file" />
          <span
            role="button"
            aria-controls="project-attachment-uploader"
            tabIndex={0}
            onKeyPress={this.handleKeyPress}
          >
            <FormattedMessage {...messages.fileInputDescription} />
          </span>
        </Label>
      </Container>
    );
  }
}

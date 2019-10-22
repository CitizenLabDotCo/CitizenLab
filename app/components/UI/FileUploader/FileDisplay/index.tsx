import React from 'react';
import { returnFileSize } from 'utils/helperUtils';
import { lighten } from 'polished';

// styles
import styled from 'styled-components';
import { colors, fontSizes, media } from 'utils/styleUtils';

// components
import Icon from 'components/UI/Icon';
import { isError } from 'util';
import { UploadFile } from 'typings';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';

const Container = styled.div<{error: boolean}>`
  display: flex;
  align-items: center;
  color: ${({ error }) => error ? colors.clRed : colors.label};
  border: 1px solid ${({ error }) => error ? lighten(.4, colors.clRed) : lighten(.4, colors.label)};
  border-radius: ${(props: any) => props.theme.borderRadius};
  font-size: ${fontSizes.base}px;
  line-height: 24px;
  padding: 10px 20px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Paperclip = styled(Icon)`
  min-width: 10px;
  min-height: 20px;
  width: 10px;
  height: 20px;
  fill: ${colors.label};
  margin-right: 15px;
`;

const FileDownloadLink = styled.a<{error: boolean}>`
  color: ${({ error }) => error ? colors.clRed : colors.label};
  display: inline-block;
  margin-right: 10px;
  hyphens: auto;
  max-width: 70%;

  &:hover {
    color: inherit;
    text-decoration: underline;
  }

  ${media.smallerThanMinTablet`
    margin-right: auto;
    max-width: 100%;
  `}
`;

const FileSize = styled.span`
  margin-right: auto;
  white-space: nowrap;

  ${media.smallerThanMinTablet`
    display: none;
  `}
`;

const DeleteButton = styled.button`
  display: flex;
  height: 20px;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    .cl-icon {
      fill: ${colors.clRed};
    }
  }
`;

const StyledIcon = styled(Icon)`
  width: 12px;
  fill: ${colors.label};
`;

interface Props {
  file: UploadFile;
  onDeleteClick?: () => void;
}

const FileDisplay = ({ file, onDeleteClick }: Props) => {
  if (file && !isError(file)) {
    return (
      <Container error={!!file.error}>
        <Paperclip name="paperclip" />
        <FileDownloadLink error={!!file.error} href={file.url} download={file.filename} target="_blank" rel="noopener noreferrer">
          {!!file.error
            ? <FormattedMessage {...messages[file.error[0]]} values={{ fileName: file.filename }} />
            : file.filename
          }
        </FileDownloadLink>
        <FileSize>({returnFileSize(file.size)})</FileSize>
        {onDeleteClick &&
          <DeleteButton onClick={onDeleteClick}>
            <StyledIcon name="delete" title={<FormattedMessage {...messages.a11y_removeFile} />} />
          </DeleteButton>
        }
      </Container>
    );
  }

  return null;
};

export default FileDisplay;

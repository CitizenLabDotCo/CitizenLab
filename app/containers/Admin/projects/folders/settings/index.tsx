import React, { useState, useRef, useEffect } from 'react';
import { withRouter, WithRouterProps } from 'react-router';
import styled from 'styled-components';
import { SectionTitle, SectionSubtitle, SectionField, Section } from 'components/admin/Section';
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';
import { Multiloc, Locale, UploadFile } from 'typings';
import InputMultiloc from 'components/UI/InputMultiloc';
import FormLocaleSwitcher from 'components/admin/FormLocaleSwitcher';
import useLocale from 'hooks/useLocale';
import { isNilOrError } from 'utils/helperUtils';
import TextAreaMultiloc from 'components/UI/TextAreaMultiloc';
import QuillMultiloc from 'components/UI/QuillEditor/QuillMultiloc';
import IconTooltip from 'components/UI/IconTooltip';
import Label from 'components/UI/Label';
import ImagesDropzone from 'components/UI/ImagesDropzone';
import SubmitWrapper from 'components/admin/SubmitWrapper';

const Container = styled.div<({ mode: 'edit' | 'new'})>`
  display: flex;
  flex-direction: column;
  ${({ mode }) => mode === 'new' ? `
    background: #fff;
    border-radius: 3px;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    padding: 3.5rem 4rem;
    margin-bottom: 60px;
  ` : ''}
`;

const FolderSettings = ({ params }: WithRouterProps) => {
  const { folderId } = params;
  const mode = folderId ? 'edit' : 'new';

  // locale things
  const locale = useLocale();
  const safeLocale = isNilOrError(locale) ? null : locale;

  const [selectedLocale, setSelectedLocale] = useState<Locale | null>(isNilOrError(locale) ? null : locale);

  // if user locale changes, we set the form selectedLocale to it (necessary as locale is initially undefined)
  const prevLocaleRef = useRef<Locale | null>(safeLocale);
  useEffect(() => {
    if (prevLocaleRef.current !== safeLocale) {
      prevLocaleRef.current = safeLocale;
      setSelectedLocale(safeLocale);
    }
  });

  // input handling
  const [titleMultiloc, setTitleMultiloc] = useState<Multiloc | null>(null);
  const [shortDescriptionMultiloc, setShortDescriptionMultiloc] = useState<Multiloc | null>(null);
  const [descriptionMultiloc, setDescriptionMultiloc] = useState<Multiloc | null>(null);
  const [headerBg, setHeaderBg] = useState<UploadFile | null>(null);

  const handleHeaderBgOnAdd = (newImage: UploadFile[]) => {
    setHeaderBg(newImage[0]);
  };

  const handleHeaderBgOnRemove = () => {
    setHeaderBg(null);
  };

  // form status
  const [loading, setLoading] = useState<boolean>(false);
  const submitState = 'enabled';

  // form submission
  const onSubmit = (event) => console.log(titleMultiloc, shortDescriptionMultiloc, descriptionMultiloc, headerBg);

  if (!selectedLocale) return null;

  return (
    <Container mode={mode}>
      {mode === 'edit' ?
        <>
          <SectionTitle>
            {<FormattedMessage {...messages.titleSettingsTab} />}
          </SectionTitle>
          <SectionSubtitle>
            <FormattedMessage {...messages.subtitleSettingsTab} />
          </SectionSubtitle>
        </>
        :
        <>
          <SectionTitle >
            {< FormattedMessage {...messages.titleNewFolder} />}
          </SectionTitle >
          <SectionSubtitle>
            <FormattedMessage {...messages.subtitleNewFolder} />
          </SectionSubtitle>
        </>
      }
      <form onSubmit={onSubmit}>
        <Section>
          <FormLocaleSwitcher selectedLocale={selectedLocale} onLocaleChange={setSelectedLocale} />
          <SectionField>
            <InputMultiloc
              valueMultiloc={titleMultiloc}
              type="text"
              onChange={setTitleMultiloc}
              selectedLocale={selectedLocale}
              label={<FormattedMessage {...messages.titleInputLabel} />}
            />
          </SectionField>
          <SectionField>
            <TextAreaMultiloc
              valueMultiloc={shortDescriptionMultiloc}
              name="textAreaMultiloc"
              onChange={setShortDescriptionMultiloc}
              selectedLocale={selectedLocale}
              label={<FormattedMessage {...messages.shortDescriptionInputLabel} />}
              labelTooltip={<IconTooltip content={<FormattedMessage {...messages.shortDescriptionInputLabelTooltip} />} />}
            />
          </SectionField>
          <SectionField>
            <QuillMultiloc
              id="description"
              valueMultiloc={descriptionMultiloc}
              onChangeMultiloc={setDescriptionMultiloc}
              selectedLocale={selectedLocale}
              label={<FormattedMessage {...messages.descriptionInputLabel} />}
            />
          </SectionField>

          <SectionField key={'header_bg'}>
            <Label>
              <FormattedMessage {...messages.headerImageInputLabel} />
            </Label>
            <ImagesDropzone
              acceptedFileTypes="image/jpg, image/jpeg, image/png, image/gif"
              maxNumberOfImages={1}
              maxImageFileSize={5000000}
              images={headerBg ? [headerBg] : null}
              imagePreviewRatio={480 / 1440}
              maxImagePreviewWidth="500px"
              onAdd={handleHeaderBgOnAdd}
              onRemove={handleHeaderBgOnRemove}
            // errorMessage={headerError}
            />
          </SectionField>
          <SubmitWrapper
            loading={loading}
            status={submitState}
            onClick={onSubmit}
            messages={{
              buttonSave: messages.save,
              buttonSuccess: messages.saveSuccess,
              messageError: messages.saveErrorMessage,
              messageSuccess: messages.saveSuccessMessage,
            }}
          />
        </Section>
      </form>
    </Container>
  );
};

export default withRouter(FolderSettings);

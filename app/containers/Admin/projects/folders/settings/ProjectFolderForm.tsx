import React, { useState, useEffect, useCallback } from 'react';
import clHistory from 'utils/cl-router/history';
import { isEmpty, isEqual } from 'lodash-es';

import { Multiloc, UploadFile } from 'typings';

import { isNilOrError } from 'utils/helperUtils';
import { addProjectFolder, updateProjectFolder } from 'services/projectFolders';
import { addProjectFolderImage, deleteProjectFolderImage } from 'services/projectFolderImages';
import { convertUrlToUploadFile } from 'utils/fileTools';
import useProjectFolderImages from 'hooks/useProjectFolderImages';
import useProjectFolder from 'hooks/useProjectFolder';
import useTenantLocales from 'hooks/useTenantLocales';

import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import messages from '../messages';

import { SectionField, Section } from 'components/admin/Section';
import Label from 'components/UI/Label';
import ImagesDropzone from 'components/UI/ImagesDropzone';
import SubmitWrapper from 'components/admin/SubmitWrapper';
import TextAreaMultilocWithLocaleSwitcher from 'components/UI/TextAreaMultilocWithLocaleSwitcher';
import InputMultilocWithLocaleSwitcher from 'components/UI/InputMultilocWithLocaleSwitcher';
import QuillMutilocWithLocaleSwitcher from 'components/UI/QuillEditor/QuillMultilocWithLocaleSwitcher';
import IconTooltip from 'components/UI/IconTooltip';
import FileUploader from 'components/UI/FileUploader';
import { addProjectFolderFile, deleteProjectFolderFile } from 'services/projectFolderFiles';
import useProjectFolderFiles from 'hooks/useProjectFolderFiles';

interface Props {
  mode: 'edit' | 'new';
  projectFolderId: string;
}

const ProjectFolderForm = ({ mode, projectFolderId }: Props) => {

  const projectFolder = useProjectFolder({ projectFolderId });
  const projectFolderFilesRemote = useProjectFolderFiles(projectFolderId);
  const projectFolderImagesRemote = useProjectFolderImages(projectFolderId);

  useEffect(() => {
    (async function iife() {
      if (mode === 'edit' && !isNilOrError(projectFolder)) {
        setTitleMultiloc(projectFolder.attributes.title_multiloc);
        setDescriptionMultiloc(projectFolder.attributes.description_multiloc);
        setShortDescriptionMultiloc(projectFolder.attributes.description_preview_multiloc);
        if (projectFolder.attributes ?.header_bg ?.large) {
          const headerFile = await convertUrlToUploadFile(projectFolder.attributes ?.header_bg ?.large, null, null);
          setHeaderBg(headerFile);
        }
        if (!isNilOrError(projectFolderImagesRemote)) {
          const imagePromises = projectFolderImagesRemote.data.map(img => img.attributes.versions.large ? convertUrlToUploadFile(img.attributes.versions.large, img.id, null) : new Promise<null>(resolve => resolve(null)));
          const images = await Promise.all(imagePromises);
          images.filter(img => img);
          setProjectFolderImages(images as UploadFile[]);
        }
        if (!isNilOrError(projectFolderFilesRemote)) {
          const filePromises = projectFolderFilesRemote.data.map(file => convertUrlToUploadFile(file.attributes.file.url, file.id, file.attributes.name));
          const files = await Promise.all(filePromises);
          files.filter(file => file);
          setProjectFolderFiles(files as UploadFile[]);
        }
      }
    }
    )();
  }, [projectFolder, projectFolderImagesRemote, projectFolderFilesRemote, mode]);

  // input handling
  const [titleMultiloc, setTitleMultiloc] = useState<Multiloc | null>(null);
  const [shortDescriptionMultiloc, setShortDescriptionMultiloc] = useState<Multiloc | null>(null);
  const [descriptionMultiloc, setDescriptionMultiloc] = useState<Multiloc | null>(null);
  const [headerBg, setHeaderBg] = useState<UploadFile | null>(null);
  const [changedHeaderBg, setChangedHeaderBg] = useState(false);
  const [projectFolderImages, setProjectFolderImages] = useState<UploadFile[]>([]);
  const [projectFolderImagesToRemove, setProjectFolderImagesToRemove] = useState<string[]>([]);
  const [projectFolderFiles, setProjectFolderFiles] = useState<UploadFile[]>([]);
  const [projectFolderFilesToRemove, setProjectFolderFilesToRemove] = useState<string[]>([]);

  const getHandler = useCallback((setter: (value: any) => void) => (value: any) => {
    setStatus('enabled');
    setter(value);
  }, []);

  const handleHeaderBgOnAdd = useCallback((newImage: UploadFile[]) => {
    setStatus('enabled');

    setChangedHeaderBg(true);
    setHeaderBg(newImage[0]);
  }, []);

  const handleHeaderBgOnRemove = useCallback(() => {
    setStatus('enabled');

    setChangedHeaderBg(true);
    setHeaderBg(null);
  }, []);

  const handleProjectFolderImageOnRemove = useCallback((imageToRemove: UploadFile) => {
    setStatus('enabled');
    if (imageToRemove.remote && imageToRemove.id) {
      setProjectFolderImagesToRemove(previous => [...previous, imageToRemove.id as string]);
    }
    setProjectFolderImages(projectFolderImages => projectFolderImages.filter(image => image.base64 !== imageToRemove.base64));
  }, []);

  const handleProjectFolderFileOnAdd = useCallback((fileToAdd: UploadFile) => {
    setStatus('enabled');

    setProjectFolderFiles(previous => {
      const isDuplicate = previous.some(file => file.base64 === fileToAdd.base64);

      return isDuplicate ? previous : [...previous, fileToAdd];
    });
  }, []);

  const handleProjectFolderFileOnRemove = useCallback((fileToRemove: UploadFile) => {
    setStatus('enabled');
    if (fileToRemove.remote && fileToRemove.id) {
      setProjectFolderFilesToRemove(previous => [...previous, fileToRemove.id as string]);
    }
    setProjectFolderImages(projectFolderImages => projectFolderImages.filter(image => image.base64 !== fileToRemove.base64));
  }, []);

  // form status
  const [status, setStatus] = useState<'enabled' | 'error' | 'apiError' | 'success' | 'disabled' | 'loading'>('disabled');

  // validation
  const tenantLocales = useTenantLocales();

  const validate = useCallback(() => {
    let valid = false;
    if (!isNilOrError(tenantLocales)) {
      // check that all fields have content for all tenant locales
      valid = tenantLocales.every(locale => !isEmpty(titleMultiloc ?.[locale]) && !isEmpty(descriptionMultiloc ?.[locale]) && !isEmpty(shortDescriptionMultiloc ?.[locale]));
    }
    if (!valid) {
      setStatus('error');
    }

    return valid;
  }, [tenantLocales, titleMultiloc, descriptionMultiloc, shortDescriptionMultiloc]);

  // form submission
  const onSubmit = async () => {
    if (validate()) {
      setStatus('loading');
      if (mode === 'new') {
        try {
          if (titleMultiloc && descriptionMultiloc && shortDescriptionMultiloc) {
            const res = await addProjectFolder({
              title_multiloc: titleMultiloc,
              description_multiloc: descriptionMultiloc,
              description_preview_multiloc: shortDescriptionMultiloc,
              header_bg: headerBg ?.base64
              });
            if (!isNilOrError(res)) {
              const imagesToAddPromises = projectFolderImages.map(file => addProjectFolderImage(res.id, file.base64));
              const filesToAddPromises = projectFolderFiles.map(file => addProjectFolderFile(res.id, file.base64, file.name));

              (imagesToAddPromises || filesToAddPromises) && await Promise.all<any>([...imagesToAddPromises, ...filesToAddPromises]);

              clHistory.push(`/admin/projects/folders/${res.id}`);
            }
          }
        }
        finally { setStatus('apiError'); }
      } else {
        try {
          if (titleMultiloc && descriptionMultiloc && shortDescriptionMultiloc && !isNilOrError(projectFolder)) {
            const imagesToAddPromises = projectFolderImages.filter(file => !file.remote).map(file => addProjectFolderImage(projectFolderId as string, file.base64));
            const imagesToRemovePromises = projectFolderImagesToRemove.map(id => deleteProjectFolderImage(projectFolderId as string, id));
            const filesToAddPromises = projectFolderFiles.filter(file => !file.remote).map(file => addProjectFolderFile(projectFolderId as string, file.base64, file.name));
            const filesToRemovePromises = projectFolderFilesToRemove.map(id => deleteProjectFolderFile(projectFolderId as string, id));

            imagesToAddPromises && await Promise.all<any>([
              ...imagesToAddPromises,
              ...imagesToRemovePromises,
              ...filesToAddPromises,
              ...filesToRemovePromises
            ]);

            const changedTitleMultiloc = !isEqual(titleMultiloc, projectFolder.attributes.title_multiloc);
            const changedDescriptionMultiloc = !isEqual(descriptionMultiloc, projectFolder.attributes.description_multiloc);
            const changedShortDescriptionMultiloc = !isEqual(shortDescriptionMultiloc, projectFolder.attributes.description_preview_multiloc);

            if (changedTitleMultiloc || changedDescriptionMultiloc || changedShortDescriptionMultiloc || changedHeaderBg) {
              const res = await updateProjectFolder(projectFolderId, {
                title_multiloc: changedTitleMultiloc ? titleMultiloc : undefined,
                description_multiloc: changedDescriptionMultiloc ? descriptionMultiloc : undefined,
                description_preview_multiloc: changedShortDescriptionMultiloc ? shortDescriptionMultiloc : undefined,
                header_bg: changedHeaderBg ? headerBg ?.base64 : undefined
              });

              if (isNilOrError(res)) {
                setStatus('apiError');
              }
            }
            setStatus('success');
          } else {
            setStatus('apiError');
          }
        } catch {
          setStatus('apiError');
        }
      }
    }
  };

  // ---- Rendering
  if (mode === 'edit' && isNilOrError(projectFolder)) return null;

  return (
    <form onSubmit={onSubmit}>
      <Section>
        <SectionField>
          <InputMultilocWithLocaleSwitcher
            valueMultiloc={titleMultiloc}
            type="text"
            onChange={getHandler(setTitleMultiloc)}
            label={<FormattedMessage {...messages.titleInputLabel} />}
          />
        </SectionField>
        <SectionField>
          <TextAreaMultilocWithLocaleSwitcher
            valueMultiloc={shortDescriptionMultiloc}
            name="textAreaMultiloc"
            onChange={getHandler(setShortDescriptionMultiloc)}
            label={<FormattedMessage {...messages.shortDescriptionInputLabel} />}
            labelTooltipText={<FormattedMessage {...messages.shortDescriptionInputLabelTooltip} />}
          />
        </SectionField>
        <SectionField>
          <QuillMutilocWithLocaleSwitcher
            id="description"
            valueMultiloc={descriptionMultiloc}
            onChange={getHandler(setDescriptionMultiloc)}
            label={<FormattedMessage {...messages.descriptionInputLabel} />}
            withCTAButton
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
            imagePreviewRatio={120 / 480}
            maxImagePreviewWidth="500px"
            onAdd={handleHeaderBgOnAdd}
            onRemove={handleHeaderBgOnRemove}
          />
        </SectionField>

        <SectionField>
          <Label>
            <FormattedMessage {...messages.projectFolderImagesInputLabel} />
          </Label>
          <ImagesDropzone
            images={projectFolderImages}
            imagePreviewRatio={1}
            maxImagePreviewWidth="160px"
            acceptedFileTypes="image/jpg, image/jpeg, image/png, image/gif"
            maxImageFileSize={5000000}
            maxNumberOfImages={5}
            onAdd={getHandler(setProjectFolderImages)}
            onRemove={handleProjectFolderImageOnRemove}
          />
        </SectionField>
        <SectionField>
          <Label>
            <FormattedMessage {...messages.fileUploadLabel} />
            <IconTooltip content={<FormattedMessage {...messages.fileUploadLabelTooltip} />} />
          </Label>
          <FileUploader
            onFileAdd={handleProjectFolderFileOnAdd}
            onFileRemove={handleProjectFolderFileOnRemove}
            files={projectFolderFiles}
          // errors={TODO}
          />
        </SectionField>
        <SubmitWrapper
          loading={status === 'loading'}
          status={status === 'loading' ? 'disabled' : status === 'apiError' ? 'error' : status}
          onClick={onSubmit}
          messages={{
            buttonSave: messages.save,
            buttonSuccess: messages.saveSuccess,
            messageError: status === 'apiError' ? messages.saveErrorMessage : messages.multilocError,
            messageSuccess: messages.saveSuccessMessage,
          }}
        />
      </Section>
    </form>
  );
};

export default injectIntl(ProjectFolderForm);

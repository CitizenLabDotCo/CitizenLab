import React, { PureComponent } from 'react';
import SideModal from 'components/UI/SideModal';
import IdeaEdit from './IdeaEdit';
import InitiativeEdit from './InitiativeEdit';
import IdeaContent from './IdeaContent';
import styled from 'styled-components';
import { colors } from 'utils/styleUtils';
import { ManagerType } from '../..';

interface DataProps {}

interface InputProps {
  type: ManagerType;
  onClose: () => void;
  postId: string | null;
  onSwitchPreviewMode: () => void;
  mode: 'edit' | 'view';
}

interface Props extends InputProps, DataProps {}

export const Container = styled.div<{ bgColor: string}>`
  min-height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
`;

export const Top = styled.div<{ bgColor: string}>`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  height: 50px;
  width: 100%;
  background-color: ${({ bgColor }) => bgColor};
  padding-left: 10px;
  padding-right: 50px;
  z-index: 1;
`;

export const Content = styled.div`
  padding: 30px;
  margin-top: 50px;
`;

export default class PostPreview extends PureComponent<Props> {

  render() {
    const { type, postId, onClose, onSwitchPreviewMode, mode } = this.props;
    console.log(type === 'Initiatives' ? 'TODO PostPreview' : '');

    return (
      <SideModal
        opened={!!postId}
        close={onClose}
      >
        {mode === 'view' && (type === 'AllIdeas' || type === 'ProjectIdeas') && postId &&
          <IdeaContent
            ideaId={postId}
            closePreview={onClose}
            handleClickEdit={onSwitchPreviewMode}
          />
        }
        {mode === 'edit' && postId && (type === 'AllIdeas' || type === 'ProjectIdeas') && postId &&
          <IdeaEdit
            ideaId={postId}
            goBack={onSwitchPreviewMode}
          />
        }
        {mode === 'edit' && postId && (type === 'Initiatives') &&
          <InitiativeEdit
            initiativeId={postId}
            goBack={onSwitchPreviewMode}
          />
        }
      </SideModal>
    );
  }
}

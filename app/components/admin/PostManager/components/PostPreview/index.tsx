import React, { PureComponent } from 'react';
import SideModal from 'components/UI/SideModal';
import IdeaEdit from './Idea/IdeaEdit';
import IdeaContent from './Idea/IdeaContent';
import InitiativeContent from './Initiative/InitiativeContent';
import InitiativeEdit from './Initiative/InitiativeEdit';
import { ManagerType } from 'components/admin/PostManager';
import styled from 'styled-components';
import { colors } from 'utils/styleUtils';
interface DataProps {}

interface InputProps {
  type: ManagerType;
  onClose: () => void;
  postId: string | null;
  onSwitchPreviewMode: () => void;
  mode: 'edit' | 'view';
}

interface Props extends InputProps, DataProps {}

export const Container = styled.div`
  min-height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Top = styled.div`
  background-color: white;
  border-bottom: 1px solid ${colors.separation};
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  padding-left: 10px;
  padding-right: 50px;
  z-index: 1;
`;

export const Content = styled.div`
  padding: 30px;
  margin-top: 50px;
  width: 100%;
`;

export default class PostPreview extends PureComponent<Props> {

  render() {
    const { type, postId, onClose, onSwitchPreviewMode, mode } = this.props;

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
        {mode === 'view' && type === 'Initiatives' && postId &&
          <InitiativeContent
            initiativeId={postId}
            closePreview={onClose}
            handleClickEdit={onSwitchPreviewMode}
          />
        }
        {mode === 'edit' && postId && (type === 'AllIdeas' || type === 'ProjectIdeas') &&
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

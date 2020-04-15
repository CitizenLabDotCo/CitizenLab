import React, { memo, useCallback, useMemo } from 'react';

// components
import FullscreenModal from 'components/UI/FullscreenModal';
import IdeasShow from 'containers/IdeasShow';
import IdeaShowPageTopBar from 'containers/IdeasShowPage/IdeaShowPageTopBar';
import InitiativesShow from 'containers/InitiativesShow';
import InitiativeShowPageTopBar from 'containers/InitiativesShowPage/InitiativeShowPageTopBar';
import Footer from 'containers/Footer';

// hooks
import useIdea from 'hooks/useIdea';

// utils
import { isNilOrError } from 'utils/helperUtils';

interface Props {
  type: 'idea' | 'initiative' | null;
  postId: string | null;
  slug: string | null;
  navbarRef?: HTMLElement | null;
  mobileNavbarRef?: HTMLElement | null;
  close: () => void;
}

const PostPageFullscreenModal = memo<Props>(({ postId, slug, type, navbarRef, mobileNavbarRef, close }) => {
  const onClose = useCallback(() => {
    close();
  }, [close]);

  const topBar = useMemo(() => {
    if (postId && type === 'idea') {
      return <IdeaShowPageTopBar ideaId={postId} insideModal={true} />;
    }

    if (postId && type === 'initiative') {
      return <InitiativeShowPageTopBar initiativeId={postId} insideModal={true} />;
    }

    return null;
  }, [postId, type]);

  const content = useMemo(() => {
    if (postId && type) {

      if (type === 'idea') {
        const idea = useIdea({ ideaId: postId });

        if (!isNilOrError(idea)) {
          const projectId = idea.relationships.project.data.id;

          return (
            <>
              <IdeasShow ideaId={postId} projectId={projectId} insideModal={true} />
              <Footer />
            </>
          );
        }
      }

      if (type === 'initiative') {
        return (
          <>
            <InitiativesShow initiativeId={postId} insideModal={true} />
            <Footer />
          </>
        );
      }
    }

    return null;
  }, [postId, type]);

  return (
    <FullscreenModal
      opened={!!(postId && slug && type)}
      close={onClose}
      url={slug ? `/${type}s/${slug}` : null}
      topBar={topBar}
      navbarRef={navbarRef}
      mobileNavbarRef={mobileNavbarRef}
    >
      {content}
    </FullscreenModal>
  );
});

export default PostPageFullscreenModal;

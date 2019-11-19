import React, { memo, useCallback, useMemo } from 'react';

// components
import FullscreenModal from 'components/UI/FullscreenModal';
import IdeasShow from 'containers/IdeasShow';
import IdeaShowPageTopBar from 'containers/IdeasShowPage/IdeaShowPageTopBar';
import InitiativesShow from 'containers/InitiativesShow';
import InitiativeShowPageTopBar from 'containers/InitiativesShowPage/InitiativeShowPageTopBar';
import Footer from 'containers/Footer';

interface Props {
  type: 'idea' | 'initiative' | null;
  id: string | null;
  slug: string | null;
  navbarRef?: HTMLElement | null;
  close: () => void;
}

const PostPageFullscreenModal = memo<Props>(({ id, slug, type, navbarRef, close }) => {

  const onClose = useCallback(() => {
    close();
  }, []);

  const topBar = useMemo(() => {
    return (id
      ? type === 'idea'
        ? <IdeaShowPageTopBar ideaId={id} insideModal={true} />
        : type === 'initiative'
          ? <InitiativeShowPageTopBar initiativeId={id} insideModal={true} />
          : null
      : null);
  }, [id]);

  const content = useMemo(() => {
    return (id
      ? type === 'idea'
        ? (
        <>
          <IdeasShow ideaId={id}/>
          <Footer />
        </>
        )
        : type === 'initiative'
          ? (
          <>
            <InitiativesShow initiativeId={id}/>
            <Footer />
          </>
          )
          : null
      : null);
  }, [id]);

  return (
    <FullscreenModal
      opened={!!(id && slug && type)}
      close={onClose}
      url={slug ? `/${type}s/${slug}` : null}
      topBar={topBar}
      navbarRef={navbarRef}
    >
      {content}
    </FullscreenModal>
  );
});

export default PostPageFullscreenModal;

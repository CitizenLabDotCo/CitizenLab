import React from 'react';
import { shallow } from 'enzyme';
import { localizeProps } from 'utils/testUtils/localizeProps';
import { getDummyIntlObject } from 'utils/testUtils/mockedIntl'
import { getIdea } from 'services/__mocks__/ideas';

jest.mock('resources/GetResourceFiles', () => 'GetResourceFiles');
jest.mock('resources/GetIdea', () => 'GetIdea');
jest.mock('resources/GetIdeaImages', () => 'GetIdeaImages');
jest.mock('resources/GetTenant', () => 'GetTenant');
jest.mock('resources/GetProject', () => 'GetProject');
jest.mock('resources/GetPermission', () => 'GetPermission');
jest.mock('containers/IdeasShow/IdeaAuthor', () => 'IdeaAuthor');
jest.mock('components/PostComponents/Title', () => 'Title');
jest.mock('components/PostComponents/Body', () => 'Body');
jest.mock('components/PostComponents/DropdownMap', () => 'DropdownMap');
jest.mock('components/PostComponents/OfficialFeedback', () => 'OfficialFeedback');
jest.mock('components/PostComponents/Comments', () => 'Comments');
jest.mock('components/UI/FileAttachments', () => 'FileAttachments');
jest.mock('components/UI/Button', () => 'Button');
jest.mock('components/UI/InfoTooltip', () => 'InfoTooltip');
jest.mock('./FeedbackSettings', () => 'FeedbackSettings');
jest.mock('./VotePreview', () => 'VotePreview');
jest.mock('utils/cl-router/Link', () => 'Link');
jest.mock('components/T', () => 'T');
jest.mock('../', () => ({
  Top: () => 'Top',
  Content: () => 'Content',
  Container: () => 'Container'
}));
jest.mock('services/ideas');
jest.mock('utils/cl-intl');

import { IdeaContent } from './IdeaContent';

describe('<IdeaContent />', () => {
  let closePreview: jest.Mock;
  let handleClickEdit: jest.Mock;

  beforeEach(() => {
    closePreview = jest.fn();
    handleClickEdit = jest.fn();
  });

  it('renders correctly when ideaId is not defined', () => {
    const intl = getDummyIntlObject();
    const wrapper = shallow(
      <IdeaContent
        ideaId={null}
        closePreview={closePreview}
        handleClickEdit={handleClickEdit}
        idea={null}
        ideaImages={null}
        ideaFiles={null}
        tenant={null}
        project={null}
        postOfficialFeedbackPermission={undefined}
        intl={intl}
        {...localizeProps}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when an idea is provided', () => {
    const ideaId = 'myIdeasiD';
    const idea = getIdea(ideaId);
    const intl = getDummyIntlObject();
    const wrapper = shallow(
      <IdeaContent
        ideaId={ideaId}
        closePreview={closePreview}
        handleClickEdit={handleClickEdit}
        idea={idea}
        ideaImages={null}
        ideaFiles={null}
        tenant={null}
        project={null}
        postOfficialFeedbackPermission={undefined}
        intl={intl}
        {...localizeProps}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});

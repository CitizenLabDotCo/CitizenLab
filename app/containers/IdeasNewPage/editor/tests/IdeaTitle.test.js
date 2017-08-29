import React from 'react';
import { mountWithIntl } from 'utils/testing/intl';

import { TitleStatusWrapper } from '../IdeaTitle';

describe('<IdeaTitle />', () => {
  it('TitleStatusWrapper should display title length if title length >= 5 chars and <= 120 chars', () => {
    const IdeaTitle = mountWithIntl(
      <TitleStatusWrapper
        short={false}
        long={false}
        length={5}
      />
    );
    expect(IdeaTitle.html()).toEqual(expect.stringContaining('115 characters left'));
  });
});

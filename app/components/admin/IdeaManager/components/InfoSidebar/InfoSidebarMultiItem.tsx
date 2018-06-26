import React from 'react';
import { isNilOrError } from 'utils/helperUtils';
import T from 'components/T';
import { List } from 'semantic-ui-react';
import GetIdea from 'resources/GetIdea';

export default (props: { ideaId: string }) => (
  <GetIdea id={props.ideaId}>
    {(idea) =>  {
      if (isNilOrError(idea)) return null;

      return (
        <List.Item>
          <T value={idea.attributes.title_multiloc} />
        </List.Item>
      );
    }}
  </GetIdea>
);

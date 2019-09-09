import React from 'react';

// Components
import T from 'components/T';
import Button from 'components/UI/Button';
import { Row, TextCell } from 'components/admin/ResourceList';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// Typings
import { Multiloc } from 'typings';

const OptionRow = ({ pollOptionId, pollOptionTitle, deleteOption, editOption }: {
  pollOptionId: string,
  pollOptionTitle: Multiloc,
  deleteOption: (optionId: string) => () => void;
  editOption: (optionId: string) => () => void;
}) => (
    <Row key={pollOptionId}>
      <TextCell className="expand">
        <T value={pollOptionTitle} />
      </TextCell>
      <Button
        className="e2e-delete-option"
        onClick={deleteOption(pollOptionId)}
        style="text"
        icon="delete"
      >
        <FormattedMessage {...messages.deleteOption} />
      </Button>

      <Button
        className="e2e-edit-option"
        onClick={editOption(pollOptionId)}
        style="secondary"
        icon="edit"
      >
        <FormattedMessage {...messages.editOption} />
      </Button>
    </Row>
  );

export default OptionRow;

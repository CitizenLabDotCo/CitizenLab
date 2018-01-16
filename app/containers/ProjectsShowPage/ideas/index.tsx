// Libs
import React from 'react';
import { Map } from 'immutable';

// Components
import ContentContainer from 'components/ContentContainer';
import IdeaCards from 'components/IdeaCards';
import IdeasMap from 'components/IdeasMap';
import { Button } from 'semantic-ui-react';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// Styles
import styled from 'styled-components';
const StyledContentContainer = styled(ContentContainer)`
  margin-top: 30px;
`;

const ToggleWrapper = styled.div`
  margin-bottom: 1rem;
  text-align: right;
`;

// Typings
interface Props {
  project: Map<string, any>;
}

interface State {
  display: 'map' | 'cards';
}

class AllIdeas extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      display: 'cards',
    };
  }

  toggleDisplay = () => {
    this.setState({ display: this.state.display === 'map' ? 'cards' : 'map' });
  }

  render() {
    const { project } = this.props;
    const { display } = this.state;

    return (
      <StyledContentContainer>
        <ToggleWrapper>
          <Button.Group size="mini" toggle onClick={this.toggleDisplay}>
            <Button active={display === 'map'}><FormattedMessage {...messages.displayMap} /></Button>
            <Button active={display === 'cards'}><FormattedMessage {...messages.displayCards} /></Button>
          </Button.Group>
        </ToggleWrapper>
        {display === 'map' &&
          <IdeasMap project={project && project.get('id')} />
        }
        {display === 'cards' &&
          <IdeaCards filter={{ project: project && project.get('id') }} />
        }
      </StyledContentContainer>
    );
  }
}

export default AllIdeas;


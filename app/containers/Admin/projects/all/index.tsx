// Libraries
import * as React from 'react';
import * as Rx from 'rxjs/Rx';
import styledComponents from 'styled-components';
const styled = styledComponents;

// Services
import { observeProjects, IProjectData } from 'services/projects';

// Localisation
import { FormattedMessage } from 'react-intl';
import t from 'utils/containers/t';
const T = t;
import messages from '../messages';

// Styles
const ProjectsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`;

const ProjectCard = styled.li`
  background: white;
  border-radius: 5px;
  display: flex;
  flex: 1 0 300px;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
  overflow: hidden;
  max-width: calc(100% - 2rem);

  @media (min-width: 850px) {
    & {
      max-width: calc(50% - 2rem);
    }
  }

  @media (min-width: 1150px) {
    & {
      max-width: calc(33% - 2rem);
    }
  }

  img {
    max-width: 100%;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: normal;
    margin: 1rem;
    text-align: center;
  }

  a {
    background-color: #d70066;
    border-radius: 5px;
    color: white;
    display: block;
    line-height: 3rem;
    margin: 0 1rem 1rem;
    text-align: center;
    text-decoration: none;
  }
`;

// Component typing
type Props = {
  projects: IProjectData[]
};

type State = {
  projects: IProjectData[] | null
};

class AdminProjectsList extends React.Component<Props, State> {
  subscription: Rx.Subscription;

  constructor () {
    super();

    this.state = {
      projects: null,
    };
  }

  componentDidMount() {
    this.subscription = observeProjects().observable.subscribe((projects) => {
      this.setState({ projects: projects.data });
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render () {
    const { projects } = this.state;

    return (
      <ProjectsList>
        {projects && projects.map((project) => (
          <ProjectCard key={project.id}>
            {project.attributes.header_bg.small &&
              <img src={project.attributes.header_bg.small} alt="" role="presentation" />
            }

            <h1><T value={project.attributes.title_multiloc} /></h1>

            <a href={`/admin/projects/${project.attributes.slug}/edit`}>
              <FormattedMessage {...messages.editProject} />
            </a>
          </ProjectCard>
        ))}
      </ProjectsList>
    );
  }
}

export default AdminProjectsList;

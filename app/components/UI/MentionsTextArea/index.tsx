import React, { PureComponent } from 'react';
import { isString, isEmpty } from 'lodash-es';
import { first } from 'rxjs/operators';

// libraries
import { MentionsInput, Mention } from 'react-mentions';

// services
import { mentionsStream } from 'services/mentions';

// components
import Error from 'components/UI/Error';

// style
import styled, { withTheme } from 'styled-components';
import { colors, fontSizes } from 'utils/styleUtils';
import { transparentize } from 'polished';

const Container: any = styled.div`
  position: relative;

  textarea {
    &:hover {
      border-color: ${(props: any) => props.error && props.theme.colors.clRedError} !important;
    }

    &:focus {
      border-color: ${(props: any) => props.error ? props.theme.colors.clRedError : '#666'} !important;
    }

    &::placeholder {
      color: ${colors.clIconSecondary} !important;
      opacity: 1;
      font-weight: ${(props: any) => props.placeholderFontWeight} !important;
    }
  }

  .textareaWrapper__suggestions__list li:last-child {
    border: none !important;
  }
`;

type Props = {
  id?: string;
  className?: string;
  name: string;
  value?: string | null;
  placeholder?: string;
  rows: number;
  ideaId?: string
  error?: string | null;
  onChange?: (arg: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  getTextareaRef?: (element: HTMLTextAreaElement) => void;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
  boxShadow?: string;
  background?: string;
  placeholderFontWeight?: string;
  ariaLabel?: string;
  theme: any;
};

type State = {
  style: object | null;
  mentionStyle: object | null;
};

class MentionsTextArea extends PureComponent<Props, State> {
  textareaElement = React.createRef();

  static defaultProps = {
    color: colors.text,
    fontSize: `${fontSizes.base}px`,
    fontWeight: '400',
    lineHeight: '24px',
    padding: '24px',
    border: 'solid 1px #ccc',
    borderRadius: '5px',
    boxShadow: 'inset 0 0 2px rgba(0, 0, 0, 0.1)',
    background: 'transparent',
    placeholderFontWeight: '300'
  };

  constructor(props) {
    super(props);
    this.state = {
      style: null,
      mentionStyle: null
    };
  }

  componentDidMount() {
    const { rows } = this.props;

    const style = {
      '&multiLine': {
        control: {
          padding: 0,
          margin: 0,
          border: 'none',
          appearance: 'none',
          WebkitAppearance: 'none'
        },
        input: {
          margin: 0,
          padding: this.props.padding,
          color: this.props.color,
          fontSize: this.props.fontSize,
          fontWeight: this.props.fontWeight,
          lineHeight: this.props.lineHeight,
          minHeight: `${rows * parseInt(this.props.lineHeight as string, 10)}px`,
          outline: 'none',
          border: this.props.border,
          borderRadius: this.props.borderRadius,
          boxShadow: this.props.boxShadow,
          background: this.props.background,
          appearance: 'none',
          WebkitAppearance: 'none'
        },
        suggestions: {
          list: {
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '3px',
            overflow: 'hidden',
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15)'
          },
          item: {
            fontSize: '15px',
            lineHeight: '22px',
            padding: '5px 15px',
            borderBottom: '1px solid #ccc',

            '&focused': {
              backgroundColor: '#f4f4f4'
            }
          }
        }
      }
    };

    const mentionStyle = {
      paddingTop: '3px',
      paddingBottom: '3px',
      borderRadius: '3px',
      backgroundColor: transparentize(0.9, this.props.theme.colorText)
    };

    this.setState({ style, mentionStyle });
  }

  mentionDisplayTransform = (_id, display) => {
    return `@${display}`;
  }

  handleOnChange = (event) => {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }

  handleOnFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  handleOnBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  setRef = () => {
    if (this.textareaElement && this.textareaElement.current && this.props.getTextareaRef) {
      this.props.getTextareaRef(this.textareaElement.current as HTMLTextAreaElement);
    }
  }

  getUsers = async (query: string, callback) => {
    let users: any[] = [];

    if (isString(query) && !isEmpty(query)) {
      const mention = query.toLowerCase();
      const queryParameters = { mention };

      if (this.props.ideaId) {
        queryParameters['idea_id'] = this.props.ideaId;
      }

      const response = await mentionsStream({ queryParameters }).observable.pipe(first()).toPromise();

      if (response && response.data && response.data.length > 0) {
        users = response.data.map((user) => ({
          display: `${user.attributes.first_name} ${user.attributes.last_name ? user.attributes.last_name : ''}`,
          id: user.attributes.slug
        }));
      }
    }

    callback(users);
  }

  render() {
    const { style, mentionStyle } = this.state;
    const { name, placeholder, value, error, children, rows, id, className, placeholderFontWeight, ariaLabel } = this.props;

    if (style) {
      return (
        <Container
          className={className}
          placeholderFontWeight={placeholderFontWeight}
        >
          <MentionsInput
            id={id}
            style={style}
            className="textareaWrapper"
            name={name || ''}
            rows={rows}
            value={value || ''}
            placeholder={placeholder}
            displayTransform={this.mentionDisplayTransform}
            markup={'@[__display__](__id__)'}
            onChange={this.handleOnChange}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            aria-label={ariaLabel}
            ref={this.setRef}
            inputRef={this.textareaElement}
          >
            <Mention
              trigger="@"
              data={this.getUsers}
              appendSpaceOnAdd={true}
              style={mentionStyle}
            />
          </MentionsInput>
          {children}
          <Error text={error} />
        </Container>
      );
    }

    return null;
  }
}

export default withTheme(MentionsTextArea);

import React, { PureComponent } from 'react';
import { isString, isEmpty, capitalize } from 'lodash-es';
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

// typings
import { Locale } from 'typings';

const Container = styled.div<{ placeholderFontWeight: string }>`
  position: relative;

  textarea {
    &:focus {
      border-color: ${colors.focussedBorder} !important;
      box-shadow: 0px 0px 1px 1px ${transparentize(0.4, colors.focussedBorder)} !important;
    }

    &::placeholder {
      font-weight: ${props => props.placeholderFontWeight} !important;
    }
  }

  .textareaWrapper__suggestions__list li:last-child {
    border: none !important;
  }
`;

export interface InputProps {
  id?: string;
  className?: string;
  name: string;
  value?: string | null;
  locale?: Locale;
  placeholder?: string;
  rows: number;
  postId?: string;
  postType?: 'idea' | 'initiative';
  error?: string | null;
  onChange?: (arg: string, locale: Locale | undefined) => void;
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
}

interface Props extends InputProps {
  theme: any;
}

interface State {
  style: object | null;
  mentionStyle: object | null;
}

class MentionsTextArea extends PureComponent<Props, State> {
  textareaElement = React.createRef();

  static defaultProps = {
    color: colors.text,
    fontSize: `${fontSizes.base}px`,
    fontWeight: '400',
    lineHeight: '24px',
    padding: '24px',
    border: `solid 1px ${colors.border}`,
    borderRadius: '3px',
    boxShadow: 'none',
    background: '#fff',
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
      paddingLeft: '0px',
      paddingRight: '1px',
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
      this.props.onChange(event.target.value, this.props.locale);
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
      const { postId, postType } = this.props;

      if (postId && postType) {
        queryParameters['post_id'] = postId;
        queryParameters['post_type'] = capitalize(postType);
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
          placeholderFontWeight={placeholderFontWeight as string}
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

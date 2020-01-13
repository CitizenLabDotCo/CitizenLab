import React, { PureComponent } from 'react';
import { isNilOrError, toggleElementInArray } from 'utils/helperUtils';

import { IParticipationContextType } from 'typings';

import Button from 'components/UI/Button';

import { IPollQuestion } from 'services/pollQuestions';
import { addPollResponse } from 'services/pollResponses';

import styled from 'styled-components';
import { fontSizes, colors } from 'utils/styleUtils';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';
import PollSingleChoice from './PollSingleChoice';
import PollMultipleChoice from './PollMultipleChoice';

const PollContainer = styled.div`
  color: ${({ theme }) => theme.colorText};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const QuestionContainer = styled.div`
  width: 100%;
  padding: 20px;
  background: #fff;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.06);
  border-radius: ${(props: any) => props.theme.borderRadius};
`;

export const QuestionNumber = styled.span`
  font-size: ${fontSizes.medium}px;
  line-height: ${fontSizes.medium}px;
  font-weight: 600;
  background-color: ${colors.background};
  padding: 4px 7px;
  border-radius: ${(props: any) => props.theme.borderRadius};
  margin-right: 15px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 25px;
`;

export const QuestionText = styled.span`
  font-size: ${fontSizes.large}px;
  font-weight: 600;
`;

interface Props {
  questions: IPollQuestion[];
  projectId: string;
  id: string;
  type: IParticipationContextType;
  disabled: boolean;
}

interface State {
  answers: {
    [questionId: string]: string[];
  };
}

export class PollForm extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      answers: {},
    };
  }

  changeAnswerSingle = (questionId: string, optionId: string) => () => {
    this.setState(state => ({ answers: { ...state.answers, [questionId]: [optionId] } }));
  }

  changeAnswerMultiple = (questionId: string, optionId: string) => () => {
    this.setState(state => {
      const oldAnswer = state.answers[questionId] || [];

      toggleElementInArray(oldAnswer, optionId);

      return ({ answers: { ...state.answers, [questionId]: oldAnswer } });
    });
  }

  sendAnswer = () => {
    const { id, type, projectId } = this.props;
    const { answers } = this.state;
    if (this.validate()) {
      addPollResponse(id, type, Object.values(answers).flat(), projectId);
    }
  }

  validate = () => {
    const { answers } = this.state;
    const { questions, disabled } = this.props;
    // you can submit the form...
    return !disabled // when it's not disabled and...
    // each question has at least one answer, and this answer is a string (representing the option) and...
    && questions.every(question => typeof (answers[question.id] || [])[0] === 'string')
    // for multiple options questions...
    && questions.filter(question => question.attributes.question_type === 'multiple_options')
    // the number of answers must not be greater than the maximum of answer allowed.
      .every(question =>  question.attributes.max_options && answers[question.id].length <= question.attributes.max_options);
  }

  //

  render() {
    const { answers } = this.state;
    const { questions, disabled } = this.props;

    if (!isNilOrError(questions) && questions.length > 0) {
      const isValid = this.validate();

      return (
        <>
          <PollContainer className="e2e-poll-form">
            {questions.map((question, questionIndex) => question.attributes.question_type === 'single_option' ? (
              <PollSingleChoice
                key={questionIndex}
                question={question}
                index={questionIndex}
                value={(answers[question.id] || [])[0]}
                disabled={disabled}
                onChange={this.changeAnswerSingle}
              />
            ) : (
              <PollMultipleChoice
                key={questionIndex}
                question={question}
                index={questionIndex}
                value={answers[question.id]}
                disabled={disabled}
                onChange={this.changeAnswerMultiple}
              />
            ))}
          </PollContainer>
          <Button
            onClick={this.sendAnswer}
            size="2"
            disabled={!isValid}
            className="e2e-send-poll"
          >
            <FormattedMessage {...messages.sendAnswer} />
          </Button>
        </>
      );
    }

    return null;
  }
}

export default PollForm;

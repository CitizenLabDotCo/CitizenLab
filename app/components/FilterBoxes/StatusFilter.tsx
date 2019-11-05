import React, { memo, useCallback, MouseEvent } from 'react';
import { capitalize, get } from 'lodash-es';
import { isNilOrError } from 'utils/helperUtils';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// components
import T from 'components/T';
import Icon from 'components/UI/Icon';

// styling
import styled from 'styled-components';
import { fontSizes, colors, ScreenReaderOnly } from 'utils/styleUtils';
import { darken } from 'polished';
import { Header, Title } from './styles';

// typings
import { IIdeasFilterCounts } from 'services/ideas';
import { IIdeaStatusData } from 'services/ideaStatuses';
import { IInitiativesFilterCounts } from 'services/initiatives';
import { IInitiativeStatusData } from 'services/initiativeStatuses';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-top: 25px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background: #fff;
  border: 1px solid #ececec;
  border-radius: ${(props: any) => props.theme.borderRadius};
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.04);
`;

const Count = styled.span`
  color: ${colors.label};
  font-size: ${fontSizes.base}px;
  font-weight: 300;
  transition: all 80ms ease-out;
`;

const CloseIcon = styled(Icon)`
  width: 12px;
  height: 12px;
  fill: #fff;
`;

const Status = styled.button`
  color: ${({ theme }) => theme.colorText};
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 7px;
  padding-bottom: 7px;
  margin: 0px;
  margin-right: 10px;
  margin-bottom: 6px;
  cursor: pointer;
  border-radius: 5px;
  user-select: none;
  transition: all 80ms ease-out;

  &:not(.selected):hover {
    background: rgba(132, 147, 158, 0.15);
  }

  &.selected {
    color: #fff;
    background: ${({ theme }) => theme.colorSecondary};

    &:hover {
      background: ${({ theme }) => darken(0.15, theme.colorSecondary)};
    }

    ${Count} {
      color: #fff;
    }
  }
`;

const AllStatus = styled(Status)``;

interface Props {
  type: 'idea' | 'initiative';
  statuses: (IIdeaStatusData | IInitiativeStatusData)[];
  filterCounts: IIdeasFilterCounts | IInitiativesFilterCounts | null | undefined;
  selectedStatusId: string | null | undefined;
  onChange: (arg: string | null) => void;
  className?: string;
}

const StatusFilter = memo<Props>(({ type, statuses, filterCounts, selectedStatusId, onChange, className }) => {

  const handleOnClick = useCallback((event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const statusId = event.currentTarget.dataset.id as string;
    const nextSelectedStatusId = (selectedStatusId !== statusId ? statusId : null);
    onChange(nextSelectedStatusId);
  }, [selectedStatusId]);

  const removeFocus = useCallback((event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
  }, []);

  if (!isNilOrError(statuses) && statuses.length > 0) {
    const allIdeasCount = filterCounts && filterCounts.total ? filterCounts.total : 0;
    const selectedStatus = selectedStatusId && statuses.find(status => status.id === selectedStatusId);

    return (
      <Container className={`e2e-statuses-filters ${className}`}>
        <Header>
          <Title>
            <FormattedMessage {...messages.statusTitle} />
          </Title>
        </Header>

        <AllStatus
          data-id={null}
          onMouseDown={removeFocus}
          onClick={handleOnClick}
          className={!selectedStatusId ? 'selected' : ''}
        >
          <FormattedMessage {...messages.all} />
          <Count aria-hidden>
            {allIdeasCount}
          </Count>
          <ScreenReaderOnly>
            <FormattedMessage {...messages.a11y_numberOfIdeas} values={{ ideasCount: allIdeasCount }} />
          </ScreenReaderOnly>
        </AllStatus>

        {statuses.map((status) => {
          const filterIdeasCount = get(filterCounts, `${type}_status_id.${status.id}`, 0);
          const isFilterSelected = selectedStatusId === status.id;

          return (
            <Status
              key={status.id}
              data-id={status.id}
              onMouseDown={removeFocus}
              onClick={handleOnClick}
              className={`e2e-status ${isFilterSelected ? 'selected' : ''}`}
            >
              <T value={status.attributes.title_multiloc}>
                {statusTitle => <>{capitalize(statusTitle)}</>}
              </T>
              {!isFilterSelected ? (
                <Count aria-hidden>
                  {filterIdeasCount}
                </Count>
              ) : (
                <CloseIcon name="close" />
              )}
              <ScreenReaderOnly>
                <FormattedMessage {...messages.a11y_numberOfIdeas} values={{ ideasCount: filterIdeasCount }} />
              </ScreenReaderOnly>
            </Status>
          );
        })}

        <ScreenReaderOnly aria-live="polite">
          {/* Pronounce selected status */}
          {selectedStatus ?
            <FormattedMessage
              {...messages.a11y_selectedStatus}
              values={{
                selectedStatus: <T value={selectedStatus.attributes.title_multiloc} />
              }}
            />
            :
            <FormattedMessage
              {...messages.a11y_selectedAllStatus}
            />
          }

          {/* Pronounce number of ideas per status */}
          <FormattedMessage
            {...messages.a11y_allIdeas}
            values={{
              allIdeasCount
            }}
          />
          {statuses.map(status => {
            const filterIdeasCount = get(filterCounts, `${type}_status_id.${status.id}`, 0);
            return `${<T value={status.attributes.title_multiloc} />}: ${filterIdeasCount}`;
          })}
        </ScreenReaderOnly>
      </Container>
    );
  }

  return null;
});

export default StatusFilter;

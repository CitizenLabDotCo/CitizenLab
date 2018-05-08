import React from 'react';
import { adopt } from 'react-adopt';
import * as moment from 'moment';
import 'moment-timezone';

// components
import Icon from 'components/UI/Icon';

// services
import { IEventData } from 'services/events';

// resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';

// i18n
import { getLocalized } from 'utils/i18n';
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';

// style
import styled from 'styled-components';
import { media } from 'utils/styleUtils';

const Container = styled.div`
  width: 100%;
  padding: 20px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  border: solid 1px #e4e4e4;
  background: #fff;

  ${media.smallerThanMaxTablet`
    flex-direction: column;
  `}
`;

const EventDateInfo = styled.div`
  flex: 0 0 80px;
  display: flex;
  flex-direction: column;

  ${media.smallerThanMaxTablet`
    width: 100%;
    flex: 1 1 auto;
    order: 1;
  `}
`;

const EventDates = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background: #f64a00;

  &.past {
    background: #cfcfcf;
  }

  ${media.smallerThanMaxTablet`
    
  `}
`;

const EventDate = styled.div`
  color: #fff;
  font-size: 23px;
  line-height: 27px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EventDatesSeparator = styled.div`
  color: #fff;
  font-size: 23px;
  line-height: 27px;
  font-weight: 500;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const EventYear = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background: #373737;

  &.past {
    background: #a7a7a7;
  }
`;

const EventInformation = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 40px;

  &.past {
    opacity: 0.6;
  }

  ${media.smallerThanMaxTablet`
    flex-direction: column;
    order: 3;
    border: none;
    padding-right: 0;
    margin-left: 0;
  `}
`;

const EventTime = styled.div`
  color: #666;
  font-size: 17px;
  font-weight: 300;
`;

const EventTitle = styled.div`
  color: #333;
  font-size: 20px;
  line-height: 23px;
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const EventDescription = styled.div`
  color: #939393;
  font-size: 16px;
  font-weight: 300;
  line-height: 21px;

  strong {
    font-weight: 600;
  }
`;

const EventLocationWrapper = styled.div`
  flex: 0 0 300px;
  padding: 20px;
  display: flex;
  align-items: center;
  border-left: 1px solid #e0e0e0;
  margin-left: 60px;

  &.past {
    opacity: 0.6;
  }

  ${media.smallerThanMaxTablet`
    flex: 1;
    order: 2;
    align-items: left;
    padding: 0;
    margin: 0;
    margin-top: 30px;
    margin-bottom: 15px;
    border: none;
  `}
`;

const EventLocation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 40px;
  margin-right: 30px;

  ${media.smallerThanMaxTablet`
    margin: 0;
  `}
`;

const MapIcon = styled(Icon)`
  height: 28px;
  fill: #666;
  margin-right: 20px;
`;

const EventLocationInner = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventLocationLabel = styled.div`
  color: #666;
  font-size: 16px;
  font-weight: 300;
  line-height: 21px;
  margin-bottom: 2px;
`;

const EventLocationAddress = styled.div`
  color: #666;
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  display: flex;
  align-items: center;
`;

interface InputProps {
  event: IEventData;
}

interface DataProps {
  locale: GetLocaleChildProps;
  tenant: GetTenantChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {}

class Event extends React.PureComponent<Props, State> {
  render() {
    const className = this.props['className'];
    const { locale, tenant, event } = this.props;

    if (locale && tenant && event !== null) {
      const tenantLocales = tenant.attributes.settings.core.locales;
      const eventTitle = getLocalized(event.attributes.title_multiloc, locale, tenantLocales);
      const eventDescription = getLocalized(event.attributes.description_multiloc, locale, tenantLocales);
      const eventLocationAddress = getLocalized(event.attributes.location_multiloc, locale, tenantLocales);
      const startAtMoment = moment(event.attributes.start_at);
      const endAtMoment = moment(event.attributes.end_at);
      const currentIsoDate = moment().format('YYYY-MM-DD');
      const startAtIsoDate = moment(event.attributes.start_at).format('YYYY-MM-DD');
      const endAtIsoDate = moment(event.attributes.end_at).format('YYYY-MM-DD');
      let startAtTime = startAtMoment.format('LT');
      let endAtTime = endAtMoment.format('LT');
      const startAtDay = startAtMoment.format('DD');
      const endAtDay = endAtMoment.format('DD');
      const startAtMonth = startAtMoment.format('MMM');
      const endAtMonth = endAtMoment.format('MMM');
      const startAtYear = startAtMoment.format('YYYY');
      const isMultiDayEvent = (startAtIsoDate !== endAtIsoDate);
      let eventStatus: 'past' | 'present' | 'future' = 'past';

      if (moment(currentIsoDate).isBetween(startAtIsoDate, endAtIsoDate, 'days', '[]')) {
        eventStatus = 'present';
      } else if (moment(startAtIsoDate).isAfter(currentIsoDate)) {
        eventStatus =  'future';
      }

      if (isMultiDayEvent) {
        startAtTime = startAtMoment.format('D MMM LT');
        endAtTime = endAtMoment.format('D MMM LT');
      }

      return (
        <Container className={`${className} ${eventStatus}`}>
          <EventDateInfo>
            <EventDates className={eventStatus}>
              <EventDate>
                <span>{startAtDay}</span>
                <span>{startAtMonth}</span>
              </EventDate>

              {isMultiDayEvent && (
                <>
                  <EventDatesSeparator>
                    -
                  </EventDatesSeparator>
                  <EventDate>
                    <span>{endAtDay}</span>
                    <span>{endAtMonth}</span>
                  </EventDate>
                </>
              )}
            </EventDates>

            <EventYear className={eventStatus}>
              <span>{startAtYear}</span>
            </EventYear>
          </EventDateInfo>

          <EventInformation className={eventStatus}>
            <EventTime>
              {startAtTime} - {endAtTime}
            </EventTime>

            <EventTitle>
              {eventTitle}
            </EventTitle>

            <EventDescription>
              <span dangerouslySetInnerHTML={{ __html: eventDescription }} />
            </EventDescription>
          </EventInformation>

          {eventLocationAddress &&
            <EventLocationWrapper className={eventStatus}>
              <EventLocation>
                <MapIcon name="mapmarker" />

                <EventLocationInner>
                  <EventLocationLabel>
                    <FormattedMessage {...messages.location} />
                  </EventLocationLabel>
                  <EventLocationAddress>
                    {eventLocationAddress}
                  </EventLocationAddress>
                </EventLocationInner>
              </EventLocation>
            </EventLocationWrapper>
          }
        </Container>
      );
    }

    return null;
  }
}

const Data = adopt<DataProps, InputProps>({
  locale: <GetLocale />,
  tenant: <GetTenant />
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <Event {...inputProps} {...dataProps} />}
  </Data>
);

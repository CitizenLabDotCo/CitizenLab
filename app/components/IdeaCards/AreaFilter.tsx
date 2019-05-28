import React, { memo, useMemo, useCallback, useState, useEffect } from 'react';
import { isNilOrError } from 'utils/helperUtils';

// components
import MultipleSelect from 'components/UI/MultipleSelect';

// resources
import GetAreas, { GetAreasChildProps } from 'resources/GetAreas';

// i18n
import messages from './messages';
import localize, { InjectedLocalized } from 'utils/localize';
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';

// styling
import styled from 'styled-components';
import { Header, Title } from './styles';

// typings
import { IOption } from 'typings';

const Container = styled.div`
  width: 100%;
  padding: 20px;
  padding-top: 25px;
  padding-bottom: 25px;
  background: #fff;
  border: 1px solid #ececec;
  border-radius: ${(props: any) => props.theme.borderRadius};
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.04);
`;

interface InputProps {
  onChange: (arg: string[]) => void;
  className?: string;
}

interface DataProps {
  areas: GetAreasChildProps;
}

interface Props extends InputProps, DataProps {}

const AreaFilter = memo<Props & InjectedIntlProps & InjectedLocalized>(({ onChange, className, localize, intl, areas }) => {

  const [selectedOptions, setSelectedOptions] = useState<IOption[] | null>(null);

  const options = useMemo(() => {
    if (!isNilOrError(areas)) {
      return areas.map((area) => ({
        value: area.id,
        label: localize(area.attributes.title_multiloc)
      }));
    }

    return [];
  }, [areas]);

  const handleOnChange = useCallback((options: IOption[]) => {
    setSelectedOptions(options);
  }, []);

  useEffect(() => {
    let areaIds: string[] = [];

    if (selectedOptions && selectedOptions.length > 0) {
      areaIds = selectedOptions.map(area => area.value);
    }

    onChange(areaIds);
  }, [selectedOptions]);

  const placeholder = intl.formatMessage(messages.selectYourArea);

  return (
    <Container className={className}>
      <Header>
        <Title>
          <FormattedMessage {...messages.areas} />
        </Title>
      </Header>

      <MultipleSelect
        value={selectedOptions}
        options={options}
        onChange={handleOnChange}
        placeholder={placeholder}
      />
    </Container>
  );
});

const AreaFilterWithHoC = injectIntl(localize(AreaFilter));

export default (inputProps) => (
  <GetAreas>
    {(areas) => <AreaFilterWithHoC {...inputProps} areas={areas} />}
  </GetAreas>
);

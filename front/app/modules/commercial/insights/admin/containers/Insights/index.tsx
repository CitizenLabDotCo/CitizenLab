import React from 'react';

// i18n
import { InjectedIntlProps } from 'react-intl';

// components
import EmptyState from './EmptyState';
// import InsightsList from './InsightsList';

const Insights: React.FC<InjectedIntlProps> = () => {
  return (
    <div>
      <EmptyState />
      {/* TODO: Add logic on which component to show
      <InsightsList />  */}
    </div>
  );
};

export default Insights;
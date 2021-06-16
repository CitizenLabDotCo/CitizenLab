import { useState, useEffect } from 'react';
import {
  insightsCategoriesStream,
  IInsightsCategoryData,
} from '../services/insightsCategories';

const useInsightsCategories = (viewId: string) => {
  const [insightsCategories, setInsightsCategories] = useState<
    IInsightsCategoryData[] | undefined | null | Error
  >(undefined);

  useEffect(() => {
    const subscription = insightsCategoriesStream(viewId).observable.subscribe(
      (insightsCategories) => {
        setInsightsCategories(insightsCategories.data);
      }
    );

    return () => subscription.unsubscribe();
  }, [viewId]);

  return insightsCategories;
};

export default useInsightsCategories;

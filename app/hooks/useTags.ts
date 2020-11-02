import { useState, useEffect, useCallback } from 'react';
import {
  ITag,
  tagAssignmentsSuggestionStream,
  tagSuggestionStream,
} from 'services/tags';
import useLocale from 'hooks/useLocale';

export interface IAutoTag extends ITag {
  idea_ids: string[];
}

export default function useTagSuggestion() {
  const [tagSuggestion, setTagSuggestion] = useState<
    IAutoTag[] | null | undefined
  >(undefined);

  const [ideaIds, setIdeaIds] = useState<string[] | null | undefined>([]);

  const locale = useLocale();

  const onIdeasChange = useCallback((ideas: string[]) => {
    setIdeaIds([...ideas]);
  }, []);

  useEffect(() => {
    const observable = tagSuggestionStream({
      queryParameters: { idea_ids: ideaIds, locale },
    }).observable;

    const subscription = observable.subscribe((response) => {
      console.log(ideaIds, locale);
      console.log(response);
      tagAssignmentsSuggestionStream({
        queryParameters: {
          idea_ids: ideaIds,
          locale,
          tag_ids: response.data.map((tag) => tag.id),
        },
      }).observable.subscribe((assignments) => {
        console.log(assignments);
        setTagSuggestion(
          response.data.map((tag) => ({
            ...tag,
            idea_ids: assignments.data
              .filter((assignment) => assignment.attributes.tag_id === tag.id)
              .map((assignment) => assignment.attributes.idea_id),
          }))
        );
      });
    });

    return () => subscription.unsubscribe();
  }, [ideaIds]);

  return { tagSuggestion, onIdeasChange };
}

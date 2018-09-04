import { Observer, Observable } from 'rxjs';
import { first, startWith, scan, filter, distinctUntilChanged, publishReplay, refCount } from 'rxjs/operators';
import { isObject, isEmpty } from 'lodash-es';
import shallowCompare from 'utils/shallowCompare';

export interface ILocalStateService<T> {
  observer: Observer<T>;
  observable: Observable<T>;
  set: (newState: Partial<T>) => void;
  get: () => Promise<T>;
}

export function localState<T>(initialState: T): ILocalStateService<T> {
  const service: ILocalStateService<T> = {
    observer: null as any,
    observable: null as any,
    set: null as any,
    get: null as any
  };

  service.observable = new Observable<T>((observer) => {
    service.observer = observer;
    service.observer.next(initialState);
  })
  .pipe(
    startWith({} as T),
    scan((oldState: T, updatedStateProperties) => {
      const newState = {
        ...oldState as any,
        ...updatedStateProperties as any
      } as T;

      return newState;
    }),
    filter(state => isObject(state) && !isEmpty(state)),
    distinctUntilChanged((oldState, newState) => shallowCompare(oldState, newState)),
    publishReplay(1),
    refCount()
  );

  service.set = (updatedStateProperties: Partial<T>) => service.observer.next(updatedStateProperties as any);

  service.get = () => service.observable.pipe(
    first()
  ).toPromise();

  return service;
}

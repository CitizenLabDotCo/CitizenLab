import 'whatwg-fetch';
import { Observer, Observable, Subscription } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { retry, catchError, startWith, scan, filter, distinctUntilChanged, refCount, publishReplay } from 'rxjs/operators';
import { includes, forOwn, isError, isNil, isArray, isString, isObject, isEmpty, isFunction, cloneDeep, has, omit, forEach, union } from 'lodash';
import request from 'utils/request';
import { authApiEndpoint } from 'services/auth';

export type pureFn<T> = (arg: T) => T;
type fetchFn = () => Promise<{}>;
interface IObject{ [key: string]: any; }
export type IObserver<T> = Observer<T | pureFn<T> | null>;
export type IObservable<T> = Observable<T>;
export interface IStreamParams {
  bodyData?: IObject | null;
  queryParameters?: IObject | null;
  cacheStream?: boolean;
}
export interface IInputStreamParams extends IStreamParams {
  apiEndpoint: string;
}
interface IExtendedStreamParams {
  apiEndpoint: string;
  cacheStream?: boolean;
  bodyData: IObject | null;
  queryParameters: IObject | null;
}
export interface IStream<T> {
  params: IExtendedStreamParams;
  streamId: string;
  isQueryStream: boolean;
  isSearchQuery: boolean;
  isSingleItemStream: boolean;
  cacheStream?: boolean;
  type: 'singleObject' | 'arrayOfObjects' | 'unknown';
  fetch: fetchFn;
  observer: IObserver<T>;
  observable: IObservable<T>;
  subscription?: Subscription;
  dataIds: { [key: string]: true };
}

class Streams {
  public streams: { [key: string]: IStream<any>};
  public resourcesByDataId: { [key: string]: any };
  public streamIdsByApiEndPointWithQuery: { [key: string]: string[] };
  public streamIdsByApiEndPointWithoutQuery: { [key: string]: string[] };
  public streamIdsByDataIdWithoutQuery: { [key: string]: string[] };
  public streamIdsByDataIdWithQuery: { [key: string]: string[] };

  constructor() {
    this.streams = {};
    this.resourcesByDataId = {};
    this.streamIdsByApiEndPointWithQuery = {};
    this.streamIdsByApiEndPointWithoutQuery = {};
    this.streamIdsByDataIdWithoutQuery = {};
    this.streamIdsByDataIdWithQuery = {};
  }

  reset() {
    this.resourcesByDataId = {};
    this.streamIdsByApiEndPointWithQuery = {};
    this.streamIdsByApiEndPointWithoutQuery = {};
    this.streamIdsByDataIdWithoutQuery = {};
    this.streamIdsByDataIdWithQuery = {};

    Object.keys(this.streams)
      .filter(streamId => streamId !== authApiEndpoint)
      .forEach((streamId) => {
        if (this.isActiveStream(streamId)) {
          this.streams[streamId].fetch();
        } else {
          this.deleteStream(streamId, this.streams[streamId].params.apiEndpoint);
        }
      });
  }

  deepFreeze<T>(object: T): T {
    let frozenObject = object;

    if (frozenObject && !Object.isFrozen(frozenObject)) {
      let property;
      let propertyKey;

      frozenObject = Object.freeze(object);

      for (propertyKey in frozenObject) {
        if (frozenObject.hasOwnProperty(propertyKey)) {
          property = frozenObject[propertyKey];

          if (((typeof property !== 'object') || !(property instanceof Object)) || Object.isFrozen(property)) {
            continue;
          }

          this.deepFreeze(property);
        }
      }
    }

    return frozenObject;
  }

  isActiveStream(streamId: string) {
    const refCount = cloneDeep(this.streams[streamId].observable.source['_refCount']);
    const cacheStream = cloneDeep(this.streams[streamId].cacheStream);

    if ((cacheStream && refCount > 1) || (!cacheStream && refCount > 0)) {
      return true;
    }

    return false;
  }

  deleteStream(streamId: string, apiEndpoint: string) {
    if (includes(this.streamIdsByApiEndPointWithQuery[apiEndpoint], streamId)) {
      this.streamIdsByApiEndPointWithQuery[apiEndpoint] = this.streamIdsByApiEndPointWithQuery[apiEndpoint].filter((value) => {
        return value !== streamId;
      });
    }

    if (includes(this.streamIdsByApiEndPointWithoutQuery[apiEndpoint], streamId)) {
      this.streamIdsByApiEndPointWithoutQuery[apiEndpoint] = this.streamIdsByApiEndPointWithoutQuery[apiEndpoint].filter((value) => {
        return value !== streamId;
      });
    }

    if (streamId && this.streams[streamId]) {
      Object.keys(this.streams[streamId].dataIds).forEach((dataId) => {
        if (includes(this.streamIdsByDataIdWithQuery[dataId], streamId)) {
          this.streamIdsByDataIdWithQuery[dataId] =  this.streamIdsByDataIdWithQuery[dataId].filter((value) => {
            return value !== streamId;
          });
        }

        if (includes(this.streamIdsByDataIdWithoutQuery[dataId], streamId)) {
          this.streamIdsByDataIdWithoutQuery[dataId] = this.streamIdsByDataIdWithoutQuery[dataId].filter((value) => {
            return value !== streamId;
          });
        }
      });
    }

    if (this.streams[streamId] && this.streams[streamId].subscription) {
      (this.streams[streamId].subscription as Subscription).unsubscribe();
    }

    delete this.streams[streamId];
  }

  isUUID(string) {
    const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegExp.test(string);
  }

  sanitizeQueryParameters = (queryParameters: IObject | null) => {
    const sanitizedQueryParameters = cloneDeep(queryParameters);

    forOwn(queryParameters, (value, key) => {
      if (isNil(value) || (isString(value) && isEmpty(value)) || (isArray(value) && isEmpty(value)) || (isObject(value) && isEmpty(value))) {
        delete (sanitizedQueryParameters as IObject)[key];
      }
    });

    return (isObject(sanitizedQueryParameters) && !isEmpty(sanitizedQueryParameters) ? sanitizedQueryParameters : null);
  }

  isSingleItemStream(lastUrlSegment: string, isQueryStream: boolean) {
    if (!isQueryStream) {
      return this.isUUID(lastUrlSegment);
    }

    return false;
  }

  removeTrailingSlash(apiEndpoint: string) {
    return apiEndpoint.replace(/\/$/, '');
  }

  getSerializedUrl(apiEndpoint: string, isQueryStream: boolean, queryParameters: IObject | null, cacheStream: boolean) {
    let serializedUrl = apiEndpoint;

    if (queryParameters !== null && isQueryStream) {
      serializedUrl = apiEndpoint + '?' + Object.keys(queryParameters).sort().map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent((queryParameters)[key]);
      }).join('&');

      if (!cacheStream) {
        serializedUrl += '&cache_stream=false';
      }
    } else if (!cacheStream) {
      serializedUrl += '?cache_stream=false';
    }

    return serializedUrl;
  }

  addStreamIdByDataIdIndex(streamId: string, isQueryStream: boolean, dataId: string) {
    if (isQueryStream) {
      if (this.streamIdsByDataIdWithQuery[dataId] && !includes(this.streamIdsByDataIdWithQuery[dataId], streamId)) {
        this.streamIdsByDataIdWithQuery[dataId].push(streamId);
      } else if (!this.streamIdsByDataIdWithQuery[dataId]) {
        this.streamIdsByDataIdWithQuery[dataId] = [streamId];
      }
    }

    if (!isQueryStream) {
      if (this.streamIdsByDataIdWithoutQuery[dataId] && !includes(this.streamIdsByDataIdWithoutQuery[dataId], streamId)) {
        this.streamIdsByDataIdWithoutQuery[dataId].push(streamId);
      } else if (!this.streamIdsByDataIdWithoutQuery[dataId]) {
        this.streamIdsByDataIdWithoutQuery[dataId] = [streamId];
      }
    }
  }

  addStreamIdByApiEndpointIndex(apiEndpoint: string, streamId: string, isQueryStream: boolean) {
    if (isQueryStream) {
      if (!this.streamIdsByApiEndPointWithQuery[apiEndpoint]) {
        this.streamIdsByApiEndPointWithQuery[apiEndpoint] = [streamId];
      } else {
        this.streamIdsByApiEndPointWithQuery[apiEndpoint].push(streamId);
      }
    }

    if (!isQueryStream) {
      if (!this.streamIdsByApiEndPointWithoutQuery[apiEndpoint]) {
        this.streamIdsByApiEndPointWithoutQuery[apiEndpoint] = [streamId];
      } else {
        this.streamIdsByApiEndPointWithoutQuery[apiEndpoint].push(streamId);
      }
    }
  }

  get<T>(inputParams: IInputStreamParams) {
    const params: IExtendedStreamParams = { bodyData: null, queryParameters: null, ...inputParams };
    const apiEndpoint = this.removeTrailingSlash(params.apiEndpoint);
    const queryParameters = this.sanitizeQueryParameters(params.queryParameters);
    const isQueryStream = (isObject(queryParameters) && !isEmpty(queryParameters));
    const isSearchQuery = (isQueryStream && queryParameters && queryParameters['search'] && isString(queryParameters['search']) && !isEmpty(queryParameters['search']));
    const cacheStream = ((isSearchQuery || inputParams.cacheStream === false) ? false : true);
    const streamId = this.getSerializedUrl(apiEndpoint, isQueryStream, queryParameters, cacheStream);

    if (!has(this.streams, streamId)) {
      const { bodyData } = params;
      const lastUrlSegment = apiEndpoint.substr(apiEndpoint.lastIndexOf('/') + 1);
      const isSingleItemStream = this.isSingleItemStream(lastUrlSegment, isQueryStream);
      const observer: IObserver<T | null> = (null as any);

      const fetch = () => {
        return new Promise((resolve, reject) => {
          const promise = request<any>(apiEndpoint, bodyData, { method: 'GET' }, queryParameters);

          fromPromise(promise).pipe(
            retry(3),
            catchError(() => of(new Error(`promise for stream ${streamId} did not resolve`)))
          ).subscribe((response) => {
            if (!this.streams[streamId]) {
              console.log(`no stream exists for ${streamId}`);
            } else {
              if (!isError(response)) {
                this.streams[streamId].observer.next(response);
                resolve(response);
              } else {
                if (streamId !== authApiEndpoint) {
                  const apiEndpoint = cloneDeep(this.streams[streamId].params.apiEndpoint);
                  this.streams[streamId].observer.next(response);
                  this.deleteStream(streamId, apiEndpoint);
                } else {
                  this.streams[streamId].observer.next(null);
                }

                reject();
              }
            }
          });
        });
      };

      const observable = new Observable<T | null>((observer) => {
        const dataId = lastUrlSegment;
        this.streams[streamId].observer = observer;

        if (cacheStream && isSingleItemStream && has(this.resourcesByDataId, dataId)) {
          observer.next(this.resourcesByDataId[dataId]);
        } else {
          fetch();
        }

        return () => {
          this.deleteStream(streamId, apiEndpoint);
        };
      }).pipe(
        startWith('initial' as any),
        scan((accumulated: T, current: T | pureFn<T>) => {
          let data: any = accumulated;
          const dataIds = {};

          this.streams[streamId].type = 'unknown';

          if (data !== 'inital') {
            data = (isFunction(current) ? current(data) : current);

            if (isObject(data) && !isEmpty(data)) {
              const innerData = data.data;

              if (isArray(innerData)) {
                this.streams[streamId].type = 'arrayOfObjects';
                innerData.filter(item => has(item, 'id')).forEach((item) => {
                  const dataId = item.id;
                  dataIds[dataId] = true;
                  if (cacheStream) { this.resourcesByDataId[dataId] = this.deepFreeze({ data: item }); }
                  this.addStreamIdByDataIdIndex(streamId, isQueryStream, dataId);
                });
              } else if (isObject(innerData) && has(innerData, 'id')) {
                const dataId = innerData.id;
                this.streams[streamId].type = 'singleObject';
                dataIds[dataId] = true;
                if (cacheStream) { this.resourcesByDataId[dataId] = this.deepFreeze({ data: innerData }); }
                this.addStreamIdByDataIdIndex(streamId, isQueryStream, dataId);
              }

              if (has(data, 'included')) {
                data.included.filter(item => item.id).forEach((item) => {
                  this.resourcesByDataId[item.id] = this.deepFreeze({ data: item });
                });

                data = omit(data, 'included');
              }
            }
          }

          this.streams[streamId].dataIds = dataIds;

          return this.deepFreeze(data);
        }),
        filter(data => data !== 'initial'),
        distinctUntilChanged(),
        publishReplay(1),
        refCount()
      );

      this.streams[streamId] = {
        params,
        fetch,
        observer,
        observable,
        streamId,
        isQueryStream,
        isSearchQuery,
        isSingleItemStream,
        cacheStream,
        type: 'unknown',
        dataIds: {}
      };

      this.addStreamIdByApiEndpointIndex(apiEndpoint, streamId, isQueryStream);

      if (cacheStream) {
        // keep stream hot
        this.streams[streamId].subscription = this.streams[streamId].observable.subscribe();
      }

      return this.streams[streamId] as IStream<T>;
    }

    return this.streams[streamId] as IStream<T>;
  }

  async add<T>(unsafeApiEndpoint: string, bodyData: object | null) {
    const apiEndpoint = this.removeTrailingSlash(unsafeApiEndpoint);

    try {
      const response = await request<T>(apiEndpoint, bodyData, { method: 'POST' }, null);

      forEach(this.streamIdsByApiEndPointWithoutQuery[apiEndpoint], (streamId) => {
        const stream = this.streams[streamId];

        if (!stream.cacheStream) {
          stream.fetch();
        } else {
          stream.observer.next((previous) => (this.deepFreeze({
            ...previous,
            data: [...previous.data, response['data']]
          })));
        }
      });

      forEach(this.streamIdsByApiEndPointWithQuery[apiEndpoint], (streamId) => {
        this.streams[streamId].fetch();
      });

      return response;
    } catch (error) {
      if (error.json && error.json.errors) {
        return Promise.reject(error);
      }
      throw `error for add() of Streams for api endpoint ${apiEndpoint}`;
    }
  }

  async update<T>(unsafeApiEndpoint: string, dataId: string, bodyData: object) {
    const apiEndpoint = this.removeTrailingSlash(unsafeApiEndpoint);

    try {
      const response = await request<T>(apiEndpoint, bodyData, { method: 'PATCH' }, null);

      union(
        this.streamIdsByDataIdWithoutQuery[dataId],
        this.streamIdsByDataIdWithQuery[dataId]
      ).forEach((streamId) => {
        const stream = this.streams[streamId];
        const streamHasDataId = has(stream, `dataIds.${dataId}`);

        if (!stream.cacheStream) {
          stream.fetch();
        } else if (streamHasDataId && stream.type === 'singleObject') {
          stream.observer.next(response);
        } else if (streamHasDataId && stream.type === 'arrayOfObjects') {
          stream.observer.next((previous) => (this.deepFreeze({
            ...previous,
            data: previous.data.map(child => child.id === dataId ? response['data'] : child)
          })));
        }
      });

      union(
        this.streamIdsByApiEndPointWithQuery[apiEndpoint],
        this.streamIdsByDataIdWithQuery[dataId]
      ).forEach((streamId) => {
        this.streams[streamId].fetch();
      });

      return response;
    } catch (error) {
      if (error.json && error.json.errors) {
        return Promise.reject(error);
      }
      throw `error for update() of Streams for api endpoint ${apiEndpoint}`;
    }
  }

  async delete(unsafeApiEndpoint: string, dataId: string) {
    const apiEndpoint = this.removeTrailingSlash(unsafeApiEndpoint);

    try {
      await request(apiEndpoint, null, { method: 'DELETE' }, null);

      union(
        this.streamIdsByDataIdWithoutQuery[dataId],
        this.streamIdsByDataIdWithQuery[dataId]
      ).forEach((streamId) => {
        const stream = this.streams[streamId];
        const streamHasDataId = has(stream, `dataIds.${dataId}`);

        if (!stream.cacheStream) {
          stream.fetch();
        } else if (streamHasDataId && stream.type === 'singleObject') {
          stream.observer.next(undefined);
        } else if (streamHasDataId && stream.type === 'arrayOfObjects') {
          stream.observer.next((previous) => (this.deepFreeze({
            ...previous,
            data: previous.data.filter(child => child.id !== dataId)
          })));
        }
      });

      union(
        this.streamIdsByApiEndPointWithQuery[apiEndpoint],
        this.streamIdsByDataIdWithQuery[dataId]
      ).forEach((streamId) => {
        this.streams[streamId].fetch();
      });

      return true;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log(error);
      }

      if (error.json && error.json.errors) {
        return Promise.reject(error);
      }

      throw `error for delete() of Streams for api endpoint ${apiEndpoint}`;
    }
  }

  async fetchAllStreamsWithEndpoint(apiEndpoint: string) {
    const promises: Promise<any>[] = [];

    union(
      this.streamIdsByApiEndPointWithQuery[apiEndpoint],
      this.streamIdsByApiEndPointWithoutQuery[apiEndpoint]
    ).forEach((streamId) => {
      promises.push(this.streams[streamId].fetch());
    });

    return await Promise.all(promises);
  }

  async fetchAllActiveStreamsWithEndpoint(apiEndpoint: string) {
    const promises: Promise<any>[] = [];

    union(
      this.streamIdsByApiEndPointWithQuery[apiEndpoint],
      this.streamIdsByApiEndPointWithoutQuery[apiEndpoint]
    ).forEach((streamId) => {
      if (this.isActiveStream(streamId)) {
        promises.push(this.streams[streamId].fetch());
      }
    });

    return await Promise.all(promises);
  }
}

const streams = new Streams();
export default streams;

import 'whatwg-fetch';
import * as Rx from 'rxjs/Rx';
import * as _ from 'lodash';
import { API_PATH } from 'containers/App/constants';
import request from 'utils/request';
import { v4 as uuid } from 'uuid';
import { store } from 'app';
import { mergeJsonApiResources } from 'utils/resources/actions';

export type pureFn<T> = (arg: T) => T;
type fetchFn<T> = () => Promise<{}>;
interface IObject{ [key: string]: any; }
export type IObserver<T> = Rx.Observer<T | pureFn<T> | null>;
export type IObservable<T> = Rx.Observable<T>;
export interface IStreamParams<T> {
  bodyData?: IObject | null;
  queryParameters?: IObject | null;
}
interface IInputStreamParams<T> extends IStreamParams<T> {
  apiEndpoint: string;
}
interface IExtendedStreamParams<T> {
  apiEndpoint: string;
  bodyData: IObject | null;
  queryParameters: IObject | null;
}
export interface IStream<T> {
  params: IExtendedStreamParams<T>;
  streamId: string;
  isQueryStream: boolean;
  isSingleItemStream: boolean;
  type: 'singleObject' | 'arrayOfObjects' | 'unknown';
  fetch: fetchFn<T>;
  observer: IObserver<T>;
  observable: IObservable<T>;
  dataIds: { [key: string]: true };
}

class Streams {
  public streams: { [key: string]: IStream<any>};
  private resourcesByDataId: { [key: string]: any };
  private resourcesByStreamId: { [key: string]: any };
  private streamIdsByApiEndPointWithQuery: { [key: string]: string[] };
  private streamIdsByApiEndPointWithoutQuery: { [key: string]: string[] };
  private streamIdsByDataIdWithoutQuery: { [key: string]: string[] };
  private streamIdsByDataIdWithQuery: { [key: string]: string[] };

  constructor() {
    this.streams = {};
    this.resourcesByDataId = {};
    this.resourcesByStreamId = {};
    this.streamIdsByApiEndPointWithQuery = {};
    this.streamIdsByApiEndPointWithoutQuery = {};
    this.streamIdsByDataIdWithoutQuery = {};
    this.streamIdsByDataIdWithQuery = {};
  }

  isUUID(string) {
    const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegExp.test(string);
  }

  isQuery(queryParameters: null | object) {
    return _.isObject(queryParameters) && !_.isEmpty(queryParameters);
  }

  getSerializedUrl(params: IExtendedStreamParams<any>) {
    const { apiEndpoint, queryParameters } = params;

    if (this.isQuery(queryParameters)) {
      return apiEndpoint + Object.keys(queryParameters as object).sort().map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent((queryParameters as object)[key]);
      }).join('&');
    }

    return apiEndpoint;
  }

  addStreamIdByDataIdIndex(stream: IStream<any>, dataId: string) {
    if (!stream.isQueryStream) {
      if (this.streamIdsByDataIdWithoutQuery[dataId] && !_.some(this.streamIdsByDataIdWithoutQuery[dataId], stream.streamId)) {
        this.streamIdsByDataIdWithoutQuery[dataId].push(stream.streamId);
      } else if (!this.streamIdsByDataIdWithoutQuery[dataId]) {
        this.streamIdsByDataIdWithoutQuery[dataId] = [stream.streamId];
      }
    } else {
      if (this.streamIdsByDataIdWithQuery[dataId] && !_.some(this.streamIdsByDataIdWithQuery[dataId], stream.streamId)) {
        this.streamIdsByDataIdWithQuery[dataId].push(stream.streamId);
      } else if (!this.streamIdsByDataIdWithQuery[dataId]) {
        this.streamIdsByDataIdWithQuery[dataId] = [stream.streamId];
      }
    }
  }

  addStreamIdByApiEndpointIndex(stream: IStream<any>) {
    const isQuery = stream.isQueryStream;
    const streamId = stream.streamId;
    const apiEndpoint = stream.params.apiEndpoint;

    if (isQuery) {
      if (!this.streamIdsByApiEndPointWithQuery[apiEndpoint]) {
        this.streamIdsByApiEndPointWithQuery[apiEndpoint] = [streamId];
      } else {
        this.streamIdsByApiEndPointWithQuery[apiEndpoint].push(streamId);
      }
    } else {
      if (!this.streamIdsByApiEndPointWithoutQuery[apiEndpoint]) {
        this.streamIdsByApiEndPointWithoutQuery[apiEndpoint] = [streamId];
      } else {
        this.streamIdsByApiEndPointWithoutQuery[apiEndpoint].push(streamId);
      }
    }
  }

  get<T>(inputParams: IInputStreamParams<T>) {
    const params: IExtendedStreamParams<T> = { bodyData: null, queryParameters: null, ...inputParams };
    const streamId = this.getSerializedUrl(params);

    if (!_.has(this.streams, streamId)) {
      let { apiEndpoint } = params;
      const { bodyData, queryParameters } = params;
      const lastUrlSegment = apiEndpoint.substr(apiEndpoint.lastIndexOf('/') + 1);
      const isQueryStream = this.isQuery(queryParameters);
      const isSingleItemStream = (!isQueryStream ? this.isUUID(lastUrlSegment) : false);
      const observer: IObserver<T | null> = (null as any);

      apiEndpoint = apiEndpoint.replace(/\/$/, '');

      const fetch = () => {
        return new Promise((resolve, reject) => {
          const promise = request<any>(apiEndpoint, bodyData, { method: 'GET' }, queryParameters);

          Rx.Observable.defer(() => promise).retry(2).subscribe(
            (response) => {
              console.log(`fetched data for ${streamId}`);

              if (this.streams[streamId]) {
                this.streams[streamId].observer.next(response);
              } else {
                console.log(`no stream exists for ${streamId}`);
              }

              resolve(response);
            },
            (error) => {
              console.log(`promise for stream ${streamId} did not resolve`);

              if (this.streams[streamId]) {
                this.streams[streamId].observer.next(null);
              } else {
                console.log(`no stream exists for ${streamId}`);
              }

              reject(error);
            }
          );
        });
      };

      const observable = (Rx.Observable.create((observer: IObserver<T | null>) => {
        const dataId = lastUrlSegment;
        this.streams[streamId].observer = observer;

        if (isSingleItemStream && _.has(this.resourcesByDataId, dataId)) {
          observer.next(this.resourcesByDataId[dataId]);
        } else if (_.has(this.resourcesByStreamId, streamId)) {
          observer.next(this.resourcesByStreamId[streamId]);
        } else {
          fetch();
        }

        return () => {
          console.log(`stream for stream ${streamId} completed`);
          delete this.streams[streamId];
        };
      }) as Rx.Observable<T | null>)
      .startWith('initial' as any)
      .scan((accumulated: T, current: T | pureFn<T>) => {
        let data: any = accumulated;
        const dataIds = {};

        this.streams[streamId].type = 'unknown';

        if (data !== 'inital') {
          data = (_.isFunction(current) ? current(data) : current);

          if (_.isObject(data) && !_.isEmpty(data)) {
            const innerData = data.data;

            if (_.isArray(innerData)) {
              this.streams[streamId].type = 'arrayOfObjects';
              innerData.filter(item => _.has(item, 'id')).forEach((item) => {
                const dataId = item.id;
                dataIds[dataId] = true;
                this.resourcesByDataId[dataId] = { data: item };
                this.addStreamIdByDataIdIndex(this.streams[streamId], dataId);
              });
            } else if (_.isObject(innerData) && _.has(innerData, 'id')) {
              const dataId = innerData.id;
              this.streams[streamId].type = 'singleObject';
              dataIds[dataId] = true;
              this.resourcesByDataId[dataId] = { data: innerData };
              this.addStreamIdByDataIdIndex(this.streams[streamId], dataId);
            }

            if (_.has(data, 'included')) {
              data.included.filter(item => item.id).forEach(item => this.resourcesByDataId[item.id] = { data: item });
              data = _.omit(data, 'included');
            }
          }

          if (!isSingleItemStream) {
            this.resourcesByStreamId[streamId] = data;
          }
        }

        this.streams[streamId].dataIds = dataIds;

        return data;
      })
      .filter(data => data !== 'initial')
      .distinctUntilChanged()
      .do(data => store.dispatch(mergeJsonApiResources(data)))
      .publishReplay(1)
      .refCount();

      this.streams[streamId] = {
        params,
        fetch,
        observer,
        observable,
        streamId,
        isQueryStream,
        isSingleItemStream,
        type: 'unknown',
        dataIds: {},
      };

      this.addStreamIdByApiEndpointIndex(this.streams[streamId]);

      // keep stream hot
      this.streams[streamId].observable.subscribe();

      return this.streams[streamId] as IStream<T>;
    }

    return this.streams[streamId] as IStream<T>;
  }

  async add<T>(unsafeApiEndpoint: string, bodyData: object | null) {
    const apiEndpoint = unsafeApiEndpoint.replace(/\/$/, '');

    try {
      const response = await request<T>(apiEndpoint, bodyData, { method: 'POST' }, null);

      _(this.streamIdsByApiEndPointWithoutQuery[apiEndpoint]).forEach((streamId) => {
        this.streams[streamId].observer.next((previous) => ({
          ...previous,
          data: [...previous.data, response['data']]
        }));
      });

      _(this.streamIdsByApiEndPointWithQuery[apiEndpoint]).forEach((streamId) => {
        console.log('zolg');
        this.streams[streamId].fetch();
      });

      return response;
    } catch (error) {
      console.log(error);
      throw `error for add() of Streams for api endpoint ${apiEndpoint}`;
    }
  }

  async update<T>(unsafeApiEndpoint: string, dataId: string, bodyData: object) {
    const apiEndpoint = unsafeApiEndpoint.replace(/\/$/, '');

    try {
      const response = await request<T>(apiEndpoint, bodyData, { method: 'PATCH' }, null);

      _(this.streamIdsByDataIdWithoutQuery[dataId]).forEach((streamId) => {
        const stream = this.streams[streamId];
        const streamHasDataId = _.has(stream, `dataIds.${dataId}`);

        if (streamHasDataId && stream.type === 'singleObject') {
          stream.observer.next(response);
        } else if (streamHasDataId && stream.type === 'arrayOfObjects') {
          console.log('zolg');
          stream.observer.next((previous) => ({
            ...previous,
            data: previous.data.map(child => child.id === dataId ? response['data'] : child)
          }));
        }
      });

      const streamsToReFetch = _.union(this.streamIdsByApiEndPointWithQuery[apiEndpoint], this.streamIdsByDataIdWithQuery[dataId]);
      streamsToReFetch.forEach((streamId) => this.streams[streamId].fetch());

      /*
      _(this.streamIdsByApiEndPointWithQuery[apiEndpoint]).forEach((streamId) => {
        this.streams[streamId].fetch();
      });
      */

      return response;
    } catch (error) {
      console.log(error);
      throw `error for update() of Streams for api endpoint ${apiEndpoint}`;
    }
  }

  async delete(unsafeApiEndpoint: string, dataId: string) {
    const apiEndpoint = unsafeApiEndpoint.replace(/\/$/, '');

    try {
      await request(apiEndpoint, null, { method: 'DELETE' }, null);

      _(this.streamIdsByDataIdWithoutQuery[dataId]).forEach((streamId) => {
        const stream = this.streams[streamId];
        const streamHasDataId = _.has(stream, `dataIds.${dataId}`);

        if (streamHasDataId && stream.type === 'singleObject') {
          stream.observer.next(undefined);
        } else if (streamHasDataId && stream.type === 'arrayOfObjects') {
          stream.observer.next((previous) => ({
            ...previous,
            data: previous.data.filter(child => child.id !== dataId)
          }));
        }
      });

      const streamsToReFetch = _.union(this.streamIdsByApiEndPointWithQuery[apiEndpoint], this.streamIdsByDataIdWithQuery[dataId]);
      streamsToReFetch.forEach((streamId) => this.streams[streamId].fetch());

      /*
      _(this.streamIdsByApiEndPointWithQuery[apiEndpoint]).forEach((streamId) => {
        this.streams[streamId].fetch();
      });
      */

      return true;
    } catch (error) {
      console.log(error);
      throw `error for delete() of Streams for api endpoint ${apiEndpoint}`;
    }
  }
}

const streams = new Streams();
export default streams;

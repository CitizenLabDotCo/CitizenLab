import { Observable } from 'rxjs/Observable';
import { observeIdeas } from 'services/ideas';
import 'whatwg-fetch';
import * as Rx from 'rxjs/Rx';
import * as _ from 'lodash';
import request from 'utils/request';
import { v4 as uuid } from 'uuid';

export type pureFn<T> = (arg: T) => T;
type fetchFn<T> = () => IObservable<T>;
interface IObject{ [key: string]: any; }
export type IObserver<T> = Rx.Observer<T | pureFn<T> | Error | 'fetch'>;
export type IObservable<T> = Rx.Observable<T>;
export interface IStreamParams<T> {
  bodyData?: IObject;
  httpMethod?: IObject;
  queryParameters?: IObject;
  localProperties?: IObject;
  onEachEmit?: pureFn<T>;
  streamName?: string;
}
interface IInputStreamParams<T> extends IStreamParams<T> {
  apiEndpoint: string;
}
interface IExtendedStreamParams<T> {
  apiEndpoint: string;
  bodyData: IObject | null;
  httpMethod: IObject | null;
  queryParameters: IObject | null;
  localProperties: IObject | null;
  onEachEmit: pureFn<T> | null;
  streamName: string | null;
}
export interface IStream<T> {
  streamId: string;
  streamName: string | null;
  type: 'singleItemStream' | 'arrayOfItemsStream' | 'unknown';
  apiEndpoint: string;
  bodyData: IObject | null;
  httpMethod: IObject | null;
  queryParameters: IObject | null;
  localProperties: IObject | null;
  onEachEmit: pureFn<T> | null;
  fetch: fetchFn<T> | null;
  observer: IObserver<T> | null;
  observable: IObservable<T>;
  data: T | null;
  dataIds: { [key: string]: true };
}

class Streams {
  public list: IStream<any>[];

  constructor() {
    this.list = [];
  }

  create<T>(inputParams: IInputStreamParams<T>) {
    const params: IExtendedStreamParams<T> = {
      bodyData: null,
      httpMethod: null,
      queryParameters: null,
      localProperties: null,
      onEachEmit: null,
      streamName: null,
      ...inputParams
    };
    const existingStream = <IStream<T>>this.list.find((stream) => {
      return (
        _.isEqual(stream.apiEndpoint, params.apiEndpoint) &&
        _.isEqual(stream.bodyData, params.bodyData) &&
        _.isEqual(stream.httpMethod, params.httpMethod) &&
        _.isEqual(stream.queryParameters, params.queryParameters) &&
        _.isEqual(stream.localProperties, params.localProperties) &&
        _.isEqual(stream.onEachEmit, params.onEachEmit) && 
        _.isEqual(stream.streamName, params.streamName)
      );
    });

    if (!existingStream) {
      const stream: IStream<T> = {
        streamId: uuid(),
        streamName: params.streamName,
        type: 'unknown',
        apiEndpoint: params.apiEndpoint,
        bodyData: params.bodyData,
        httpMethod: params.httpMethod,
        queryParameters: params.queryParameters,
        localProperties: params.localProperties,
        onEachEmit: params.onEachEmit,
        fetch: null,
        observer: null,
        observable: <any>null,
        data: null,
        dataIds: {},
      };

      const observable: IObservable<T> = Rx.Observable.create((observer: IObserver<T>) => {
        const { apiEndpoint, bodyData, httpMethod, queryParameters } = stream;

        stream.observer = observer;

        stream.fetch = () => {
          request(apiEndpoint, bodyData, httpMethod, queryParameters).then((response) => {
            if (response.data && _.isArray(response.data)) {
              stream.type = 'arrayOfItemsStream';
              stream.dataIds = {};
              response.data.forEach(item => stream.dataIds[item.id] = true);
            } else if (response.data && _.isObject(response.data) && _.has(response, 'data.id')) {
              stream.type = 'singleItemStream';
              stream.dataIds = { [response.data.id]: true };
            }

            observer.next(response);
          }).catch(() => {
            observer.next(new Error(`promise for api endpoint ${apiEndpoint} did not resolve`));
          });

          return observable;
        };

        stream.fetch();

        return () => {
          console.log(`stream for api endpoint ${apiEndpoint} completed`);
          this.list = this.list.filter((stream) => stream.streamId !== stream.streamId);
        };
      })
      .startWith('initial')
      .scan((accumulated: T, current: 'fetch' | T | pureFn<T>) => {
        let data = accumulated;
        const { onEachEmit, localProperties } = stream;

        if (_.isFunction(onEachEmit)) {
          data = onEachEmit(data);
        }

        if (current === 'fetch') {
          if (_.isFunction(stream.fetch)) {
            stream.fetch();
          } else {
            console.log('newStream does not have a fetch method');
          }
        } else if (!_.isFunction(current) && localProperties !== null) {
          if (_.isArray(current)) {
            data = <any>current.map((child) => ({ ...child, ...localProperties }));
          } else if (_.isObject(current)) {
            data = { ...<any>current, ...localProperties };
          } else {
            console.log('current is no Object or Array');
          }
        } else if (_.isFunction(current)) {
          data = current(data);
        } else {
          data = current;
        }

        stream.data = data;

        return data;
      })
      .filter((data) => data !== 'initial')
      .distinctUntilChanged()
      .publishReplay(1)
      .refCount();

      stream.observable = observable;

      this.list = [...this.list, stream];

      return stream;
    }

    return existingStream;
  }

  update<T>(dataId: string, object: any) {
    streams.list.filter(stream => stream.dataIds[dataId]).forEach((stream) => {
      if (stream.observer !== null) {
        if (stream.type === 'singleItemStream') {
          stream.observer.next(object);
        } else if (stream.type === 'arrayOfItemsStream') {
          stream.observer.next((item) => ({
            ...item,
            data: item.data.map((child) => (child.id === dataId ? object.data : child))
          }));
        } else {
          stream.observer.next('fetch');
        }
      } else {
        console.log('observer is null');
      }
    });
  }
}

const streams = new Streams();
export default streams;

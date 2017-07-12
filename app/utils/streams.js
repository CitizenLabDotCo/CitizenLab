import 'whatwg-fetch';
import Rx from 'rxjs/Rx';
import _ from 'lodash';
import request from 'utils/request';
import { v4 as uuid } from 'uuid';

class Streams {
  constructor() {
    this.listOfStreams = [];
  }

  create(
    apiEndpoint,
    headerData = null,
    httpMethod = null,
    queryParameters = null,
    localProperties = false,
    onEachEmit = null,
  ) {
    const existingStream = this.listOfStreams.find((stream) => {
      return (
        _.isEqual(stream.apiEndpoint, apiEndpoint) &&
        _.isEqual(stream.headerData, headerData) &&
        _.isEqual(stream.httpMethod, httpMethod) &&
        _.isEqual(stream.queryParameters, queryParameters) &&
        _.isEqual(stream.localProperties, localProperties) &&
        _.isEqual(stream.onEachEmit, onEachEmit)
      );
    });

    if (!existingStream) {
      const newStream = {
        id: uuid(),
        apiEndpoint,
        headerData,
        httpMethod,
        queryParameters,
        localProperties,
        onEachEmit,
        fetch: null,
        observer: null,
        observable: null,
        data: null,
      };

      newStream.observable = Rx.Observable.create((observer) => {
        newStream.observer = observer;

        newStream.fetch = () => {
          request(apiEndpoint, headerData, httpMethod, queryParameters).then((response) => {
            observer.next(response);
          }).catch(() => {
            observer.next(new Error(`promise for api endpoint ${apiEndpoint} did not resolve`));
            // observer.error(`promise for api endpoint ${apiEndpoint} did not resolve`);
          });

          return newStream.observable;
        };

        newStream.fetch();

        return () => {
          console.log(`stream for api endpoint ${apiEndpoint} completed`);
          this.listOfStreams = this.listOfStreams.filter((stream) => stream.id !== newStream.id);
        };
      })
      .startWith('initial')
      .scan((accumulated, current) => {
        let data = accumulated;

        if (_.isFunction(onEachEmit)) {
          onEachEmit(data);
        }

        if (!_.isFunction(current) && _.isObject(localProperties)) {
          if (_.isArray(current)) {
            data = current.map((child) => ({ ...child, ...localProperties }));
          } else if (_.isObject(current)) {
            data = { ...current, ...localProperties };
          } else {
            console.log('current is no Object or Array');
          }
        } else if (_.isFunction(current)) {
          data = current(data);
        } else {
          data = current;
        }

        newStream.data = data;

        return data;
      })
      .filter((data) => data !== 'initial')
      .distinctUntilChanged()
      .publishReplay(1)
      .refCount();

      this.listOfStreams = [...this.listOfStreams, newStream];

      return newStream;
    }

    return existingStream;
  }
}

export default new Streams();

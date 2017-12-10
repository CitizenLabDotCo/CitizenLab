import * as React from 'react';
import * as Rx from 'rxjs';
import { IStreamParams, IStream } from 'utils/streams';


interface State<IResourceData> {
  resource: IResourceData | null;
}


export interface InjectedResourceLoaderProps<IResourceData> {
  [key: string]: {
    data?: IResourceData | null;
  };
}

interface IStreamFn<IResource> {
  (resourceId: string): IStream<IResource>;
}

interface IResourceIdFn {
  (props: any): string;
}

interface IIResource<IResourceData> {
  data: IResourceData;
}

export const injectResource = <IResourceData, IResource extends IIResource<IResourceData>>(propName: string, streamFn: IStreamFn<IResource>, resourceIdFn: IResourceIdFn) =>
  <TOriginalProps extends {}>(WrappedComponent: React.ComponentClass<TOriginalProps & InjectedResourceLoaderProps<IResourceData>>) => {
    return class ResourceManager extends React.Component<TOriginalProps, State<IResourceData>> {

      subscriptions: Rx.Subscription[] = [];

      constructor(props) {
        super(props);
        this.state = {
          resource: null,
        };
      }

      componentWillReceiveProps(nextProps) {
        if (resourceIdFn(nextProps) !== resourceIdFn(this.props)) {
          this.setState({
            resource: null,
          }, this.loadResource);
        }
      }

      componentDidMount() {
        this.loadResource();
      }

      componentWillUnmount() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
      }

      loadResource() {
        const resourceId = resourceIdFn(this.props);
        if (resourceId) {
          this.subscriptions.push(
            streamFn(resourceId).observable.subscribe((data) => {
              this.setState({
                resource: data.data,
              });
            })
          );
        }
      }

      render() {
        const injectedProps = {
          [propName]: {
            data: this.state.resource,
          },
        };

        return (
          <WrappedComponent
            {...this.props}
            {...injectedProps}
          />
        );
      }
    };
  };


import * as React from 'react';
import { Subtract } from 'utility-types';
import ChatContext from './context';
import { Context } from './Types';

interface Props extends Context {};

function consumer<P extends Props>(Component: React.ComponentType<P>) {

  return class extends React.Component<Subtract<P, Context>> {

    getProps(context: Context) {
      return Object.assign({}, { ...(this.props as P), ...context });
    }
    
    render() {
      return (
        <ChatContext.Consumer>
          {
            (context) => <Component {...this.getProps(context)}  />
          }
        </ChatContext.Consumer>
      )
    }
  }
}

export default consumer;
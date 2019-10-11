import React, { Component, PureComponent } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'

const Circle = ({ children, className, areStatusOk }) => {
  const statusStateClassName = areStatusOk ? 'on' : 'off';
  const classNames = `circle ${className} ${statusStateClassName}`;
  return (
    <li className={classNames}>{children}</li>
  );
};

class StatusCircle extends Component {
  render() {
    console.log('update');
    return (
      <div>
        <h2>Component</h2>
        <Circle {...this.props} />
      </div>
    );
  }
}

class PureStatusCircle extends PureComponent {
  render() {
    console.log('update');
    return (
      <div>
        <h2>PureComponent</h2>
        <Circle className="pure" {...this.props} />
      </div>
    );
  }
}

const withContext = (WrappedComponent) => {
  class AppHOC extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return this.context.areStatusOk !== nextContext.areStatusOk
    }
    render() {
      return <WrappedComponent {...this.props} {...this.context} />
    }
  }
  AppHOC.contextTypes = {
    areStatusOk: PropTypes.bool
  };
  return AppHOC;
};

const PureStatusCircleWithContext = withContext(PureStatusCircle);
const StatusCircleWithContext = withContext(StatusCircle);

class Line extends Component {
  render() {
    return (
      <ol>
        <StatusCircleWithContext/>
        <PureStatusCircleWithContext/>
        {/*Without context*/}
        {/*<StatusCircle/>*/}
      </ol>
    )
  }
}

const Lines = () => (
  <section>
    <Line/>
  </section>
);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      areStatusOk: false
    };
  }

  getChildContext() {
    return {
      areStatusOk: this.state.areStatusOk
    }
  }

  toggleStatus = () => {
    this.setState({
      areStatusOk: !this.state.areStatusOk
    });
  };

  render() {
    return (
      <main>
        <Lines/>
        <button type="button" onClick={this.toggleStatus}>
          Change Status
        </button>
      </main>
    );
  }
}

App.childContextTypes = {
  areStatusOk: PropTypes.bool
};

render(<App/>, document.getElementById('root'));

import React from 'react';
import PropTypes from 'prop-types';
import Autobind from 'autobind-component';
import { Route } from 'react-router-dom';
import SubReddit from 'subreddit';

class Dashboard extends Autobind {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { subReddits, history } = this.props;

    if(!subReddits) {
      return (<div>Loading</div>);
    }

    return (
      <div>
        <select onChange={ e => history.push(`/r/${e.target.value}`) }>
          {
            subReddits.map((item, i) => (<option
                key={ `${i}-${item}` }
                value={ item }
                label={ item }
              />)
            )
          }
        </select>
        <Route path="/r/:srName" component={ SubReddit } />
      </div>
    );
  }
}

Dashboard.propTypes = {
  t: PropTypes.func,
  subReddits: PropTypes.arrayOf(PropTypes.string),
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default Dashboard;

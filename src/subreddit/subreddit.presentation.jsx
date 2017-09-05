import React from 'react';
import AutobindComponent from 'autobind-component';
import PropTypes from 'prop-types';
import IPropTypes from 'react-immutable-proptypes';
import styles from './index.scss';
import Post from 'post';

class SubReddit extends AutobindComponent {

  componentWillMount() {
    const { match, fetchPosts } = this.props;

    fetchPosts({ name: match.params.srName });
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPosts, match } = this.props;

    if(nextProps.match.params.srName !== match.params.srName ) {
        fetchPosts({ name: nextProps.match.params.srName });
    }
  }

  render() {
    const { match, t, posts } = this.props;

    return (
      <div className={ styles.subredditWrapper }>
        <div className={ styles.header }>
          <span>{t('currently_viewing')}</span>
          <span>/r/{ match.params.srName }</span>
        </div>
        <div className={ styles.postWrapper }>
          {
            posts && posts.map(post => (<Post key={ post.get('name') } { ...post.toJS() } />))
          }
          {
            !posts && (<div>{ t('loading') }</div>)
          }
        </div>
      </div>
    )
  }
}

SubReddit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      srName: PropTypes.string
    })
  }),
  fetchPosts: PropTypes.func,
  posts: IPropTypes.list
}

export default SubReddit;

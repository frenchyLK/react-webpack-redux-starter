import React from 'react';
import PropTypes from 'prop-types';

const SubReddit = ({ match }) => {
  return (<h4>{ match.params.srName }</h4>)
};

SubReddit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      srName: PropTypes.string
    })
  })
}

export default SubReddit;

import React from 'react';

const Spinner = (props) => {
  return (
    <div className="ui active dimmer">
      <div className="ui big text loader">
        {props.message}
      </div>
    </div>
  );
};

// if the props.message fail this will be the default
Spinner.defaultProps = {
  message: 'Loading...'
};

export default Spinner;
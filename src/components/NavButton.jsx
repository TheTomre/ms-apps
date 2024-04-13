import React from 'react';
import PropTypes from 'prop-types';

const NavButton = ({ label,onClick, style,}) => {
    const combinedStyles = { ...defaultStyles, ...style };
  return (
    <button style={combinedStyles} onClick={onClick}>
      {label}
    </button>
  );
};

NavButton.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

const defaultStyles = {
    padding: '10px',
    margin: '1vw',
    width: '10vw',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

export default NavButton;
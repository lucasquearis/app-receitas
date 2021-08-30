import React from 'react';

function HeaderSearchBar() {
  return (
    <div>
      { !hideBar && (
      <p>Header Search Bar</p>
      )
    });
  </div>
}

HeaderSearchBar.defaultProps = {
  hideBar: false,
};

export default HeaderSearchBar;

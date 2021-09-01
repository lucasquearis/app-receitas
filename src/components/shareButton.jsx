import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ShareIcon from '../images/shareIcon.svg';

class ShareButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      copied: false,
    };

    this.copyHandle = this.copyHandle.bind(this);
    this.setIndex = this.setIndex.bind(this);
  }

  componentDidMount() {
    this.setIndex();
  }

  setIndex() {
    const { position } = this.props;
    this.setState({ index: position });
  }

  copyHandle() {
    this.setState({ copied: true });
  }

  render() {
    const { id, type } = this.props;
    const { index, copied } = this.state;
    const path = type === 'comida'
      ? `http://localhost:3000/comidas/${id}`
      : `http://localhost:3000/bebidas/${id}`;

    return (
      <div>
        <CopyToClipboard
          text={ path }
          onCopy={ this.copyHandle }
        >
          <button type="button" className="share-fill">
            <img
              src={ ShareIcon }
              alt="share button"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
        </CopyToClipboard>

        { copied ? <span>Link copiado!</span> : null }
      </div>
    );
  }
}

export default ShareButton;

ShareButton.propTypes = {
  position: PropTypes.number,
}.isRequired;

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { removeFavorite, addFavorite, startFavorites } from '../redux/actions';

class FavoriteButton extends React.Component {
  constructor(props) {
    super(props);
    const { recipe } = this.props;
    this.state = { favorite: (localStorage.getItem('favoriteRecipes'))
      ? JSON.parse(localStorage.getItem('favoriteRecipes')).some(
        (favRecipe) => favRecipe.id === recipe.id,
      )
      : false };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { startFav } = this.props;
    startFav();
  }

  handleClick() {
    const { addFav, removeFav, recipe } = this.props;
    const { favorite } = this.state;
    if (favorite) {
      removeFav(recipe);
      this.setState({ favorite: false });
    } else {
      addFav(recipe);
      this.setState({ favorite: true });
    }
  }

  render() {
    const { testId } = this.props;
    const { favorite } = this.state;
    return (
      <div>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          <img
            type="image/svg+xml"
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
            data-testid={ testId }
            alt="Adicionar a favoritos"
          />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  favoriteRecipes: state.favoriteReducer,
});

const mapDispatchToProps = (dispatch) => ({
  addFav: (recipe) => dispatch(addFavorite(recipe)),
  removeFav: (recipe) => dispatch(removeFavorite(recipe)),
  startFav: () => dispatch(startFavorites()),
});

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  testId: PropTypes.string.isRequired,
  addFav: PropTypes.func.isRequired,
  removeFav: PropTypes.func.isRequired,
  startFav: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/DoneRecipes.css';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
    margin: '10px',
  },
  media: {
    maxWidth: '100%', // 16:9
  },
}));

function DoneRecipes() {
  const classes = useStyles();
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [recipesList, setRecipesList] = useState([]);
  const [copyLink, setCopyLink] = useState(false);

  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    setRecipesList(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  const handleAllClick = () => {
    setRecipesList(doneRecipes);
  };

  const handleFoodClick = () => {
    setRecipesList(doneRecipes.filter((recipe) => recipe.type === 'comida'));
  };

  const handleDrinkClick = () => {
    setRecipesList(doneRecipes.filter((recipe) => recipe.type === 'bebida'));
  };

  const handleShare = (type, id) => {
    const discartUrl = -16;
    const tempUrl = window.location.href.slice(0, discartUrl);
    const finalUrl = `${tempUrl}/${type}s/${id}`;
    copy(finalUrl);
    setCopyLink(true);
  };

  const renderFilterButtons = () => (
    <div className="done-recipes-btn">
      <Button
        data-testid="filter-by-all-btn"
        variant="contained"
        color="secondary"
        onClick={ handleAllClick }
      >
        All
      </Button>
      <Button
        data-testid="filter-by-food-btn"
        variant="contained"
        color="secondary"
        onClick={ handleFoodClick }
      >
        Food
      </Button>
      <Button
        data-testid="filter-by-drink-btn"
        variant="contained"
        color="secondary"
        onClick={ handleDrinkClick }
      >
        Drinks
      </Button>
    </div>
  );

  const renderDoneCards = () => (
    <div>
      <ul>
        {recipesList.map((recipe, index) => (
          <li key={ recipe.id }>
            <Card className={ classes.root }>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <CardHeader
                  title={ recipe.name }
                  data-testid={ `${index}-horizontal-name` }
                />
                <img
                  className={ classes.media }
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <CardContent>
                <Typography
                  data-testid={ `${index}-horizontal-top-text` }
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  { `${recipe.area ? recipe.area : recipe.alcoholicOrNot} - ${
                    recipe.category
                  }` }
                </Typography>
                <Typography
                  data-testid={ `${index}-horizontal-done-date` }
                  variant="body1"
                  color="textPrimary"
                  component="p"
                >
                  { `Feito em: ${recipe.doneDate}` }
                </Typography>
                {recipe.tags.map((tag) => (
                  <Chip
                    key={ tag }
                    label={ tag }
                    variant="outlined"
                    size="small"
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  />
                ))}
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="share"
                  onClick={ () => { handleShare(recipe.type, recipe.id); } }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="share-icon"
                  />
                </IconButton>
                {copyLink && <Chip label="Link copiado!" variant="outlined" />}
              </CardActions>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <Header name="Receitas Feitas" />
      {renderFilterButtons()}
      {recipesList && renderDoneCards()}
    </div>
  );
}

export default DoneRecipes;

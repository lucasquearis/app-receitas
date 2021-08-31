import React from 'react';
import UseRecipes from '../../hook/UseRecipes';
import { ListSection, ListDiv } from './styles';

const RecipeList = () => {
  const { chooser } = UseRecipes();
  return (
    <ListSection>
      <ListDiv>
        {chooser()}
      </ListDiv>
    </ListSection>
  );
};

export default RecipeList;

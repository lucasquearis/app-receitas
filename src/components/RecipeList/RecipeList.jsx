import React from 'react';
import UseRecipes from '../../hook/UseRecipes';
import { ListSection, ListDiv } from './styles';

const RecipeList = () => {
  const { setDefault } = UseRecipes();
  return (
    <ListSection>
      <ListDiv>
        {setDefault()}
      </ListDiv>
    </ListSection>
  );
};

export default RecipeList;

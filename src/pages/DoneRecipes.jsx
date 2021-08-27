// O imagem do card de receita deve ter o atributo (data-testid="${index}-horizontal-image");
// O texto da categoria da receita deve ter o atributo (data-testid="${index}-horizontal-top-text");
// O texto do nome da receita deve ter o atributo (data-testid="${index}-horizontal-name");
// O texto da data que a receita foi feita deve ter o atributo (data-testid="${index}-horizontal-done-date");
// O elemento de compartilhar a receita deve ter o atributo (data-testid="${index}-horizontal-share-btn");
// As tags da receita devem possuir o atributo (data-testid="${index}-${tagName}-horizontal-tag");

import React from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';

export default function DoneRecipes() {
  return (
    <div>
      <section>
        <Header showExploreIcon pageTitle="Receitas Feitas" />
      </section>
      <Button
        variant="light"
        data-testid="filter-by-all-btn"
        onClick={ () => console.log('All') }
      >
        All
      </Button>
      <Button
        variant="light"
        data-testid="filter-by-food-btn"
        onClick={ () => console.log('Food') }
      >
        Food
      </Button>
      <Button
        variant="light"
        data-testid="filter-by-drink-btn"
        onClick={ () => console.log('Drinks') }
      >
        Drinks
      </Button>
    </div>
  );
}

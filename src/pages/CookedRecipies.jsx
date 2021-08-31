import React from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function CookedRecipies() {
  return (
    <>
      <div>
        <Header title="Receitas Feitas" />
        <Button data-testid="filter-by-all-btn">All</Button>
        <Button data-testid="filter-by-food-btn">Food</Button>
        <Button data-testid="filter-by-drink-btn">Drinks</Button>
      </div>
      <div>
        <img
          data-testid="0-horizontal-image" // `${index}-horizontal-image`
          src=""
          alt="foto-da-api-"
        />
        <div>
          <div>
            <p
              Data-testid="0-horizontal-top-text" // ${index}-horizontal-top-text
            >
              texto da categoria da receita
            </p>
            <img
              data-testid="0-horizontal-share-btn" // `${index}-horizontal-share-btn`
              src={ shareIcon }
              alt="compartilhar-receita"
            />
          </div>
          <p
            data-testid="0-horizontal-name" // `${index}-horizontal-name`
          >
            texto do nome da receita
          </p>
          <p
            data-testid="0-horizontal-done-date" // `${index}-horizontal-done-date`
          >
            texto da data da receita
          </p>
          <p
            data-testid="0-Pasta-horizontal-tag" // ${index}-${tagName}-horizontal-tag
          >
            renderiza a primeira tag da receita
          </p>
          <p
            data-testid="0-Curry-horizontal-tag" // ${index}-${tagName}-horizontal-tag
          >
            renderiza a segunda tag da receita
          </p>
        </div>
      </div>

      <div>
        <img
          data-testid="1-horizontal-image" // `${index}-horizontal-image`
          src=""
          alt="foto-da-api"
        />
        <div>
          <div>
            <p
              Data-testid="1-horizontal-top-text" // ${index}-horizontal-top-text
            >
              texto da categoria da receita
            </p>
            <img
              data-testid="1-horizontal-share-btn" // `${index}-horizontal-share-btn`
              src={ shareIcon }
              alt="compartilhar-receita"
            />
          </div>
          <p
            data-testid="1-horizontal-name" // `${index}-horizontal-name`
          >
            texto do nome da receita
          </p>
          <p
            data-testid="1-horizontal-done-date" // `${index}-horizontal-done-date`
          >
            texto da data da receita
          </p>
          <p
            data-testid="1-Pasta-horizontal-tag" // ${index}-${tagName}-horizontal-tag
          >
            renderiza a primeira tag da receita
          </p>
          <p
            data-testid="1-Curry-horizontal-tag" // ${index}-${tagName}-horizontal-tag
          >
            renderiza a segunda tag da receita
          </p>
        </div>
      </div>
    </>
  );
}

export default CookedRecipies;

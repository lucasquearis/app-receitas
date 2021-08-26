import React from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import Card from '../components/RecipesDone/Card';
import './RecipesDone.css';

function RecipesDone() {
  const index = '1';
  const categoria = 'British - Dessert';
  const recipeName = 'Chelsea Buns';
  const dataWasDone = 'Feita em: 25/08/2021';
  const tags = ['bun', 'baking'];
  const imgSrc = 'https://images.tcdn.com.br/img/img_prod/697730/adesivo_lateral_vidro_caminhao_carro_decorativo_bart_simpson_5_1147485849_1_20201005081814.jpg';
  return (
    <div className="rd-container">
      <Header title="Receitas Feitas" />
      <div className="rd-btns-container">
        <Button
          type="button"
          name="All"
          testId="filter-by-all-btn"
          className="rd-btn"
        />
        <Button
          type="button"
          name="Food"
          testId="filter-by-food-btn"
          className="rd-btn"
        />
        <Button
          type="button"
          name="Drink"
          testId="filter-by-drink-btn"
          className="rd-btn"
        />
      </div>
      <Card
        index={ index }
        categoria={ categoria }
        name={ recipeName }
        data={ dataWasDone }
        tags={ tags }
        imgSrc={ imgSrc }
      />
    </div>
  );
}

export default RecipesDone;

import React from 'react';
import '../styles/NoRecipesDone.css';

function NoRecipesDone() {
  return (
    <main className="no-recipes-wrapper">
      <img
        className="not-found-icon"
        alt="ícone de não encontrado"
        src="https://img.icons8.com/pastel-glyph/100/000000/error--v3.png"
      />
      <p>Nenhuma receita foi completada ainda.</p>
    </main>
  );
}

export default NoRecipesDone;

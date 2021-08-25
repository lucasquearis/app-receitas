import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InProgress from '../components/InProgress';
import Context from '../context/Context';

export default function InProgressMeal() {
  const { meals } = useContext(Context);
  return (
    <div>
      <Header title="Receita em progresso" />
      <InProgress recipe={ meals } />
      <Footer />
    </div>
  );
}

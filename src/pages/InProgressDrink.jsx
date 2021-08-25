import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InProgress from '../components/InProgress';
import Context from '../context/Context';

export default function InProgressDrink() {
  const { drinks } = useContext(Context);
  return (
    <div>
      <Header title="Receita em progresso" />
      <InProgress recipe={ drinks } />
      <Footer />
    </div>
  );
}

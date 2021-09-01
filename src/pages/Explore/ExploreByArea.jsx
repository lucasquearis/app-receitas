import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExploreByArea() {
  // const [ingredients, setIngredients] = useState([]);
  // const exploreLimits = 12;

  const headerProps = {
    title: 'Explorar Origem',
    renderSearchBar: true,
  };

  return (
    <div>
      <Header { ...headerProps } />
      <Footer />
    </div>
  );
}

export default ExploreByArea;

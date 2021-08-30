import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { fetchAPI, fetchAPIByAreas, fetchAPIAreas } from '../services';
import '../styles/areaSelect.css';

export default function AreaSelect() {
  const [loading, setLoading] = useState(true);
  const [areasList, setAreasList] = useState([]);
  const [areaSelected, setAreaSelected] = useState('All');
  const { setRecipeList } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      setAreasList(await fetchAPIAreas());
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (areaSelected !== 'All') {
        setRecipeList(await fetchAPIByAreas(areaSelected));
        return;
      }
      setRecipeList(await fetchAPI('/comidas'));
    })();
  }, [areaSelected, setRecipeList]);

  const handleChange = ({ target: { value } }) => {
    setAreaSelected(value);
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <section className="area-select-container">
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleChange }
      >
        <option data-testid="All-option">All</option>
        { areasList.map((area) => (
          <option key={ area } data-testid={ `${area}-option` }>{ area }</option>
        )) }
      </select>
    </section>
  );
}

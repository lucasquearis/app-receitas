import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  LocalBar as drinkIcon,
  Explore as exploreIcon,
  Fastfood as mealIcon,
} from '@material-ui/icons';

import IconBtn from '../IconBtn';
import './BottomMenu.css';

function BottomMenu() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const drink = {
    className: pathname === '/bebidas' ? 'selected' : null,
    name: 'drink',
    'data-testid': 'drinks-bottom-btn',
    icon: drinkIcon,
    alt: 'drinkIcon',
    type: 'button',
    onClick: () => history.push('/bebidas'),
  };
  const explore = {
    className: pathname.includes('/explorar') ? 'selected' : null,
    name: 'explore',
    'data-testid': 'explore-bottom-btn',
    icon: exploreIcon,
    alt: 'exploreIcon',
    type: 'button',
    onClick: () => history.push('/explorar'),
  };
  const food = {
    className: pathname === '/comidas' ? 'selected' : null,
    name: 'food',
    'data-testid': 'food-bottom-btn',
    icon: mealIcon,
    alt: 'foodIcon',
    type: 'button',
    onClick: () => history.push('/comidas'),
  };

  return (
    <footer className="footer" data-testid="footer">
      <IconBtn { ...food } />
      <IconBtn { ...explore } />
      <IconBtn { ...drink } />
    </footer>
  );
}
export default BottomMenu;

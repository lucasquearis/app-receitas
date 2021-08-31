export const DONE_FOOD = 'DONE_FOOD';

export const DONE_DRINK = 'DONE_DRINK';

export const doneFood = (food) => ({
  type: DONE_FOOD, food,
});

export const doneDrink = (drink) => ({
  type: DONE_DRINK, drink,
});

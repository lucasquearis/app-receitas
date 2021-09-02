const mockdoneRecipes = [
  {
    id: '48544',
    type: 'comida',
    area: 'chinesa',
    category: 'boa',
    alcoholicOrNot: '',
    name: 'sushi',
    image: 'https://fastly.4sqi.net/img/general/600x600/53065806_mj7Fba8yRqbv6BEMZUsF0eOVBjJ6u6yJ2sDvfzcWlPU.jpg',
    doneDate: '23/06/2020',
    tags: ['peixe', 'asinn'],
  },
  {
    id: '48575',
    type: 'bebida',
    area: 'brasil',
    category: 'cachaça',
    alcoholicOrNot: 'Alcoholic',
    name: 'pitu',
    image: 'https://api.tendaatacado.com.br/fotos/9652.jpg',
    doneDate: '88/76/9020',
    tags: [],
  },
];

export default mockdoneRecipes;

// [{
//   id: id-da-receita,
//   type: comida-ou-bebida,
//   area: area-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//   name: nome-da-receita,
//   image: imagem-da-receita,
//   doneDate: quando-a-receita-foi-concluida,
//   tags: array-de-tags-da-receita-ou-array-vazio
// }]

function addToStorage(databaseKey, checked, id) {
  const currentStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let newStorage = {};
  if (currentStorage) {
    newStorage = { ...currentStorage,
      [databaseKey]: { ...currentStorage[databaseKey],
        [`${id}`]: checked,
      },
    };
  } else newStorage = { [databaseKey]: { [id]: checked } };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
}

export default addToStorage;

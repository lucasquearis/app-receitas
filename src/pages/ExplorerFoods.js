import

<div>
<Header />
<button
  type="button"
  onClick={ () => history.push('/explorar/bebidas/ingredientes') }
  data-testid="explore-by-ingredient"
>
  Por Ingredientes
</button>
<button
  type="button"
  onClick={ () => history.push('/explorar/bebidas') }
  data-testid="explore-by-area"
>
  Por Local de Origem
</button>
<button
  type="button"
  onClick={ () => history.push('/explorar/bebidas') }
  data-testid="explore-surprise"
>
  Me Surpreenda!
</button>
<FooterMenu />
</div>
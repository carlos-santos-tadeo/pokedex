import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokemonCard from '../components/pokedex/PokemonCard'

const Pokedex = () => {
  // Array de pokemons antes de flitrar
  const [pokemons, setPokemons] = useState([])
  //string para filtrar los pokemons por nombre
  const [pokemonName, setPokemonName] = useState("")
  //arreglo de tipos de pokemons posibles
  const [types, setTypes] = useState([])
  //string del tipo de pokemon actual, cambia de acuerdo al select
  const [currentType, setCurrentType] = useState()
  //pagina actual
  const [currentPage, setCurrentPage] = useState(1)
  //estado global donde se almacena el nombre del usuario
  const nameTrainer = useSelector(store => store.nameTrainer)

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value)
  }

  const pokemonsByName = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(pokemonName.toLocaleLowerCase()))

  const paginationLogic = () => {
    //cantidad de pokemones por pagina
    const POKEMONS_PER_PAGE = 12

    //pokemos que se van a mostrar en la pagina actual
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE
    const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd)

    //ultima pagina
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1

    //Bloque actual
    const PAGES_PER_BLOCK = 5
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

    //paginas que se van a mostrar en el bloque actual
    const pagesInBlock = []
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
    const maxPage = actualBlock * PAGES_PER_BLOCK

    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i)
      }
    }

    return {pokemonInPage, lastPage, pagesInBlock}

  }

  const {lastPage,pagesInBlock, pokemonInPage} = paginationLogic()

  
  const handleClickPreviusPage = () =>{
    const newCurrentPage = currentPage - 1 
    if(newCurrentPage >= 1){
      setCurrentPage(newCurrentPage)
    }
  }

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1 
    if(newCurrentPage <= lastPage){
      setCurrentPage(newCurrentPage)
    }
  }


  useEffect(() => {
    if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281"
      //seria poner un ?limit=1281

      axios.get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err))
    }
  }, [currentType])


  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type"

    axios.get(URL)
      .then((res) => {
        const newTypes = res.data.results.map((type) => type.name)
        setTypes(newTypes)
      })
      .catch((err) => console.log(err))

  }, [])


  useEffect(() => {

    if (currentType) {

      const URL = `https://pokeapi.co/api/v2/type/${currentType}/`

      axios
        .get(URL)
        .then((res) => {
          const pokemonByType = res.data.pokemon.map(pokemon => pokemon.pokemon)
          setPokemons(pokemonByType)
        })
        .catch((err) => console.log(err))
    }

  }, [currentType])


  useEffect(() => {
    setCurrentPage(1)
  }, [pokemonName, currentType])
  



  return (
    <section className='min-h-screen '>
      <Header />

      <section className='py-6 px-2 '>
        <h3 className='text-[#FE1936] font-bold mb-4 mt-1 sm:ml-[3%]'>Welcome {nameTrainer},
          <span className='text-black font-normal'> here you can find your favorite pokemon</span></h3>

        <form onSubmit={handleSubmit} className='sm:grid sm:grid-cols-2 sm:mx-[5%] sm:my-7'>
          <div className='shadow-md w-[85%] max-w-[420px] mx-auto'>
            <input id='pokemonName' type="text" placeholder='Search your pokemon' className='w-[75%] h-[30px] sm:h-[45px]' />
            <button className='bg-[#D93F3F] text-white w-[25%] h-[30px] sm:h-[45px]'>Search</button>
          </div>

          <select className='border-slate-100 rounded border-[1px] ml-5 mt-2 max-w-[400px] ' onChange={(e) => setCurrentType(e.target.value)} >
            <option className='bg-[#ED8F8F] ' value="">All</option>
            {
              types.map((type) => (
                <option className='capitalize ' key={type} value={type}>
                  {type}
                </option>
              ))}
          </select>
        </form>
      </section>

      {/* paginacion */}
      
      <ul className='flex gap-3 justify-center py-4 px-2 flex-wrap'>
      <li onClick={() => setCurrentPage(1)} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{"<<"}</li>
        <li onClick={handleClickPreviusPage} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{"<"}</li>
        {
          pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} className={`hover:bg-red-400 p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${numberPage === currentPage && "bg-red-100 border-red-600 border-[2px] text-red-700"}`} key={numberPage}>{numberPage}</li>)
        }
        <li onClick={handleClickNextPage} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{">"}</li>
        <li onClick={() => setCurrentPage(lastPage)} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{">>"}</li>
      </ul>

      {/*seccion  lista de pokemons */}
      <section className='grid justify-center gap-10 auto-rows-auto grid-cols-[repeat(auto-fill,_300px)] mb-'>
        {
          pokemonInPage.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
        }
      </section>

    </section>
  )
}

export default Pokedex
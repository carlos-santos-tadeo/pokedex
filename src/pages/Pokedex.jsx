import React, { useEffect, useRef, useState } from 'react'
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
  //estado que maneja el numero de pokemones por pagina
  const [pokemonsPerPage, setPokemonsByPage] = useState(localStorage.getItem("pokemonsPerPage"))


  const input = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value)
  }

  const pokemonsByName = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(pokemonName.toLocaleLowerCase()))

  const paginationLogic = () => {
    //cantidad de pokemones por pagina
    const POKEMONS_PER_PAGE = pokemonsPerPage

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

    return { pokemonInPage, lastPage, pagesInBlock }

  }

  const { lastPage, pagesInBlock, pokemonInPage } = paginationLogic()


  if (localStorage.theme === "true" || (!("theme" in localStorage) && window.matchMedia("(prefers-colors-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }

  const toggleDarkMode = useRef(document.documentElement.className === "dark")

  const changeDarkMode = () => {
    toggleDarkMode.value = document.documentElement.classList.toggle("dark")
    toggleDarkMode.value
      ? (localStorage.theme = "true")
      : (localStorage.theme = "false")
  }


  const handleClickPreviusPage = () => {
    const newCurrentPage = currentPage - 1
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage)
    }
  }

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1
    if (newCurrentPage <= lastPage) {
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

  useEffect(() => {
    setPokemonName("")
    input.current.value = ""
  }, [currentType])




  return (
    <section className='min-h-screen '>
      <Header />
      <div className='mt-3 gap-10 flex'>
        <button onClick={changeDarkMode} className='flex gap-1 bg-black dark:text-black dark:shadow-white dark:bg-slate-400 text-white font-semibold text-[13px] ml-[5%] hover:bg-black hover:text-white hover:shadow-black hover:shadow-lg rounded-md px-1'>
          <i className={`flex rounded-lg w-[23px] h-[22px] justify-center items-center dark:bg-slate-400 bg-black text-white text-[20px] bx bxs-brightness-half`}></i>
          <span className=''>Dark/Light</span>
        </button>
      </div>
      <div className='flex max-w-[300px] sm:text-xl items-center mx-auto mt-2 font-medium text-red-600'>
        <span>Pokemons per page: </span>
        <select className=' border-slate-100 text-black dark:bg-slate-400 rounded-md border-[1px] ml-5 mt-2 max-w-[100px] ' onChange={(e) => setPokemonsByPage(e.target.value)} >
          <option value="9"></option>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="12">12</option>
          <option value="16">16</option>
          <option value="20">20</option>
        </select>
      </div>

      <section className='py-6 px-2 '>
        <h3 className='text-[#FE1936] sm:text-xl font-bold mb-4 mt-1 sm:ml-[3%]'>Welcome {nameTrainer},
          <span className='text-black sm:text-xl font-normal dark:text-white'> here you can find your favorite pokemon</span></h3>

        <form onSubmit={handleSubmit} className='sm:grid sm:grid-cols-2 sm:mx-[5%] sm:my-7'>
          <div className='shadow-md w-[85%] max-w-[420px] mx-auto dark:border-white dark:border-[1px]'>
            <input ref={input} id='pokemonName' type="text" placeholder=' Search your pokemon' className='w-[75%] h-[30px] sm:h-[45px] dark:bg-slate-400 dark:placeholder-black' />
            <button className='bg-[#D93F3F] text-white w-[25%] h-[30px] sm:h-[45px]'>Search</button>
          </div>

          <select className='border-slate-100 dark:bg-slate-400 rounded border-[1px] ml-5 mt-2 max-w-[400px] ' onChange={(e) => setCurrentType(e.target.value)} >
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
          pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} className={`hover:bg-red-400 p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${numberPage === currentPage && "animate-pulse"}`} key={numberPage}>{numberPage}</li>)
        }
        <li onClick={handleClickNextPage} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{">"}</li>
        <li onClick={() => setCurrentPage(lastPage)} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{">>"}</li>
      </ul>

      {/*seccion  lista de pokemons */}
      <section className='grid pb-12 justify-center gap-10 auto-rows-auto grid-cols-[repeat(auto-fill,_300px)]'>
        {
          pokemonInPage.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
        }
      </section>

    </section>
  )
}

export default Pokedex
import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

const PokemonId = () => {

  const [pokemon, setPokemon] = useState()

  const { id } = useParams()

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`

    axios.get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err))

  }, [])


  const getPercentStarBar = (stat_base) => {
    const percentBarProgres = Math.floor((stat_base * 100) / 255)
    return `${percentBarProgres}%`
  }

  const bordersByType = {
    grass: "border-green-500",
    fire: "border-red-500",
    normal: "border-[#735259]",
    fighting: "border-[#96402A]",
    flying: "border-[#735259]",
    poison: "border-[#5B3184]",
    ground: "border-[#654008]",
    rock: "border-[#7E7E7E]",
    bug: "border-[#62DB60]",
    ghost: "border-[#323569]",
    steel: "border-[#5E736C]",
    water: "border-[#349ECF]",
    electric: "border-[#EFD736]",
    psychic: "border-[#5E736C]",
    ice: "border-[#6FBEDF]",
    dragon: "border-[#478A93]",
    dark: "border-[#030706]",
    fairy: "border-[#971B45]",
    unknown: "border-[]",
    shadow: "border-[#323569]"
  }

  const backgroundByType = {
    grass: "from-green-500 to-black",
    fire: "from-red-500 to-black",
    grass: "from-green-500 to-black",
    fire: "from-red-500 to-black",
    normal: "from-[#735259] to-black",
    fighting: "from-[#96402A] to-black",
    flying: "from-[#735259] to-black",
    poison: "from-[#5B3184] to-black",
    ground: "from-[#654008] to-black",
    rock: "from-[#7E7E7E] to-black",
    bug: "from-[#62DB60] to-black",
    ghost: "from-[#323569] to-black",
    steel: "from-[#5E736C] to-black",
    water: "from-[#349ECF] to-black",
    electric: "from-[#EFD736] to-black",
    psychic: "from-[#5E736C] to-black",
    ice: "from-[#6FBEDF] to-black",
    dragon: "from-[#478A93] to-black",
    dark: "from-[#030706] to-black",
    fairy: "from-[#971B45] to-black",
    unknown: "from-[]",
    shadow: "from-[#323569] to-black"
  }

  const colorsByType = {
    grass: "text-green-500",
    fire: "text-red-500",
    grass: "text-green-500",
    fire: "text-red-500",
    normal: "text-[#735259]",
    fighting: "text-[#96402A]",
    flying: "text-[#735259]",
    poison: "text-[#5B3184]",
    ground: "text-[#654008]",
    rock: "text-[#7E7E7E]",
    bug: "text-[#62DB60]",
    ghost: "text-[#323569]",
    steel: "text-[#5E736C]",
    water: "text-[#349ECF]",
    electric: "text-[#EFD736]",
    psychic: "text-[#5E736C]",
    ice: "text-[#6FBEDF]",
    dragon: "text-[#478A93]",
    dark: "text-[#030706]",
    fairy: "text-[#971B45]",
    unknown: "text-[]",
    shadow: "text-[#323569]"
  }

  return (
    <section className='dark:text-white'>
      <Header />
      <div className='bg-red-500 w-20 rounded-md text-center font-bold ml-[5%] mt-5'>
        <Link to={`/pokedex/`}>Regresar</Link>
      </div>
      <section className='px-2 py-14 '>
        <article className='max-w-[768px] rounded-lg mx-auto shadow-xl p-2 dark:bg-slate-900 dark:shadow-md dark:shadow-white'>
          {/* todo lo demas */}
          <section className={`rounded-lg bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
            <div className='w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-10'>
              <img className='hover:animate-pulse animate-bounce' src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
            </div>
          </section>

          {/* informacion general */}

          <section>
            <div className='mx-auto border-[2px] border-[#D3D3D3] w-10 text-center rounded-md sm:w-10 px-1 my-4'>
              <h3 className={`font-bold sm:text-xl ${colorsByType[pokemon?.types[0].type.name]}`}>#{pokemon?.id}</h3>
            </div>

            <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2'>
              <hr /><h2 className={`capitalize font-bold sm:text-2xl ${colorsByType[pokemon?.types[0].type.name]}`}>{pokemon?.name}</h2><hr />
            </div>

            <div className='grid grid-cols-2 text-center py-3 font-medium'>
              <div>
                <h5 className='font-normal'>Weight</h5>
                <span>{pokemon?.weight}</span>
              </div>
              <div>
                <h5 className='font-normal'>Height</h5>
                <span>{pokemon?.height}</span>
              </div>
            </div>


            {/* por qeui modificar para arreglar cuando solo tiene un tipo, truncate inevstigar */}

            <section className='grid sm:grid-cols-2 gap-4'>
              {/* tipos */}
              <section className='text-center'>
                <h3 className='font-semibold'>Types</h3>
                <section className='flex justify-center gap-4 mt-4 '>
                  {
                    pokemon?.types.map(type => <article className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} p-2 px-8 border-[1px] border-gray-300 text-white capitalize w-[135px] sm:w-[150px]`} key={type.type.name}>{type.type.name}</article>)
                  }
                </section>
              </section>

              {/* habilidades */}
              <section className='text-center'>
                <h3 className='font-semibold'>Habilities</h3>
                <section className='flex justify-center gap-4 mt-4 '>
                  {
                    pokemon?.abilities.map(ability => <article className={`p-2 px-8 w-[135px] sm:w-[150px] border-[1px] bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} capitalize truncate`} key={ability.ability.name}>{ability.ability.name}</article>)
                  }
                </section>
              </section>
            </section>

          </section>

          {/* seccion de stats */}

          <section className='py-7'>
            <div className='grid grid-cols-[auto_1fr_auto] items-center gap-3'>
              <h3 className=' text-2xl font-semibold'>Stats</h3><hr /><img className='w-[45px]' src="/images/Group.png" alt="" />
            </div>
            <section className='mt-3'>
              {
                pokemon?.stats.map(stat => (
                  <article key={stat.stat.name}>
                    <section className='flex justify-between'>
                      <h5 className='capitalize'>{stat.stat.name}</h5>
                      <span>{stat.base_stat}/255</span>
                    </section>
                    <div className='bg-gray-100 h-6 rounded-sm'>
                      {/* aqui se aplica un estilo en linea */}
                      <div style={{ "width": getPercentStarBar(stat.base_stat) }} className={`h-full bg-gradient-to-r from-yellow-300 to-yellow-500`}></div>
                    </div>
                  </article>
                ))
              }
            </section>
          </section>
        </article>
      </section>
    </section>
  )
}

export default PokemonId
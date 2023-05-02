import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
  water: "border-[#133258]",
  electric: "border-[#0C1395]",
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
  water: "from-[#133258] to-black",
  electric: "from-[#0C1395] to-black",
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
  water: "text-[#133258]",
  electric: "text-[#0C1395]",
  psychic: "text-[#5E736C]",
  ice: "text-[#6FBEDF]",
  dragon: "text-[#478A93]",
  dark: "text-[#030706]",
  fairy: "text-[#971B45]",
  unknown: "text-[]",
  shadow: "text-[#323569]"
}

const PokemonCard = ({ pokemonUrl }) => {

  const [pokemon, setPokemon] = useState()

  const types = pokemon?.types.slice(0,2).map(type => type.type.name).join(" / ")

  useEffect(() => {
    axios.get(pokemonUrl)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err))
  }, [])


  return (
    <Link to={`/pokedex/${pokemon?.id}`} className={`text-center border-8 rounded-md ${bordersByType[pokemon?.types[0].type.name]}`}>
      {/* seccion superior */}
      <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
        <div className='absolute -bottom-12 w-[200px] left-1/2 -translate-x-1/2'>
          <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
        </div>
      </section>

      {/* seccion inferior */}
      <section>
        <h3 className={`mt-10 text-2xl font-bold ${colorsByType[pokemon?.types[0].type.name]}`}>{pokemon?.name}</h3>
        <h4 className='capitalize'>{types}</h4>
        <span className='text-[#9F9F9F] text-sm'>Type</span>
        <hr />
        <section className='grid grid-cols-3 gap-2 p-2 '>
          {
            pokemon?.stats.map(stat => (
              <div key={stat.stat.name}>
                <h5 className='uppercase text-xs text-[#9F9F9F]'>{stat.stat.name}</h5>
                <span className={`font-bold text-lg ${colorsByType[pokemon?.types[0].type.name]}`} >{stat.base_stat}</span>
              </div>
            ))
          }
        </section>
      </section>
    </Link>
  )
}

export default PokemonCard


// const bordersByType = {
//   normal: "",
//   fighting: "",
//   flying: "",
//   poison: "",
//   ground: "",
//   rock: "",
//   bug: "",
//   ghost: "",
//   steel: "",
//   fire: "",
//   water: "",
//   grass: "",
//   electric: "",
//   psychic: "",
//   ice: "",
//   dragon: "",
//   dark: "",
//   fairy: "",
//   unknown: "",
//   shadow: "",
// };
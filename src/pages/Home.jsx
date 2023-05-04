import React from 'react'
import Footer from '../components/Footer'
import { useDispatch } from 'react-redux'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setNameTrainer(e.target.nameTrainer.value))
    navigate("/pokedex")
  }

  return (
    <section className='min-h-screen grid grid-rows-[1fr_auto]'>
      <section>
        <article>
          <div className='mx-auto flex justify-center py-10 px-7'>
            <img src="/images/pokedex.png" alt="" />
          </div>
          <h2 className='text-[#FE1936] text-center font-bold text-2xl mb-3 md:text-5xl'>¡Hello trainer!</h2>
          <p className='text-center mb-7 md:text-xl dark:text-white'>Give me your name start: </p>
          <form onSubmit={handleSubmit} className='mx-auto sm:max-w-[500px]'>
            <div className=' shadow-md w-[85%] max-w-[420px] mx-auto dark:border-[2px] dark:rounded-md'>
              <input id='nameTrainer' type="text" placeholder='  Your name...' className='w-[75%] h-[30px] sm:h-[45px]' />
              <button className='bg-[#D93F3F] text-white w-[25%] h-[30px] sm:h-[45px]'>Start</button>
            </div>
          </form>
        </article>
      </section>
      
        <div>
          <img src="/images/home.png" alt="" />
        </div>

      <Footer />

    </section>
  )
}

// auto-[1fr_auto]

export default Home
import {logo} from '../assets'

function Hero() {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
            <img src={logo} alt="" className='w-28 object-contain'/>

            <button type='button'
                    onClick={() => window.open('https://github.com/bemnetmussa')}
                    className='black_btn'>Github</button>
        </nav>

        <h1 className='head_text'>
            Summarize Articles with <br className='max-md:hidden'/>
            <span className='orange_gradient'>OpenAI Gpt-4</span>
        </h1>
        <h2 className='desc'>
              Our AI Summarizer condenses long articles, research papers, and web pages into quick,
               clear summaries. Save time and get the key points at a glance with the help of advanced AI, 
               perfect for anyone looking to digest information faster.</h2>
    </header>
  )
}

export default Hero
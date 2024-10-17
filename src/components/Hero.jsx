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
            <span className='orange_gradient'>OpenAi Gpt-4</span>
        </h1>
        <h2 className='desc'>Lorem ipsum dolor sit amet consectetur, 
            adipisicing elit. Quidem unde, nisi placeat at dignissimos 
            veritatis similique quibusdam explicabo blanditiis expedita 
            sapiente aliquam corporis eaque repellat obcaecati nihil minus doloremque. Unde.</h2>
    </header>
  )
}

export default Hero
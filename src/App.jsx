import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faMedium } from '@fortawesome/free-brands-svg-icons'
import { faGoodreads } from '@fortawesome/free-brands-svg-icons'
const App = () => {


  return (

    <div className='space-y-5'>
    <div className='grid grid-cols-[38%_62%] gap-4'>
    <div className="h-[150px] flex flex-col pt-[20px] pl-[40px]">
      <h1 className='text-[45px]'>ELIO MAREN</h1>
      <h3>DATA SCIENTIST/ANALYST</h3>
      </div>
      <div className='bg-black/56 h-[150px] pl-[30px] pt-[50px] pr-[40px] pb-[50px] text-[18px]'>
      Cleaning, organizing, analyzing of data. I live to do all that, like it’s replaced my lungs. Is that too poetic? - me
      </div>
    </div>
     <div className='grid grid-cols-[50%_50%] gap-4'>
     <div className='bg-black/56 p-[40px] inline-block text-[15px]'>
     <p>I’m a data scientist passionate about uncovering insights that drive smarter decisions. I love working where data meets real-world impact - building models, creating dashboards, and turning raw numbers into clear stories. I’m especially drawn to the moments where a simple metric or visualization suddenly makes something complex feel intuitive.</p>
<p>Currently, I'm focused on predictive analytics and data visualization, helping teams make better, faster choices. I'm always refining my process, whether it's improving model performance or finding clearer ways to communicate results.</p>
<p>Outside of work, you’ll find me reading, exploring new datasets just for fun, or hunting for hidden gems in indie games.</p>
     </div>

     <div className= 'h-[300px] grid grid-rows-[70%_30%] gap-4'>
      <div className='bg-black/56 p-[30px]'>
      <h2 >Here's some stuff I've worked on.</h2>
      <div className='grid grid-cols-4 gap-3 mt-[20px]'>
      <div className='h-[100px] p-1.5 rounded bg-[#141922] flex items-center justify-center cursor-pointer'>
        <div className='bg-[#141922] rounded border-2 border-dotted border-grey-400 flex items-center justify-center w-full h-full cursor-pointer'>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          </div>
          </div>
          <div className='h-[100px] p-1.5 rounded bg-[#141922] flex items-center justify-center cursor-pointer'>
          <div className='bg-[#141922] rounded border-2 border-dotted border-grey-400 flex items-center justify-center w-full h-full cursor-pointer text-3xl'>
          <FontAwesomeIcon icon={faGamepad} />
          </div>
          </div>
          <div className='h-[100px] p-1.5 rounded bg-[#141922] flex items-center justify-center cursor-pointer'>
          <div className='bg-[#141922] rounded border-2 border-dotted border-grey-400 flex items-center justify-center w-full h-full cursor-pointer text-3xl'>
          <FontAwesomeIcon icon={faFire} />
          </div>
          </div>
          <div className='h-[100px] p-1.5 rounded bg-[#141922] flex items-center justify-center cursor-pointer'>
          <div className='bg-[#141922] rounded border-2 border-dotted border-grey-400 flex items-center justify-center w-full h-full cursor-pointer text-3xl'>
          <FontAwesomeIcon icon={faEllipsis} />
          </div>
          </div>
      </div>
      </div>
  <div className='bg-black/56 flex items-center pl-5 pt-4 pb-4'>
  <button className='rounded-md bg-black cursor-pointer p-3'><span>My Resume <FontAwesomeIcon icon={faDownload} /></span></button> 
  <div className=" bg-gray-500 my-4 h-full w-[1px] ml-7 mr-7"></div>
  <span className='text-3xl mr-[35px]'><FontAwesomeIcon icon={faGithub} /></span>
  <span className='text-3xl mr-[35px]'><FontAwesomeIcon icon={faInstagram} /></span>
  <span className='text-3xl mr-[35px]'><FontAwesomeIcon icon={faXTwitter} /></span>
  <span className='text-3xl mr-[35px]'><FontAwesomeIcon icon={faLinkedin} /></span>
    <span className='text-3xl mr-[35px]'><FontAwesomeIcon icon={faMedium} /></span>
        <span className='text-3xl mr-[35px]'><FontAwesomeIcon icon={faGoodreads} /></span>
  </div>
     </div>
   </div>
   </div>

  )
}

export default App
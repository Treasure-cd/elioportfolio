import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faGamepad, faFire, faEllipsis, faDownload, faStarHalf, faEarDeaf } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faGithub, faXTwitter, faLinkedin, faMedium, faGoodreads } from '@fortawesome/free-brands-svg-icons'
import { color, motion } from "motion/react"
import { World } from 'planck';

const App = () => {
  const socialLinks = [
    { icon: faGithub, url: "https://github.com"},
    { icon: faInstagram, url: "https://instagram.com" },
    { icon: faXTwitter, url: "https://twitter.com" },
    { icon: faLinkedin, url: "https://linkedin.com" },
    { icon: faMedium, url: "https://medium.com" },
    { icon: faGoodreads, url: "https://goodreads.com" },
  ];
  
  const projects = [
    {stars: 4, title: "Netflix Ratings Analysis", description:"My analysis on Netflix's seasonal trends, genre popularity, and rating distribution across demographic.", url: "https://www.kaggle.com/datasets/ariyoomotade/netflix-data-cleaning-analysis-and-visualization"},
    {projectIcon: faGamepad, size: "30px", title: "Steam Games Ratings Analysis", description:"Looking through what games are in right now, along with user sentiment on them.", url: "https://www.kaggle.com/datasets/fronkongames/steam-games-dataset"},
    {projectIcon: faFire, size: "30px", title: "Heatmap of Crimes in NYC", description:"Awesome looking heatmaps, it also explains stuff, promise, of crimes in NYC since the nineties.", url: "https://www.kaggle.com/datasets/danilzyryanov/crime-in-berlin-2012-2019"},
    {projectIcon: faEllipsis, size: "30px", title: "My Kaggle", description:"See more stuff on my Kaggle.", url: "https://www.kaggle.com/danilzyryanov"}
  ]

 


  return (
    <>
      <div className='space-y-5'>
        <div className='grid grid-cols-1 md:grid-cols-[38%_62%] gap-4'>
          <motion.div 
            className="h-auto md:h-[150px] flex flex-col pt-[20px] pl-[40px]">
            <motion.h1 
              className='text-[45px]'
            >ELIO MAREN</motion.h1>
            <h3>DATA SCIENTIST/ANALYST</h3>
          </motion.div>
          <div className='bg-black/56 h-auto md:h-[150px] pl-[30px] pt-[50px] pr-[40px] pb-[50px] text-[18px]'>
            Cleaning, organizing, analyzing of data. I live to do all that, like it's replaced my lungs. Is that too poetic? - me
          </div>
        </div>
        <div className='grid grid-cols-[50%_50%] gap-4'>
          <div className='bg-black/56 p-[40px] inline-block text-[15px]'>
            <p>I'm a data scientist passionate about uncovering insights that drive smarter decisions. I love working where data meets real-world impact - building models, creating dashboards, and turning raw numbers into clear stories. I'm especially drawn to the moments where a simple metric or visualization suddenly makes something complex feel intuitive.</p>

            <p>
              Currently, I'm focused on <motion.span
                className='text-white font-extrabold cursor-pointer'
                whileHover={{ color: "#fff", textShadow: "0 0 15px #0ff" }}
              >
                predictive analytics
              </motion.span> and <motion.span
                whileHover={{ color: "#fff", textShadow: "0 0 15px #0ff" }}
                className='text-white font-extrabold cursor-pointer'
              >
                data visualization
              </motion.span>
              , helping teams make better, faster choices. I'm always refining my process, whether it's improving model performance or finding clearer ways to communicate results.
            </p>
            <p>Outside of work, you'll find me reading, exploring new datasets just for fun, or hunting for hidden gems in indie games.</p>
      

          </div>

          <div className='h-auto md:h-[300px] grid grid-rows-[70%_30%] gap-4'>
            <div className='bg-black/56 p-[30px]'>
              <h2>Here's some stuff I've worked on.</h2>
              <div className='grid grid-cols-4 gap-3 mt-[20px]'>
                {projects.map((icon, index) => (
                  
                  <div className='h-[100px] p-1.5 rounded bg-[#141922] items-center justify-center relative group inline-block cursor-pointer' key={index}
                  whileHover={index === 0? { transform: "translateY(-3px)" } : index === 1? { transform: "translateY(-3px)" } : index === 2? { transform: "translateY(-3px)" } : index === 3? { transform: "translateY(-3px)" } : {} }
                  >
                    <a href={icon.url} target="_blank" rel="noopener noreferrer">
                    <motion.div
                      className='bg-[#141922] rounded border-2 border-dotted border-grey-400 flex items-center justify-center w-full h-full cursor-pointer '
                      style={{ fontSize: icon.size }}
                      whileHover={index === 0? { color: "#FFD700", borderColor: "#C7C9D9", textShadow: "0 0 5px #FFD700" } : index === 1? { color: "#6A5ACD", borderColor: "#C7C9D9", textShadow: "0 0 5px #6A5ACD" } : index === 2? {color: "#F6412D", borderColor: "#C7C9D9", textShadow: "0 0 5px #F6412D" }: index=== 3? { color: "purple", borderColor: "#C7C9D9", textShadow: "0 0 5px purple" } : {}}

                    >
                      {icon.stars
                        ? Array.from({ length: icon.stars }).map((_, i) => (

                            <FontAwesomeIcon icon={faStar} key={i} />
                          ))
                        : <FontAwesomeIcon icon={icon.projectIcon} />
                      }
                    </motion.div>
                    </a>

                      <div class="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 
                                  bg-white text-gray-800 text-sm rounded-xl shadow-xl border  
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 
                                  p-4 pointer-events-none">
                        <div class="font-semibold text-base mb-1">{icon.title}</div>
                        <div class="border-t border-gray-200 my-2"></div>


                        <p class="text-sm text-gray-600 leading-snug">
                          {icon.description}
                        </p>
                      </div>
                    </div>
                   
                ))}
              </div>
            </div>

            <div className='bg-black/56 flex items-center pl-5 pt-4 pb-4'>
                <a href="public\resume_elio_maren.pdf" download="ElioMarenResume.pdf">
              <motion.button 
                className='rounded-md bg-black cursor-pointer p-3' 
                whileHover={{ boxShadow: "0 0 10px #0ff" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>My Resume <FontAwesomeIcon icon={faDownload} /></span>
              </motion.button>
              </a> 
              <div className="bg-gray-500 my-4 h-full w-[1px] ml-7 mr-7"></div>
              <div className="flex items-center space-x-[35px] text-3xl">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0ff] transition-transform transform hover:scale-110 duration-300"
                  >
                    <FontAwesomeIcon icon={link.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
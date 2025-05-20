import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGamepad, faFire, faEllipsis, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faGithub, faXTwitter, faLinkedin, faMedium, faGoodreads } from '@fortawesome/free-brands-svg-icons';
import { motion } from "motion/react";
import Matter from "matter-js";

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
  ];

  const [gravMode, setGravMode] = useState(false);
  
  // Refs for all the elements we want to apply physics to
  const nameBoxRef = useRef(null);
  const bioBoxRef = useRef(null);
  const aboutBoxRef = useRef(null);
  const projectsBoxRef = useRef(null);
  const resumeBoxRef = useRef(null);
  const groundRef = useRef(null);
  
  // Refs for physics engine
  const requestRef = useRef(null);
  const engineRef = useRef(null);
  const matterBodiesRef = useRef([]);
  
  // Secret code to activate gravity
  const SecretCodeListener = () => {
    const [keys, setKeys] = useState([]);
    const [lastKeyTime, setLastKeyTime] = useState(Date.now());
  
    useEffect(() => {
      const handleKey = (e) => {
        const now = Date.now();
        const key = e.key.toUpperCase();
        
        if (now - lastKeyTime > 1500) {
          setKeys([key]);
        } else {
          setKeys(prev => [...prev, key].slice(-4));
        }
        
        setLastKeyTime(now);
      };
  
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }, [lastKeyTime]);
  
    useEffect(() => {
      if (keys.length === 4 && keys.join("") === "GRAV") {
        setGravMode(true);
      }
      else if (keys.length === 4 && keys.join("") === "ANTI") {
        setGravMode(false);
      }
    }, [keys]);
  
    return null;
  };

  // Helper function to create a physics body for an element
  const createPhysicsBody = (element) => {
    if (!element) return null;
    
    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Create a slightly smaller body to prevent elements from overlapping too much
    const body = Matter.Bodies.rectangle(
      rect.left + width/2, 
      rect.top + height/2, 
      width * 0.95, 
      height * 0.95,
      {
        restitution: 0.3, // Bounciness
        friction: 0.1,
        density: 0.001 * (Math.random() * 0.5 + 0.75) // Slightly random density for variety
      }
    );
    
    return {
      body,
      elem: element,
      initialRect: rect,
      render() {
        const { x, y } = this.body.position;
        const angle = this.body.angle;
        this.elem.style.position = 'absolute';
        this.elem.style.top = `${y - height/2}px`;
        this.elem.style.left = `${x - width/2}px`;
        this.elem.style.transform = `rotate(${angle}rad)`;
        this.elem.style.zIndex = '10'; // Ensure elements are above the ground
      }
    };
  };

  // Set up Matter.js physics when gravity mode is activated
  useEffect(() => {
    if (!gravMode) return;

    // Clean up any existing physics engine
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
    }

    // Create new physics engine
    engineRef.current = Matter.Engine.create();
    const engine = engineRef.current;
    const world = engine.world;
    
    // Create bodies for all elements
    const elementsToPhysics = [
      { ref: nameBoxRef, id: 'nameBox' },
      { ref: bioBoxRef, id: 'bioBox' },
      { ref: aboutBoxRef, id: 'aboutBox' },
      { ref: projectsBoxRef, id: 'projectsBox' },
      { ref: resumeBoxRef, id: 'resumeBox' }
    ];
    
    // Reset the bodies array
    matterBodiesRef.current = [];
    
    // Create bodies for each element
    elementsToPhysics.forEach(item => {
      if (item.ref.current) {
        const physicsBody = createPhysicsBody(item.ref.current);
        if (physicsBody) {
          matterBodiesRef.current.push(physicsBody);
        }
      }
    });
    
    // Create boundaries (walls and ground)
    const wallThickness = 50;
    
    // Ground at the bottom of the viewport
    const groundY = window.innerHeight - 20;
    const ground = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      groundY,
      window.innerWidth * 2,
      wallThickness,
      { isStatic: true }
    );
    
    // Left wall
    const leftWall = Matter.Bodies.rectangle(
      -wallThickness / 2,
      window.innerHeight / 2,
      wallThickness,
      window.innerHeight * 2,
      { isStatic: true }
    );
    
    // Right wall
    const rightWall = Matter.Bodies.rectangle(
      window.innerWidth + wallThickness / 2,
      window.innerHeight / 2,
      wallThickness,
      window.innerHeight * 2,
      { isStatic: true }
    );

    // Add mouse control
    const mouse = Matter.Mouse.create(document.body);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    // Add all bodies to the world
    Matter.Composite.add(world, [
      ...matterBodiesRef.current.map(item => item.body),
      ground, leftWall, rightWall,
      mouseConstraint
    ]);

    // Start the animation loop
    const animate = () => {
      matterBodiesRef.current.forEach(body => {
        if (body) body.render();
      });
      
      Matter.Engine.update(engine, 1000 / 60);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, [gravMode]);

  return (
    <>
      <SecretCodeListener />
      <div className='space-y-5'>
        <div className='grid grid-cols-1 md:grid-cols-[38%_62%] gap-4'>
          <motion.div
          style={gravMode? {userSelect: "none"} : null}
            ref={nameBoxRef}
            className="h-auto md:h-[150px] flex flex-col pt-[20px] pl-[40px]">
            <motion.h1
              className='text-[45px]'
            >ELIO MAREN</motion.h1>
            <h3>DATA SCIENTIST/ANALYST</h3>
          </motion.div>
          <div 
            ref={bioBoxRef}
            style={gravMode? {userSelect: "none"}: null}
            className='bg-black/56 h-auto md:h-[150px] pl-[30px] pt-[50px] pr-[40px] pb-[50px] text-[18px]'>
            Cleaning, organizing, analyzing of data. I live to do all that, like it's replaced my lungs. Is that too poetic? - me
          </div>
        </div>
        <div className='grid grid-cols-[50%_50%] gap-4'>
          <div 
            ref={aboutBoxRef}
            style={gravMode? {userSelect: "none"}: null}
            className='bg-black/56 p-[40px] inline-block text-[15px]'>
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
            <div 
              ref={projectsBoxRef}
              style={gravMode? {userSelect: "none"}: null}
              className='bg-black/56 p-[30px]'>
              <h2>Here's some stuff I've worked on.</h2>
              <div className='grid grid-cols-4 gap-3 mt-[20px]'>
                {projects.map((icon, index) => (
                  <div className='h-[100px] p-1.5 rounded bg-[#141922] items-center justify-center relative group inline-block cursor-pointer' key={index}>
                    <a href={icon.url} target="_blank" rel="noopener noreferrer">
                      <motion.div
                        className='bg-[#141922] rounded border-2 border-dotted border-grey-400 flex items-center justify-center w-full h-full cursor-pointer'
                        style={{ fontSize: icon.size }}
                        whileHover={
                          index === 0 ? { color: "#FFD700", borderColor: "#C7C9D9", textShadow: "0 0 5px #FFD700", y: -3 } : 
                          index === 1 ? { color: "#6A5ACD", borderColor: "#C7C9D9", textShadow: "0 0 5px #6A5ACD", y: -3 } : 
                          index === 2 ? { color: "#F6412D", borderColor: "#C7C9D9", textShadow: "0 0 5px #F6412D", y: -3 } : 
                          index === 3 ? { color: "purple", borderColor: "#C7C9D9", textShadow: "0 0 5px purple", y: -3 } : {}
                        }
                      >
                        {icon.stars
                          ? Array.from({ length: icon.stars }).map((_, i) => (
                              <FontAwesomeIcon icon={faStar} key={i} />
                            ))
                          : <FontAwesomeIcon icon={icon.projectIcon} />
                        }
                      </motion.div>
                    </a>

                    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 
                                bg-white text-gray-800 text-sm rounded-xl shadow-xl border  
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 
                                p-4 pointer-events-none">
                      <div className="font-semibold text-base mb-1">{icon.title}</div>
                      <div className="border-t border-gray-200 my-2"></div>
                      <p className="text-sm text-gray-600 leading-snug">
                        {icon.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div 
              ref={resumeBoxRef}
              style={gravMode? {userSelect: "none"}: null}
              className='bg-black/56 flex items-center pl-5 pt-4 pb-4'>
              <a href="public/resume_elio_maren.pdf" download="ElioMarenResume.pdf">
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
        <div ref={groundRef} id="ground"></div>
      </div>
    </>
  );
};

export default App;
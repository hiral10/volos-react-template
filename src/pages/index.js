import { useEffect, useState } from "react"

// Sections
import HomeSection from "./sections/Home"
import Service from "./sections/Service"
import Resume from "./sections/Resume"
import Contact from "./sections/Contact"
import Portfolio from "./sections/portfolio"
import Skills from "./sections/Skills"

// Components
import Loader from "../components/Loader"
import Testimonials from "./sections/testimonials"

// -------------------

function Home() {
  const [loading, setLoading] = useState(true)
  const [fadeOffLoader, setFadeOffLoader] = useState(false)

  const [userdata,setUserdata] = useState({user:{}})
  useEffect(() => {
    const loaderTimer = setTimeout(handleLoad, 750)
    return () => {
      clearTimeout(loaderTimer)
    }
  }, [])

  const handleLoad = () => {
    setFadeOffLoader(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }
  const performAPICall =async()=>{
    let response = {};
      let errored = false;
  
      try {
        response = await (
          await fetch(`https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae`, {
            method: "GET",
          })
        ).json();
      } catch (e) {
        errored = true;
        return errored;
      }
      setUserdata((prevState)=>({
        ...prevState,
        user:response.user
      }))
     return userdata
  }
   useEffect(() => {
    performAPICall();
  },[])
  return (
    <>
      {loading ? <Loader fadeOffLoader={fadeOffLoader} /> : <></>}

      <div>
        <div className="content-right">
          <div className="content-right-wrapper">
            {Object.keys(userdata.user).length!==0 && 
            <>
            <HomeSection userdata={userdata.user} />
            <Service userdata={userdata.user.services}/>
            <Portfolio userdata={userdata.user.projects} />
            <Resume userdata={userdata.user.timeline}/>
            <Skills userdata={userdata.user.skills}/>
            <Testimonials userdata={userdata.user.testimonials}/>
            <Contact />
            </>
          }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

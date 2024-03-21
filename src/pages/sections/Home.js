// Data
import homeData from '../../data/home.json';
import {useEffect, useState} from 'react'
// ---------------

function Home({userdata}) {
  const [name,setname] = useState({user:{about:[]}})
  // const performAPICall =async()=>{
  //   let response = {};
  //     let errored = false;
  
  //     try {
  //       response = await (
  //         await fetch(`https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae`, {
  //           method: "GET",
  //         })
  //       ).json();
  //     } catch (e) {
  //       errored = true;
  //       return errored;
  //     }
  //    setname((prevState)=>({
  //     ...prevState,
  //     user:
  //     {about:response.user.about}
  //    }))
  //     return name;
  
  // }
  // useEffect(() => {
  //   performAPICall();

  // },[])

  return (
    <section id="home" className="section full-width-section">
      <div className="section-wrapper block">
        <div className="home-left-part">
          <p className="site-des">{homeData.welcomeText}</p>
          <h1 className="entry-title">{userdata.about.name}</h1>
          <p className="site-info">{userdata.about.description}</p>

          <div className="social-links">
            {userdata.social_handles.map((link, i) => (
              <a key={'social-link-' + i} href={link.url}>
                {link.platform}
              </a>
            ))}
          </div>
        </div>
        <div className="home-right-part">
          <img src={userdata.about.avatar.url}></img>
        
        </div>
      </div>
    </section>
  );
}

export default Home;

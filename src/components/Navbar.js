import { useEffect, useState } from 'react';

// Images
import signature from '../assets/images/signature.png';
import { Link } from 'react-scroll';

// Data
import navData from '../data/navbar.json';

// --------------


function Navbar({ isLanding }) {
  const [navActive, setNavActive] = useState(false);
  const [sectionNum, setSectionNum] = useState(1);
  const [userdata,setUserdata] = useState({user:{}})

  /**
   * Hiding navigation on clicking a nav link (important in mobie view)
   */
  const handleLinkClick = () => {
    setNavActive(false);
  };

  /**
   * Change the number in the navigation depends on the number of section
   *
   * @param numToActivate number of activated section
   */
  const handleActive = (numToActivate) => {
    setSectionNum(numToActivate);
  };

  /**
   * Toggle menu on clicking on menu btn
   */
  const handleMenuBtnClick = () => {
    setNavActive(!navActive);
  };
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
    <div className="content-left">
      <div className="content-left-wrapper">
        <header>
          <div className="toggle-holder">
            <div
              id="toggle"
              onClick={handleMenuBtnClick}
              className={navActive ? 'on' : ''}>
              <div className="menu-line"></div>
            </div>
          </div>

          <div className="top-pagination">
            <div className="current-num">
              <span>0{sectionNum}</span>
            </div>
            <div className="pagination-div"></div>
            <div className="total-pages-num">0{navData.navLinks.length}</div>
          </div>

          <div className={navActive ? 'menu-holder open' : 'menu-holder'}>
            <div className="menu-wrapper relative">
              <nav id="header-main-menu">
                <ul className="main-menu sm sm-clean">
                  {navData.navLinks.map((link, i) => (
                    <li key={'nav-' + i} style={{ cursor: 'pointer' }}>
                      <Link
                        activeClass="current"
                        smooth
                        spy
                        to={link.to}
                        onClick={handleLinkClick}
                        onSetActive={() => handleActive(i + 1)}>
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          {typeof userdata.user.about!=='undefined' && 
          <div className="my-info-wrapper">
              <div className="my-info">
                <p className="my-info-title">NAME</p>
                <p className="my-info-content">{userdata.user.about.name}</p>
              </div>
              <div className="my-info">
                <p className="my-info-title">ROLE</p>
                <p className="my-info-content">{userdata.user.role}</p>
              </div>
              <div className="my-info">
                <p className="my-info-title">EMAIL</p>
                <p className="my-info-content">{userdata.user.email}</p>
              </div>
              <div className="my-info">
                <p className="my-info-title">EMAIL</p>
                <p className="my-info-content">{userdata.user.about.phoneNumber}</p>
              </div>
            <img className="my-info-signature" src={signature} alt="" />
          </div>
          }
          <div className="big-num">
            <div className="current-big-num">0{sectionNum}</div>
            <div className="icon-scroll"></div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Navbar;

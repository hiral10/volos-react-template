import { useState } from "react"

// Plugins
import { motion, AnimatePresence } from "framer-motion"
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"

// UI Components
import PortfolioItem1 from "./items/PortfolioItem1"
import PortfolioItem2 from "./items/PortfolioItem2"
import PortfolioItem3 from "./items/PortfolioItem3"

// Images
import portfolio1 from "../../../assets/images/portfolio/portfolio1.jpg"
import portfolio2 from "../../../assets/images/portfolio/portfolio2.jpg"
import portfolio3 from "../../../assets/images/portfolio/portfolio3.jpg"
import portfolio4 from "../../../assets/images/portfolio/portfolio4.jpg"
import portfolio5 from "../../../assets/images/portfolio/portfolio5.jpg"
import portfolio6 from "../../../assets/images/portfolio/portfolio6.jpg"
import portfolio7 from "../../../assets/images/portfolio/portfolio6.jpg"
// --> Portfolio items
import portfolioItem1 from "../../../assets/images/portfolio/items/item_03.jpg"
import portfolioItem2 from "../../../assets/images/portfolio/items/item_02.jpg"
// --> Icon Images
import backArrow from "../../../assets/images/close-left-arrow.png"
import closeIcon from "../../../assets/images/close.png"

// Styles
import "./portfolio.css"

// Data
import portfolioData from "../../../data/portfolio.json"

// --------------

function Portfolio({userdata}) {
  const images = [
    portfolio1,
    portfolio2,
    portfolio3,
    portfolio4,
    portfolio5,
    portfolio6,
    portfolio7
  ]

  // Portfolio item to be shown (change rendered different components in item folder)
  const [portfolioItem, setPortfolioItem] = useState(0)
  // Portfolio item to be shown as a popup
  const [openPortfolio, setOpenPortfolio] = useState(0)
  const techStack =['all','Mern','Nextjs','Reactjs','CSS','TailwindCSS']
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")

  /**
   * Toggle filter buttons menu display
   */
  const handleToggleFilterBtns = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  /**
   * Show images that have category matches the given, and
   * remove the images with different category.
   *
   * if the category equals `all`, it will show all images
   *
   * @param category images category to be shown
   */
  const handleFilterImages = category => {
    console.log("CAT",category)
    setSelectedCategory(category)
  }
  let filterdata = userdata.filter(item=>{
    if(item.techStack.map((val)=>val.trim()).includes(selectedCategory)){
      return userdata.filter((s)=>s!==selectedCategory)
    }  
    
  })
  // const duplicates =userdata.filter((val)=>val.techStack.includes(data)            );

  const filteredImages =
    selectedCategory === "all" ? userdata: filterdata

  /**
   * Opening portfolio item that the user clicked
   *
   * @param num portfolio item to be open
   */
  const handleOpenItem = num => {
    const element = document.getElementById("portfolio-wrapper")
    if (element) {
      element.scrollIntoView()
    }
    setPortfolioItem(num)
  }

  /**
   * Close Opened portfolio item and show the portfolio grid images
   */
  const handlCloseItem = () => {
    setPortfolioItem(0)
  }

  /**
   * Open a popup of the item with the given number passed to the function
   *
   * @param num Pop up item number to be open
   */
  const handleOpenPopup = num => {
    setOpenPortfolio(num)
  }

  /**
   * Closed the opened items by reseting the {openPortfolio} variable to 0
   */
  const handleClosePopup = () => {
    setOpenPortfolio(0)
  }

  return (
    <section id="portfolio" className="section">
      <div className="section-wrapper block">
        <div className="content-1300">
          <div id="portfolio-wrapper" className="relative">
            {portfolioItem === 0 ? (
              <>
                <div
                  className="category-filter"
                  onClick={handleToggleFilterBtns}
                >
                  <div className="category-filter-icon"></div>
                </div>
                <motion.div
                  variants={{
                    expanded: {
                      height: "auto",
                      paddingTop: "24px",
                      paddingBottom: "24px",
                      opacity: 1,
                      transition: {
                        duration: 0.3
                      }
                    },
                    collapsed: {
                      height: 0,
                      paddingTop: 0,
                      paddingBottom: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.3
                      }
                    }
                  }}
                  animate={isFilterOpen ? "expanded" : "collapsed"}
                  initial="collapsed"
                  className={
                    "category-filter-list button-group filters-button-group visible"
                  }
                >
                  {techStack.map((flBtn, i) => (
                    <div
                      key={"filter-btn-" + i}
                      className={
                        "button " +
                        (selectedCategory === flBtn
                          ? "is-checked"
                          : "")
                      }
                      onClick={() => handleFilterImages(flBtn)}
                    >
                      {flBtn}
                    </div>
                  ))}
                 
                </motion.div>
                <div className="portfolio-load-content-holder"></div>
                <motion.div className="grid" id="portfolio-grid" layout>
                  {filteredImages.map((item, i) => (
                    <AnimatePresence key={"portfolio-item-" + i}>
                      <motion.div
                        // layout
                        animate={{ scale: 1, opacity: 1 }}
                        initial={{ scale: 0, opacity: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        id={"p-item-" + (i + 1)}
                        className="grid-item element-item p-one-third"
                      >
                        <a
                          className="item-link ajax-portfolio"
                          style={{ position: "relative" }}
                          data-id={i + 1}
                          onClick={() => {
                           
                              handleOpenItem(item._id)

                          }}
                        >
                          
                          <img src={item.image.url} alt="" />
                          <div className="portfolio-text-holder">
                            <div className="portfolio-text-wrapper">
                              <p className="portfolio-text">
                                {item.title}
                              </p>
                              <p className="portfolio-cat">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </a>
                      </motion.div>
                    </AnimatePresence>
                  ))}
                </motion.div>
              </>
            ) : (
              // Portfolio items to be opened as a separate component
              <div className="portfolio-load-content-holder">
                <div
                  className="close-icon"
                  role="button"
                  onClick={handlCloseItem}
                >
                  <img src={backArrow} alt="back arrow" />
                </div>
                
                
                {userdata.map((item, i) => (
                <div key={i}>
                  {item._id===portfolioItem &&
                  <div>
                  <PortfolioItem1 image={item.image.url} title={item.title} description={item.description}/>

                    </div>
                  }

                  </div>
                ))}
              
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popups portfolio items */}
      <Popup
        open={openPortfolio !== 0}
        closeOnDocumentClick
        onClose={handleClosePopup}
        modal
      >
        <div className="my-popup">
          <div
            className="close-popup-btn"
            role="button"
            onClick={handleClosePopup}
          >
            <img src={closeIcon} alt="close icon" />
          </div>
          {openPortfolio === 1 ? (
            <p className="block-right poped-up-item" onClick={this.state.close}>
              <iframe
                src="https://player.vimeo.com/video/199192931"
                width="100%"
                allow="autoplay; fullscreen"
              ></iframe>
            </p>
          ) : openPortfolio === 2 ? (
            <div className="popup-image-box">
              <img src={portfolioItem1} alt="portfolio image" />
            </div>
          ) : openPortfolio === 3 ? (
            <div className="popup-image-box">
              <img src={portfolioItem2} alt="portfolio image" />
            </div>
          ) : (
            <></>
          )}
        </div>
      </Popup>
    </section>
  )
}

export default Portfolio

import React from 'react';
import './Homepage.css'; // Don't forget to import your custom CSS
import { Carousel } from 'react-bootstrap';

import img1 from '../../images/1.jpeg';
import img2 from '../../images/2.jpeg';
import img3 from '../../images/3.png';
import img4 from '../../images/4.jpeg';
import img6 from '../../images/6.png';
import img22 from '../../images/22.jpg';
import img33 from '../../images/33.jpg';
import img44 from '../../images/44.jpg';
import img55 from '../../images/55.jpg';
import alue from "../../images/alula-elephant.jpg";
import jadah from "../../images/Jeddah.jpg";
import { Helmet } from 'react-helmet';

const HomePage = () => {
  return (
    <div>
        <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Explore KSA HomePage" />
      </Helmet>
      <section className="header-section">
        <Carousel id="carouselExampleControls" className="carousel-container">
          <Carousel.Item>
            <div className="carousel-item-bg" style={{ backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.6)
    ),url(${img1})` , backgroundPosition:"center",backgroundSize:"100% 100%" }}>
              <div className="carousel-caption d-block">
                <h1>Explore KSA</h1>
                <p>Welcome to Explore the Wonders of Saudi Arabia</p>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-item-bg" style={{ backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.6)
    ),url(${img2})` ,backgroundPosition:"center",backgroundSize:"100% 100%" }}>
              <div className="carousel-caption d-block">
                <h1>Religious Tourism</h1>
                <p>Discover the spiritual richness of Makkah and Madinah.</p>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-item-bg" style={{ backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.6)
    ),url(${img3})`,backgroundPosition:"center",backgroundSize:"100% 100%" }}>
              <div className="carousel-caption d-block">
                 <h1>Nature</h1>
               
                <p>Discover the untamed beauty of Saudi Arabia, where
                  vast deserts, lush oases, and majestic mountains
                  paint a landscape like no other.</p>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-item-bg" style={{ backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.6)
    ),url(${img4})` ,backgroundPosition:"center",backgroundSize:"100% 100%" }}>
              <div className="carousel-caption d-block">
              <h1>Culture</h1>
              <p>a journey through heritage, hospitality,
              and breathtaking landscapes.</p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Section 2: Religious Tourism */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-5">Religious Tourism</h2>
          <div className="content">
            <img src={img22} alt="Makkah" />
            <div className="text text-dark">
              <h3 className="text-center text-dark">Makkah al mukarramah</h3>
              <p className="text-center text-dark">Makkah is the holiest city in Islam and a spiritual center for millions of Muslims around the world. It is home to the Masjid al-Haram and the Kaaba, a site of pilgrimage (Hajj) for Muslims.</p>
            </div>
          </div>
          <div className="content">
            <img src={img33} alt="Madinah" />
            <div className="text">
              <h3 className="text-center text-dark">AL Madinah AL Munawwarah</h3>
              <p className="text-center text-dark">Madinah, known as the City of the Prophet, is another sacred city in Islam. It is home to Al-Masjid an-Nabawi, the Prophet's Mosque, and attracts millions of visitors every year.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 and 4 remain unchanged */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Culture</h2>
          <div className="content">
            <img src={img4} alt="King Fahd Park" />
            <div className="text">
              <p className="text-center text-dark">a journey through heritage, hospitality,
              and breathtaking landscapes.</p>
            </div>
          </div>
          <div className="content">
            <img src={img6} alt="Jeddah Corniche" />
            <div className="text">
              <h3 className="text-center text-dark">Corniche of Jeddah</h3>
              <p className="text-center text-dark">The Jeddah Corniche is a stunning waterfront area in Jeddah, offering a vibrant atmosphere with a mix of shopping, dining, and entertainment options.</p>
            </div>
          </div>
        </div>
        {/* one */}
        <div className="container">
          
          <div className="content">
            <img src={alue} alt="King Fahd Park" />
            <div className="text">
            <h2 className="text-center mb-5">Alula</h2>
              <p className="text-center text-dark">
              Al-‘Ula is an ancient oasis city in the Medina Province of Saudi
Arabia, located in the historic region of the Hejaz. Renowned for
its pivotal role in Islamic history and several pre-Islamic Semitic
civilizations, al-‘Ula was a bustling market city along the ancient
incense trade route, which connected India and the Persian Gulf
with the Levant and Europe.
              </p>
            </div>
          </div>
        
        </div>
        {/* two */}
        <div className="container">
          
          <div className="content">
            <img src={jadah} alt="King Fahd Park" />
            <div className="text">
            <h2 className="text-center mb-5">Jeddah Al
            Balad</h2>
              <p className="text-center text-dark">Jeddah’s Al-Balad is a magical destination where history
comes to life. Wander through its narrow streets lined
with beautiful houses, vibrant markets, and ancient
mosques. The cultural landmarks transport visitors back
in time, offering an authentic taste of Saudi Arabia’s rich
heritage. Al-Balad is a must-see for anyone seeking an
unforgettable blend of history, art, and local charm.</p>
            </div>
          </div>
         
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-center mb-5">Nature</h2>
          <div className="content">
            <img src={img3} alt="Riyadh Season" />
          <div className="text">
            
            <p className="text-center text-dark">Discover the untamed beauty of Saudi Arabia, where
                          vast deserts, lush oases, and majestic mountains
                          paint a landscape like no other.</p>
          </div>
          </div>
        </div>
        {/* الطائف */}
        <div className="container">
          
          <div className="content">
            <img src={img44} alt="Riyadh Season" />
          <div className="text">
          <h2 className="text-center mb-5">Taif</h2>
            <p className="text-center text-dark">Taif, located in the Makkah Province of Saudi Arabia at 1,879
meters on the slopes of the Hijaz Mountains, is a city known for
its pleasant climate and rich history. Historically significant in
both pre-Islamic and Islamic eras, Taif is especially famous for
its Taif roses, which thrive in its cooler temperatures. These
fragrant roses are central to the local economy, used in perfumes
and rose water, and celebrated annually in the Taif Rose Festival.</p>
          </div>
          </div>
        </div>
        {/*  */}
        <div className="container">
          
          <div className="content">
            <img src={img55} alt="Riyadh Season" />
          <div className="text">
          <h2 className="text-center mb-5">Red Sea</h2>
            <p className="text-center text-dark">The Red Sea is a breathtaking paradise with crystal-
clear waters, vibrant coral reefs. Perfect for diving and
water sports, it offers an unforgettable experience for
adventurers. Rich in both natural beauty and historical
charm, it's a coastal gem waiting to be explored.</p>
          </div>
          </div>
        </div>
      </section>
      
     
    </div>
  );
};

export default HomePage;

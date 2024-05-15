import Navbar from "../components/navbar";


const HomeComponent = () => {
  return (
    <div>
      <Navbar/>
        <style>{`
        
        body {
          font-family:'Poppins', sans-serif;
          margin: 0;
          padding: 0;
        }
        /* ---------------------------------------hero (welcome)section-------------------------------------------*/
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        #hero {
          width: 100%;
          height: 100vh;
          background: url("src/assets/banner-home.jpg") top center;
          background-size: cover;
          margin-bottom: -125px;
          display: flex;
          justify-content:left;
          align-items: center;
          text-align: left;
          color: #2c4964;
          
        }
        
        #hero h1 {
          margin: 0;
          font-size: 30px;
          font-weight: 900;
          line-height: 56px;
          text-transform: uppercase;
          margin-left: 120px; /* Adjust this value as needed */
        }
        #hero h2 {
          margin: 10px 0 0 0;
          font-size: 24px;
          margin-left: 120px; /* Adjust this value as needed */
        }
        #hero .btn-get-started {
          font-family: "Raleway", sans-serif;
          text-transform: uppercase;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: 1px;
          display: inline-block;
          padding: 12px 35px;
          margin-top: 30px;
          border-radius: 50px;
          transition: 0.5s;
          color: #fff;
          background:  #2c4964;
          text-decoration: none;
          margin-left: 120px; 
        }
        #hero .btn-get-started:hover {
          background: #3291e6;
        }
      
        /* ---------------------------------------------------Why Us Section ----------------------------------------*/
        /* Main Section */
        #main {
          padding: 20px; 
        }
        
        /* Why Us Section */
        #why-us {
          padding: 60px 0;
          background-color:transparent;
          
        
        }
        
        #why-us .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        #why-us h3 {
          font-size: 30px;
          margin-bottom: 20px;
        }
        
        #why-us p {
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 20px;
          color: #2c4964;
        }
        
        #why-us .more-btn {
          display: inline-block;
          background: rgba(25, 119, 204, 0.2);
          padding: 10px 25px;
          color:  #2c4964;
          border-radius: 30px;
          transition: all ease-in-out 0.4s;
          text-decoration: none;
        }
        
        #why-us h3{
          color: #2c4964;
        }

        #why-us h4{
          color: #2c4964;
        }


        #why-us .more-btn:hover {
          color: #fff;
          background: #1977cc;
        }
        
        #why-us .icon-box {
          text-align: center;
          border-radius: 10px;
          background: #fff;
          box-shadow: 10px 15px 40px rgba(0, 0, 0, 0.1);
          padding: 40px 30px;
          margin-bottom: 30px;
          outline: 2px solid transparent; 
          outline-color: #1977cc;
          width: 170px; /* Set a fixed width */
          height: 320px; /* Set a fixed height */
          overflow: hidden; /* Hide overflow content */
        }
        
        
        #why-us .icon-box:hover {
          outline-color: #082744; /* Change outline color on hover */
          background: #b2c8dd;
          
        }
        
        
        #why-us .icon-box i {
          font-size: 40px;
          color: #2c4964;
          margin-bottom: 20px;
          
        }
        
        #why-us .icon-box h4 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 15px;
        }
        
        #why-us .icon-box p {
          font-size: 16px;
          font-weight:500;
          color: #2c4964;
          line-height: 1.6;
        }
        #why-us .icon-boxes .col-xl-4:not(:last-child) {
          margin-right: 15px; /* Add spacing between each icon box */
        }

        #why-us .row {
          display: flex;
          flex-wrap: nowrap; /* Prevent wrapping to keep them in a single line */
          align-items: flex-start; /* Align items at the start of the flex container */
        }
        
        #why-us .col-lg-4,
        #why-us .col-lg-8 {
          flex: 1; /* Allow the columns to grow and shrink based on available space */
        }
        
        #why-us .content {
          padding: 20px; /* Add padding to the content section */
          margin-right: 20px; /* Add some spacing between content and icon boxes */
        }
        
        #why-us .icon-boxes {
          flex: 1; /* Allow the icon boxes section to take up remaining space */
        }

        /* ---------------------------------------------------Why Us Section ----------------------------------------*/

        #about-us .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        #about-us .row {
          display: flex;
          flex-wrap: wrap; /* Allow items to wrap on smaller screens */
        }
        
        #about-us .col-lg-6 {
          flex: 0 0 50%; /* Make each column take up 50% of the row width */
        }
        
        #about-us .col-lg-6 img {
          max-width: 90%;
          height: auto;
        }
        
        #about-us .content {
          padding: 20px;
        }
        
        #about-us .content h3 {
          font-size: 35px;
          margin-bottom: 25px;
          color:#2c4964;
        }
        
        #about-us .content p {
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 20px;
          color:#2c4964;
        }
        
        #about-us ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
          color:#2c4964;
        }
        
        #about-us ul li {
          margin-bottom: 40px;
          color:#2c4964;
          font-size:18px;
        }
        
        #about-us .text-center {
          text-align: center;
        }
        
        #about-us .more-btn {
          display: inline-block;
          background: rgba(25, 119, 204, 0.2);
          padding: 10px 25px;
          color: #1977cc;
          border-radius: 30px;
          transition: all ease-in-out 0.4s;
          text-decoration: none;
        }
        
        #about-us .more-btn:hover {
          color: #fff;
          background: #1977cc;
        }
        
        
        
        `}</style>

      {/* Hero Section */}
      
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"></link>

      <section id="hero" className="d-flex align-items-center ">
      <div className="container">
        <h1>Welcome to Eye-Site Opticals</h1>
        <h2>Where your vision finds calrity and style</h2>
        <a href="#about" className="btn-get-started">Get Started</a>
      </div>
    </section>

    
<main id="main">

    {/* why us */}

    <section id="why-us">
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <div className="content">
                        <h3>Why Choose Eye-Site?</h3>
                        <p>
                         Eye-Site Opticals for personalized eye care backed by expertise and innovation. With cutting-edge technology and a dedicated team, we are committed to enhancing your vision and providing unmatched service. Choose clarity, choose Eye-Site Opticals
                        </p>
                        <div className="text-center">
                            <a href="#" className="more-btn">Learn More <i className="bx bx-chevron-right"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="icon-boxes">
                        <div className="row">
                            <div className="col-xl-4">
                                <div className="icon-box">
                                    <i className="fas fa-check-circle"></i>
                                    <h4>Commitment to Excellence</h4>
                                    <p>We prioritize precision, quality, and continuous improvement to deliver unparalleled service and results.</p>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="icon-box">
                                    <i className="fas fa-check-circle"></i>
                                    <h4>Professional service</h4>
                                    <p> Our team of experts is dedicated to providing attentive and knowledgeable assistance at  your eye care journey. </p>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="icon-box">
                                    <i className="fas fa-check-circle"></i>
                                    <h4>Epitome of Quality</h4>
                                    <p>Only the finest materials and advanced technologies to enhances your vision but also reflects your unique style and personality.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

{/* About */}

<main id="main">
  <section id="about-us">
    <div className="container">
      <div className="row">
        {/* Left Container */}
        <div className="col-lg-6">
          <img src="src/assets/sunglass-image.jpeg" alt="Image Description" className="img-fluid" />
        </div>
        {/* Right Container */}
        <div className="col-lg-6">
          <div className="content">
            <h3>About Us</h3>
            <p>Empowering vision for a brighter tomorrow, Eye-Site Opticals is your trusted partner in exceptional eye care.</p>
            {/* List of Points */}
            <ul>
            <li><i className="fas fa-check-circle"></i> Precision-focused eye care solutions tailored to your needs.</li>
              <li><i className="fas fa-check-circle"></i> Dedicated team delivering expert care and attention to detail.</li>
              <li><i className="fas fa-check-circle"></i>Comprehensive services ranging from exams to advanced vision correction.</li>
              <li><i className="fas fa-check-circle"></i> Personalized approach prioritizing your eye health and overall well-being</li>
            
            </ul>
            <div className="text-center">
              <a href="#" className="more-btn">Learn More <i className="bx bx-chevron-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <iframe
          title="Eye Site Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21384.473738743014!2d79.86685294171843!3d6.837373978697427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25ae7c4420c03%3A0xdfa66e19dcb89743!2sEye%20Site!5e0!3m2!1sen!2slk!4v1715587136918!5m2!1sen!2slk"
          width="1479"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
</main>








</div>

  );
};

export default HomeComponent;

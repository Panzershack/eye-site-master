// import { useState } from "react";
import ConsultationsFormComponent from "../pages/consultations/CreateConsultation";
import InquiriesFormComponent from "../pages/inquiries/CreateInquiry";
import Navbar from "../components/navbar";

const OurServicesComponent = () => {
  // const [count, setCount] = useState(0);

  return (
    <div className="app">
      {/* Section 1 */}
      <Navbar/>
      <div
        className="section section1"
        style={{ width: "100vw", height: "100vh", border: "5px solid black" }}
      >
        {/* Content for Section 1 */}
      </div>

      {/* Section 2 */}
      <div
        className="section section2"
        style={{ width: "100vw", height: "100vh", border: "5px solid black" }}
      >
        <ConsultationsFormComponent />
      </div>

      {/* Section 3 */}
      <div
        className="section section3"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#f0f0f0",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {/* Box 1 */}
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: "2px solid black",
            padding: "10px",
          }}
        >
          {/* Box 1 */}
          <div
            className="box"
            style={{
              width: "300px",
              height: "300px",
              backgroundColor: "white",
              border: "1px solid black",
              padding: "20px",
              marginRight: "20px",
              overflow: "hidden",
              fontSize: "19px",
            }}
          >
            {/* Content for Box 1 */}
            <p>
              We value our customers and their feedback immensely. Your
              satisfaction is our top priority, and we are committed to ensuring
              that your experience with us exceeds your expectations. Please
              feel free to share any comments, suggestions, or concerns you may
              have. Your input helps us continually enhance our services and
              tailor them to your needs.
            </p>
          </div>

          {/* Box 2 */}
          <div
            className="box"
            style={{
              width: "300px",
              height: "300px",
              backgroundColor: "white",
              border: "1px solid black",
              padding: "20px",
              marginRight: "20px",
              fontSize: "19px",
            }}
          >
            {/* Content for Box 2 */}
            <p>
              Have questions or need assistance? Our team is here to help!
              Reach out to us for inquiries about our services, products, or
              anything else related to eye care. We re committed to providing
              prompt and helpful responses to ensure your peace of mind and
              satisfaction.
            </p>
          </div>

          {/* Box 3 */}
          <div
            className="box"
            style={{
              width: "300px",
              height: "300px",
              backgroundColor: "white",
              border: "1px solid black",
              padding: "20px",
              fontSize: "19px",
            }}
          >
            {/* Content for Box 3 */}
            <p>
              Feedback is essential for us to continuously improve our services
              and ensure your satisfaction. We value your opinions and insights,
              so please don't hesitate to share your thoughts with us. Your
              feedback helps us tailor our offerings to better meet your needs
              and preferences. Thank you for taking the time to help us serve
              you better.
            </p>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div
        className="section section4"
        style={{ width: "100vw", height: "100vh", border: "5px solid black" }}
      >
        <InquiriesFormComponent />
      </div>
    </div>
  );
};

export default OurServicesComponent;

// import { useState } from "react";
import ConsultationsFormComponent from "../pages/consultations/CreateConsultation";
import InquiriesFormComponent from "../pages/inquiries/CreateInquiry";

const OurServicesComponent = () => {
  // const [count, setCount] = useState(0);

  return (
    <div className="app">
      {/* Section 1 */}
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
        style={{ width: "100vw", height: "100vh", border: "5px solid black" }}
      >
        {/* Content for Section 3 */}
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

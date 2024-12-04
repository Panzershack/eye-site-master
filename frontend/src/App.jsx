import {Routes, Route} from 'react-router-dom'


// import CreateConsultation from './pages/consultations/CreateConsultation';
// import DeleteConsultation from './pages/consultations/DeleteConsultation';
// import EditConsultation from './pages/consultations/EditConsultation';
// import ShowConsultation from './pages/consultations/ShowConsultation';
// import HomeCons from './pages/consultations/Home';

// import CreateInquiry from './pages/inquiries/CreateInquiry';
// import DeleteInquiry from './pages/inquiries/DeleteInquiry';
// import EditInquiry from './pages/inquiries/EditInquiry';
// import ShowInquiry from './pages/inquiries/ShowInquiry';
// import HomeInq from './pages/inquiries/Home';




import OurServicesComponent from './pages/OurServicesComponent';
import AdminDashBoardComponent from './pages/AdminDashBoard';
import ProductPage from './pages/ProductPage';
import RegisterAndLogin from './authentication/RegisterAndLogin';
import ResetPass from './authentication/ForgotPassword';
import HomeComponent from './pages/HomeComponent';



const App = () => {
  //5 routes are creayed for 5 different pages
  return (
    <>
      <Routes>
        {/* <Route path='/consultations/home' element={<HomeCons/>}/>
      <Route path='/consultations/create' element={<CreateConsultation/>}/>
      <Route path='/consultations/details/:id' element={<ShowConsultation/>}/>
      <Route path='/consultations/edit/:id' element={<EditConsultation/>}/>
      <Route path='/consultations/delete/:id' element={<DeleteConsultation/>}/>
      <Route path='/inquiries/home' element={<HomeInq/>}/>
      <Route path='/inquiries/create' element={<CreateInquiry/>}/>
      <Route path='/inquiries/details/:id' element={<ShowInquiry/>}/>
      <Route path='/inquiries/edit/:id' element={<EditInquiry/>}/>
      <Route path='/inquiries/delete/:id' element={<DeleteInquiry/>}/> */}

        <Route path="/" element={<HomeComponent />} />
        <Route path="/admin" element={<AdminDashBoardComponent />} />
        <Route path="/ourServices" element={<OurServicesComponent />}></Route>
        <Route path="/products" element={<ProductPage />}></Route>

        <Route path="/reglog" element={<RegisterAndLogin />}></Route>
        <Route path="/reset" element={<ResetPass />}></Route>
      </Routes>
    </>
  );
}

export default App
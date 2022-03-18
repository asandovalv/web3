import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './Components/layout'
import Home from './Components/Home/home'
import NotFound from './Components/NotFound/notFound'
import Authorize from './Services/Security/authorize'
import NotAuthorized from './Components/NotAuthorized/notAuthorized'
import AboutUs from './Components/AboutUs/aboutUs'
import ContactUs from './Components/ContactUs/contactUs'
import Wellcome from './Components/Wellcome/wellcome'

const AppRoutes = () =>
{
    return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="aboutUs" element={<Authorize><AboutUs /></Authorize>} />
                <Route path="contactUs" element={<Authorize><ContactUs /></Authorize>} />
                <Route path="*" element={<NotFound />} />
                <Route path="notAuthorized" element={<NotAuthorized />} />
                <Route path="wellcome" element={<Authorize><Wellcome /></Authorize>} />
            </Route>
        </Routes>
    </BrowserRouter>
    </>
    );
};

export default AppRoutes;
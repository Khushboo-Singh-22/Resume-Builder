import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import LenisScroll from "./lenis";

const Layout = ({ children , showFooter = true , showNavbar = true }) => {
    return (
        <>
            {showNavbar && <Navbar />}
            <LenisScroll />

            <main className="px-4 py-4 md:px-16 lg:px-24 xl:px-32">
                {/* render explicit children when provided (used by the parent app),
                    otherwise fall back to the nested router outlet */}
                {children || <Outlet />}
            </main>

            {showFooter && <Footer />}
        </>
    );
};

export default Layout;

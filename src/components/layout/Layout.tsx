import { Outlet } from "react-router";
import { useAppSelector } from "../../store/hooks";

import Header from "./Header"
import Footer from "./Footer"

import { profile } from "../../data/profile";

const Layout = () => {
    
    const skills = useAppSelector(state => state.skills);
    return (
        <>
            <Header 
                name={profile.name}
                role={profile.role}
                skillCount={skills.length} />
            <Outlet />
            <Footer />
        </>
    )
};

export default Layout;
import { Outlet } from "react-router";
import { useSkills } from "../../context/SkillsContext";

import Header from "./Header"
import Footer from "./Footer"

import { profile } from "../../data/profile";

const Layout = () => {
    const {skills} = useSkills();
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
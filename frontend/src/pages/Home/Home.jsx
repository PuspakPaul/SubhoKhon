import React from "react";
import HeroContainer from "./Hero/HeroContainer";
import Gallery from "./Gallery/Gallery";
import PopularEvents from "./PopularEventes/PopularEventes"
import PopularPackages from "./PopularPackages/PopularPackages";

const Home = () => {
    return (
        <div>
            <HeroContainer/>
            <div className="max-w-screen-x1 mx-auto">
                <Gallery/>
                <PopularEvents />
                <PopularPackages/>
            </div>
        </div>
    )
}
export default Home
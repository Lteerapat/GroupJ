import '../Styles/Landing.css';
import Navbar from './../Components/Navbar';
import Slider from './../Components/Slider1';
import Pros from './../Components/Benefit';
import Slider2 from './../Components/Slider2';
import Follow_section from './../Components/Follower';
import ImageSlider_3 from './../Components/ImageSlider_3';
import Sponsor_section from './../Components/Sponsor';
import Footer from './../Components/Footer';





const Landing = () => {

    return (
        <>
            <Navbar />
            <Slider />
            <Pros />
            <Slider2 />
            <Follow_section />
            <ImageSlider_3 />
            <Sponsor_section />
            <Footer />
        </>

       

    );

};

export default Landing;
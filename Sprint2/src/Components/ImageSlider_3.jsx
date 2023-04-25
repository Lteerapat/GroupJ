import { useCallback, useEffect, useRef, useState } from "react";
import '../Styles/ImageSlider_3.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import myJourney1 from '../Images/Landing/myJourney1.jpg';
import myJourney2 from '../Images/Landing/myJourney2.png';

const ImageSlider_3 = () => {
    const slides = [
        {url: myJourney1, title: "myJourney1"},
        {url: myJourney2, title: "myJourney2"},
        {url: myJourney2, title: "myJourney2"},

    ]
    
    return (
        <>
            <div>
                <h1>My Journey</h1>
                <div className="slider-container">
                    <Slider 
                        slides={slides} 
                        parentWidth={500} 
                    />
                </div>
            </div>
        </>
    );
};

const Slider = ({slides, parentWidth}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeSlideTab, setActiveSlideTab] = useState(0);
    const timeRef = useRef();

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setActiveSlideTab(newIndex)
    }

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setActiveSlideTab(newIndex)
    }, [currentIndex, slides]);

    const goToSlide = (slideindex) => {
        setCurrentIndex(slideindex)
        setActiveSlideTab(slideindex)
    }

    //style background image
    const slidesStyles = (slideIndex) => ({
        backgroundImage: `url(${slides[slideIndex].url})`,
        width: `${parentWidth}px`,
    })

    const slidesContainerStyles = () => ({
        width: parentWidth * slides.length,
        transform: `translateX(${-(currentIndex * parentWidth)}px)`,
    });

    useEffect(() => {
        if (timeRef.current) {
            clearTimeout(timeRef.current);
        }

        timeRef.current = setTimeout(() => {
            goToNext()
        }, 4000);

        return () => clearTimeout(timeRef.current);
    }, [goToNext]);
    
    return (
        <div className="slider">
            <div>
                <div className="previous-arrow" onClick={goToPrevious}>
                    <i class="fa-solid fa-chevron-left"></i>
                </div>
                <div className="next-arrow" onClick={goToNext}>
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
            </div>

            <div className="slides-container-overflow">
                <div
                    className="slides-container"
                    style={slidesContainerStyles()}
                >
                    {slides.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            style={slidesStyles(slideIndex)}
                            className="slides"
                        ></div>
                    ))}
                </div>
            </div>

            <div className="slides-tab-container">
                {slides.map((slide,slideindex) => (
                    <div 
                        key={slideindex} 
                        className={`slides-tab ${activeSlideTab === slideindex ? 'active-slide-tab' : ''}`}
                        onClick={() => goToSlide(slideindex)}
                    >
                        <button></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider_3;
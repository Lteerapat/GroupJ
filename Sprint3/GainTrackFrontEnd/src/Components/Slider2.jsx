import { useCallback, useEffect, useRef, useState } from "react";
import "../Styles/Slider2.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import trophy_slider2 from '../Images/Landing/trophy.png';
import chart_slider2 from '../Images/Landing/graph.png';
import line_slider2 from '../Images/Landing/Line.png';

const Slider2 = () => {
    const slides = [
        {url: trophy_slider2, title: "Achievement", 
            descriptionHeader: <a href="/login"><h2>Achievement</h2></a>,
            descriptionContent:<p>Get started today and see how our achievement feature can help you achieve your goals.</p> 
        },
        {url:chart_slider2, title: "JS Chart", 
            descriptionHeader: <a href="/login"><h2>JS Chart</h2></a>,
            descriptionContent:<p>Visualize your exercise progress!! our graph progress can help you stay motivated and reach your goals.</p> 
        },
        {url:line_slider2, title: "Line Connect", 
            descriptionHeader:<a href="/login"><h2>Line Connect</h2></a>,
            descriptionContent:<p>Connect your exercise tracking to LINE and start sharing with friends. It's easy and fun!</p> 
        },
    ]
    
    return (
        <>
            <div className="container-out__slider2" id="id__slider2">
                <div className="container-size__slider2">
                    <Slider 
                        slides={slides} 
                        parentWidth={900} 
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
    const myJourneySlidesStyles = (slideIndex) => ({
        backgroundImage: `url(${slides[slideIndex].url})`,
        width: `${parentWidth}px`,
    })

    const myJourneySlidesContainerStyles = () => ({
        width: parentWidth * slides.length,
        transform: `translateX(${-(currentIndex * parentWidth)}px)`,
    });

    useEffect(() => {
        if (timeRef.current) {
            clearTimeout(timeRef.current);
        }

        timeRef.current = setTimeout(() => {
            goToNext()
        }, 10000);

        return () => clearTimeout(timeRef.current);
    }, [goToNext]);
    
    return (
        <div className="container-content-slider2" id="feature">
            <div>
                <div className="slider2-previous-arrow" onClick={goToPrevious}>
                    <i className="fa-solid fa-chevron-left"></i>
                </div>
                <div className="slider2-next-arrow" onClick={goToNext}>
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
            </div>

            <div className="slider2-container-overflow">
                <div
                    className="slider2-container"
                    style={myJourneySlidesContainerStyles()}
                >
                    {slides.map((slide, slideIndex) => (
                        <div className="slider2-content">
                          <div className="slider2-description">
                                {slides[slideIndex].descriptionHeader}
                                {slides[slideIndex].descriptionContent}
                            </div>
                            <div className="slider2-img-container">
                                <div
                                    key={slideIndex}
                                    style={myJourneySlidesStyles(slideIndex)}
                                    className="slider2-img"
                                ></div>
                            </div>
                            
                        </div>
                    ))}    
                </div>
            </div>

            <div className="slider2-tab-container">
                {slides.map((slide,slideIndex) => (
                    <div 
                        key={slideIndex} 
                        className={`slider2-tab ${activeSlideTab === slideIndex ? 'active-slider2-tab' : ''}`}
                        onClick={() => goToSlide(slideIndex)}
                    >
                        <button></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider2;
import { useCallback, useEffect, useRef, useState } from "react";
import '../Styles/ImageSlider_3.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import myJourney1 from '../Images/Landing/myJourney1.jpg';
import myJourney2 from '../Images/Landing/myJourney2.png';
import myJourney3 from '../Images/Landing/myJourney3.jpg';

const ImageSlider_3 = () => {
    const slides = [
        {url: myJourney1, title: "myJourney1", 
            descriptionHeader:<h2>It's my first day to start a Journey!</h2>,
            descriptionContent:<p>They always say that the most difficult thing is to start something and now I'm standing here beginning with my first track.</p> 
        },
        {url: myJourney2, title: "myJourney2", 
            descriptionHeader:<h2>Exploring the Unknown</h2>,
            descriptionContent:<p>I'm stepping into the unknown, eager to discover what lies ahead on my journey.</p> 
        },
        {url: myJourney3, title: "myJourney3", 
            descriptionHeader:<h2>Chasing My Dreams</h2>,
            descriptionContent:<p>With every step, I'm getting closer to my dreams. I won't stop until I reach them.</p> 
        },
    ]
    
    return (
        <>
            <div className="img-slider-3" id="myJourney">
                <h1>My Journey</h1>
                <div className="my-journey-slider-container">
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
        <div className="my-journey-slider">
            <div>
                <div className="my-journey-previous-arrow" onClick={goToPrevious}>
                    <i className="fa-solid fa-chevron-left"></i>
                </div>
                <div className="my-journey-next-arrow" onClick={goToNext}>
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
            </div>

            <div className="my-journey-slides-container-overflow">
                <div
                    className="my-journey-slides-container"
                    style={myJourneySlidesContainerStyles()}
                >
                    {slides.map((slide, slideIndex) => (
                        <div className="my-journey-slides-content">
                            <div className="my-journey-slides-img-container">
                                <div
                                    key={slideIndex}
                                    style={myJourneySlidesStyles(slideIndex)}
                                    className="my-journey-slides-img"
                                ></div>
                            </div>
                            <div className="my-journey-slides-description">
                                {slides[slideIndex].descriptionHeader}
                                {slides[slideIndex].descriptionContent}
                            </div>
                        </div>
                    ))}    
                </div>
            </div>

            <div className="my-journey-slides-tab-container">
                {slides.map((slide,slideIndex) => (
                    <div 
                        key={slideIndex} 
                        className={`my-journey-slides-tab ${activeSlideTab === slideIndex ? 'my-journey-active-slide-tab' : ''}`}
                        onClick={() => goToSlide(slideIndex)}
                    >
                        <button></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider_3;
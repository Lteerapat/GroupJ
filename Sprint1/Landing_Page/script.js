let slideIndex = 1;


const plusSlide = (n) => {
  showSlides((slideIndex += n));
};
const currentSlide = (n) => {
  showSlides(slideIndex = n)
}

const showSlides = (n) => {
  let slides = document.querySelectorAll(".slides-header");
  let dots = document.querySelectorAll(".dot");

 //slideIndex = 4 , reset slideIndex = 1
  if( n > slides.length){
    slideIndex = 1
  }
 //slideIndex = 0 , reset slideIndex = slideIndex.length | 3
  if( n < 1){
    slideIndex = slides.length
  }
 //loop slide img display = "none"
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  //loop dot span delete class "dot active" = "dot"
  for(i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active","")
  }

  //slideIndex - 1 = 0, first img
  //slideIndex + 0 = 1, second img
  //slideIndex + 1 = 2, third img
  slides[slideIndex - 1].style.display = "block";
  //dot replace class "dot active"
  dots[slideIndex - 1].className += " active";

  //Automatic Slide
  // slideIndex++;
  // if (slideIndex > slides.length) {slideIndex = 1}
  // setTimeout(showSlides, 4000);
  
};
showSlides();
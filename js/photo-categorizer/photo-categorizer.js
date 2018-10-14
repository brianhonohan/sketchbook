class PhotoCategorizer {
  initSwiper(){
    this.swiper = new Swiper ('.swiper-container', this.swiperConfig());
  }

  swiperConfig(){
    return {
      on: {
          // slideChangeTransitionStart: this.handleSlideChangeTransitionStart,
          // slideChangeTransitionEnd: this.handleSlideChangeTransitionEnd,
          slideNextTransitionStart: this.handleSlideNextTransitionStart,
          slideNextTransitionEnd: this.handleSlideNextTransitionEnd,
          slidePrevTransitionStart: this.handleSlidePrevTransitionStart,
          slidePrevTransitionEnd: this.handleSlidePrevTransitionEnd,
          // transitionStart: this.handleTransitionStart,
          // transitionEnd: this.handleTransitionEnd
        },
      virtual: {
        slides: this.getSlides(),
        renderSlide: this.handleRenderSlide
      }
      };
  }

  // Triggered on any full slide transition (left or right)
  handleSlideChangeTransitionStart(){ categorizer.log("slideChangeTransitionStart"); }
  handleSlideChangeTransitionEnd(){ categorizer.log("slideChangeTransitionEnd"); }

  // Same as 'slideChangeTransition...', but only when dragging to left 
  handleSlideNextTransitionStart(){ categorizer.log("slideNextTransitionStart"); }
  handleSlideNextTransitionEnd(){ categorizer.log("slideNextTransitionEnd"); }

  // Same as 'slideChangeTransition...', but only when dragging to right 
  handleSlidePrevTransitionStart(){ categorizer.log("slidePrevTransitionStart"); }
  handleSlidePrevTransitionEnd(){ categorizer.log("slidePrevTransitionEnd"); }

  // Fired as soon as user dragging starts/stops, regardless if slide transitions
  handleTransitionStart(){ categorizer.log("transitionStart"); }
  handleTransitionEnd(){ categorizer.log("transitionEnd"); }

  log(message){
    console.log(message);
  }

  loadSlides(){
    this.slides = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5'];
  }

  getSlides(){
    return this.slides;
  }

  handleRenderSlide(slide, index){
    return `<div class="swiper-slide">${slide}</div>`;
  }
}

var categorizer = new PhotoCategorizer();
categorizer.loadSlides();
categorizer.initSwiper();

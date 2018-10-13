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
}

var categorizer = new PhotoCategorizer();
categorizer.initSwiper();

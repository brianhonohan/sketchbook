class PhotoCategorizer {
  constructor(){
    this.slideRenderBuffer = 2; // Render the next 2 slides
  }

  initSwiper(){
    this.swiper = new Swiper ('.swiper-container', this.swiperConfig());
  }

  swiperConfig(){
    return {
      initialSlide: this.slideRenderBuffer,
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
        slides: this.initialSlides(),
        renderSlide: this.handleRenderSlide,
        addSlidesBefore: this.slideRenderBuffer,
        addSlidesAfter: this.slideRenderBuffer,
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

  initialSlides(){
    console.log("initialSlides");
    let slideSet = [this.slides[0]];

    for (var i = 0; i < this.slideRenderBuffer; i++){
      slideSet.push(this.slides[i + 1]);
      slideSet.unshift(this.slides[i + 1]);
    }

    return slideSet;
  }

  handleRenderSlide(slide, index){
    console.log("rendering: " + index);
    return `<div class="swiper-slide">${slide}</div>`;
  }
}

var categorizer = new PhotoCategorizer();
categorizer.loadSlides();
categorizer.initSwiper();

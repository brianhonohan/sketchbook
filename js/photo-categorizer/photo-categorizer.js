class PhotoCategorizer {
  constructor(){
    this.slideRenderBuffer = 2; // Render the next 2 slides
    this.currentIdx = 0;
  }

  static get DIRECTION_LEFT() { return -1; }
  static get DIRECTION_RIGHT() { return 1; }

  initSwiper(){
    this.swiper = new Swiper ('.swiper-container', this.swiperConfig());
  }

  swiperConfig(){
    return {
      initialSlide: this.slideRenderBuffer,
      runCallbacksOnInit: false,
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
  handleSlideNextTransitionStart(){
    categorizer.log("slideNextTransitionStart");
    categorizer.handleSwipe(PhotoCategorizer.DIRECTION_LEFT);
  }
  handleSlideNextTransitionEnd(){ categorizer.log("slideNextTransitionEnd"); }

  // Same as 'slideChangeTransition...', but only when dragging to right 
  handleSlidePrevTransitionStart(){ 
    categorizer.log("slidePrevTransitionStart"); 
    categorizer.handleSwipe(PhotoCategorizer.DIRECTION_RIGHT);
  }
  handleSlidePrevTransitionEnd(){ categorizer.log("slidePrevTransitionEnd"); }

  // Fired as soon as user dragging starts/stops, regardless if slide transitions
  handleTransitionStart(){ categorizer.log("transitionStart"); }
  handleTransitionEnd(){ categorizer.log("transitionEnd"); }

  log(message){
    console.log(message);
  }

  loadSlides(){
    this.slides = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5'];
    this.slides = this.slides.map((sl) => { return {data: sl, category: null}; });
  }

  initialSlides(){
    let slideSet = [this.slides[0]];

    for (var i = 0; i < this.slideRenderBuffer; i++){
      slideSet.push(this.slides[i + 1]);
      slideSet.unshift(this.slides[i + 1]);
    }

    return slideSet;
  }

  handleSwipe(direction){
    this.categorize(this.currentIdx, this.getCategoryFor(direction));
    if (direction === PhotoCategorizer.DIRECTION_LEFT){
      this.handleSwipeLeft();
    }else if (direction === PhotoCategorizer.DIRECTION_RIGHT){
      this.handleSwipeRight();
    }
    if (this.currentIdx < this.slides.length - 1){
      this.currentIdx++;
    } else {
      this.generateCsvDownload();
    }
    this.prependAppendSlides();
  }

  handleSwipeLeft(){
    // Slightly tricky, because we're removing items to the left
    // the activeIndex will be altered ...

    // remove the item that was classified
    let idxToRemove = this.swiper.previousIndex;
    this.swiper.removeSlide(idxToRemove);

    // activeIndex will now be previousIndex, so go one further to the left
    idxToRemove = Math.max(0, idxToRemove - 1);
    if (idxToRemove > 0) {
      // Don't remove the 0 index slide,
      // Swiper doesn't handle this well with only 2 items left 
      // More likley I don't understand what its doing
      this.swiper.removeSlide(idxToRemove);
    }

    this.swiper.update();
  }

  handleSwipeRight(){
    // Simple, because we're removing items to the right
    // the activeIndex won't be altered ...

    // remove the item that was classified
    this.swiper.removeSlide(this.swiper.previousIndex);

    // remove the dupe of the current side
    this.swiper.removeSlide(this.swiper.previousIndex);

    this.swiper.update();
  }

  prependAppendSlides(){
    if (this.currentIdx < (this.slides.length - this.slideRenderBuffer)){
      let slideToAddIdx = this.currentIdx + this.slideRenderBuffer;
      let slideToAdd = this.slides[slideToAddIdx];
      let renderedSlide = this.handleRenderSlide(slideToAdd, slideToAddIdx);

      this.swiper.prependSlide(renderedSlide);
      this.swiper.appendSlide(renderedSlide);
      this.swiper.virtual.update();
    }
  }

  getCategoryFor(direction){
    if (direction === PhotoCategorizer.DIRECTION_LEFT){
      return 'Left';
    }else if (direction === PhotoCategorizer.DIRECTION_RIGHT){
      return 'Right';
    }
  }

  categorize(idx, category){
    this.log(`Categorizing index: ${idx} as category: ${category}`);
    this.slides[idx].category = category;
  }

  handleRenderSlide(slide, index){
    return `<div class="swiper-slide">${slide.data}</div>`;
  }

  generateCsvDownload(){
    // from: https://stackoverflow.com/a/14966131
    // and: https://stackoverflow.com/a/18849208
    var lineArray = [];
    this.slides.forEach(function (slide, index) {
        var line = `${slide.data},${slide.category}`;
        lineArray.push(index == 0 ? "data:text/csv;charset=utf-8," + line : line);
    });
    var csvContent = lineArray.join("\n");

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    link.innerHTML = "Download CSV";
    document.body.appendChild(link); // Required for FF
  }
}

var categorizer = new PhotoCategorizer();
categorizer.loadSlides();
categorizer.initSwiper();

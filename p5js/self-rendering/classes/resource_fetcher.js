class ResourceFetcher {

  currentPage(){
    return window.location.href;
  }

  loadHomepage(callback){
    this.fetch(this.currentPage(), callback);
  }

  fetch(url, callback){
    fetch(url)
      .then(x => callback(x) );
  }

  __fetchSynchronously(url){
    // NOTE: this is deprecated, warning:
    // Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user’s experience. For more help http://xhr.spec.whatwg.org/
    var req = new XMLHttpRequest();

    req.open('GET', url, false);
    req.send(null);
    let x; 
    if(req.status == 200) {
       x = req.responseText;
       return x;
    }
  }
}
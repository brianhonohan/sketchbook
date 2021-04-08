class ResourceFetcher {
  constructor(){
    this.resources = {};
  }

  static get CURRENT_PAGE() { return "__CURRENT_PAGE"; }

  loadCurrentPage(){
    const url =  window.location.href;
    this.fetch(ResourceFetcher.CURRENT_PAGE, url);
  }

  fetch(resource_name, url){
    let storeData = this.storeResource.bind(this);
    fetch(url)
      .then(response => response.text())
      .then(data => storeData(resource_name, data))
      .catch(error => console.warn(error));
  }

  storeResource(name, data){
    this.resources[name] = data;
    console.log(this.resources);
    return data;
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
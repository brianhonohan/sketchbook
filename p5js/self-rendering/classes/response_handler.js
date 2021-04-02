class ResponseHandler {
  constructor(response){
    this.response = response;
  }

  body(callback){
    if (this.bodyText) {
      callback(this.bodyText);
    } else {
      this.bodyText = "";
      this.fetchStream(this.response.body, callback);
    }
  }

  // based on: https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader
  // And decoding based on: https://ourcodeworld.com/articles/read/164/how-to-convert-an-uint8array-to-string-in-javascript
  fetchStream(stream, callback) {
    const reader = stream.getReader();
    let self = this;
    let decoder = new TextDecoder("utf-8");

    reader.read().then(function processText({ done, value }) {
      if (done) {
        callback(self.bodyText);
        return;
      }
      self.bodyText += decoder.decode(value);
      return reader.read().then(processText);
    });
  }
}
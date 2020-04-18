class LayoutUtilFunctions {

  calcTransformToFitRectInRect(rectB, rectA){
    // fit rectB inside of rectA
    // preserve the aspect ratio of rectB
    // center rectB (horizontally / vertically) in rectA
    // make rectB as large as possible
    if (this._isRectAFlatterThanB(rectA,rectB)){
      return this._calcFlattenTransform(rectA,rectB);
    } else {
      return this._calcElongateTransform(rectA,rectB);
    }
  }

  _baseTransform(){
    return {
      xOffset: 0,
      yOffset: 0,
      scale: 1
    };
  }

  _calcFlattenTransform(rectA, rectB){
    const transform = this._baseTransform();
    transform.scale = rectA.height / rectB.height;
    transform.xOffset = 0.5 * (rectA.width - rectB.width * transform.scale);
    return transform;
  }

  _calcElongateTransform(){
    const transform = this._baseTransform();
    transform.scale = rectA.width / rectB.width;
    transform.yOffset = 0.5 * (rectA.height - rectB.height * transform.scale);
    return transform;
  }

  _isRectAFlatterThanB(rectA, rectB){
    return this._aspectRatioOf(rectA) > this._aspectRatioOf(rectB);
  }

  _aspectRatioOf(rect){
    return rect.width / rect.height;
  }
}
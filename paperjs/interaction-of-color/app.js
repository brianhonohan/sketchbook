var tool;
var path;

var plateViewer;

function setupPaper(canvasId){
  paper.setup('myCanvas');

  let width = paper.view.size._width;
  let height = paper.view.size._height;
  let xMargin = 0.1 * width;
  let yMargin = 0.1 * height;

  let rect = new paper.Rectangle(xMargin, yMargin
                                , width - 2 * xMargin
                                , height - 2 * yMargin);
  plateViewer = new PlateViewer(rect);
  plateViewer.viewPlate(getPlateToRender());
}

function handleKeyPressed(event){
  console.log('The ' + event.key + ' key was pressed!');
}

function getPlateToRender(){
  const plateName = UtilFunctions.getParameterByName('plate');

  switch(plateName){
    case 'iv_1': return Plates.iv_1;
    case 'iv_3': return Plates.iv_3;
    case 'iv_4': return Plates.iv_4;
    case 'v_3': return Plates.v_3;
    default: return Plates.iv_1;
  }
}
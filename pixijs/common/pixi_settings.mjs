import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.20/+esm'

export class PixiJsSettings {

  static addGui(guiParams){
    guiParams = guiParams || {};
    const gui = new GUI(guiParams);

    if (guiParams.autoPlace === false) {
      this.guiContainer = this.createGuiContainer();
      this.guiContainer.appendChild(gui.domElement);

      document.addEventListener('keyup', function(event){
        if (event.key === 'h') {
          PixiJsSettings.toggleGuiHide();
        }
      });
    }

    if (guiParams.width !== undefined){
      gui.domElement.style['width'] = `${guiParams.width}px`;
    }
    return gui;
  }

  static toggleGuiHide(){
    if (this.guiContainer.style.display === "none") {
      this.guiContainer.style.display = "block";
    } else {
      this.guiContainer.style.display = "none";
    }
  }

  static createGuiContainer(){
    let container = document.createElement("div"); 
    container.setAttribute('id', 'guiContainer');
    container.style.position = 'absolute';
    container.style.right = '0px';
    container.style.bottom = '20px';

    let label = document.createElement('div');
    label.style.color = 'white';
    label.style.backgroundColor = 'black';
    label.style.padding = '5px';
    label.style.font = "11px 'Lucida Grande',sans-serif";
    label.innerHTML = "Config (Press H to Hide/Show)";
    container.appendChild(label);

    document.body.appendChild(container);
    return container;
  }

}
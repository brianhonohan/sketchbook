class DataVisualizer {
  constructor(system){
    this.system = system;
  }

  addDomContainer(){
    var elem = document.createElement('div');
    elem.id = 'vis';
    elem.style.cssText = 'display: block; position: fixed; bottom: 0px; padding-left: 20px;';
    document.body.appendChild(elem);
  }

  buildVlSpec(){
    return {
        $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
        height: 90,
        width: 500,
        data: {
          name: 'population_v_time',
          values: [
             {time: -101, population: 200},  // hack to leave room for axis labels by giving large value, will be removed based on 'minimumX'

             // {time: -101, population: 200},
             // {time: -101, population: 200},
             // {time: -101, population: 200},
             // {time: -101, population: 200},
          ]
        },
        mark: {
            type: "line",
            interpolate: "step-after"
        },
        encoding: {
          y: {
            field: 'population',
            type: 'quantitative',
            axis: {
              title: '# of Trees'
            }
        },
          x: {
            field: 'time',
            type: 'quantitative',
            axis: {
              title: 'Time (seconds)'
            }
          }
        },
        usermeta: {
            embedOptions: {
                actions: false
            }
        }
      };
  }


  initialize(){
    this.addDomContainer();
    let vlSpec = this.buildVlSpec();

    vegaEmbed('#vis', vlSpec).then(function (res) {
        function populationVsTimeDataMapper() {
          var counter = -1;

          return function () {
            counter++;
            var newVals = [{time: counter, population: system.forest.trees.length }];
            return newVals;
          };
        };

        var valueGenerator = populationVsTimeDataMapper();
        var minimumX = -100;

        window.setInterval(function () {
          minimumX++;
          var changeSet = vega
            .changeset()
            .insert(valueGenerator())
            .remove(function (t) {
              return t.time < minimumX;
            });
          res.view.change('population_v_time', changeSet).run();
        }, 1000);
      });
  }
}
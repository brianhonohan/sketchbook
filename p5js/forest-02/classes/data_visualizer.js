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
        hconcat: [
          {
            width: 450,
            height: 90,
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
          },
          {
            width: 450,
            height: 90,
            data: {
              name: 'age_distribution',
              values: [
                 // {age: 200, population: 200},  // hack to leave room for axis labels by giving large value, will be removed based on 'minimumX'
              ]
            },
            mark: "bar",
            encoding: {
              y: {
                aggregate: 'count',
                type: 'quantitative',
                axis: {
                  title: '# of Trees'
                }
            },
              x: {
                field: 'age',
                bin: true,
                type: 'quantitative',
                axis: {
                  title: 'Age (years)'
                }
              }
            },
          }
        ],
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

        function ageDistributionGenerator() {
          var cycle = 0;

          return function () {
            cycle++;
            return system.forest.trees.map(t => {
              return {age: t.age, _cycle: cycle};
            });
          };
        }

        var valueGenerator = populationVsTimeDataMapper();
        var minimumX = -100;

        var ageDistGenerator = ageDistributionGenerator();
        var updateCycle = 0;

        window.setInterval(function () {
          minimumX++;
          updateCycle++;

          var changeSet = vega
            .changeset()
            .insert(valueGenerator())
            .remove(function (t) {
              return t.time < minimumX;
            });
          res.view.change('population_v_time', changeSet).run();

          var ageChangeSet = vega
            .changeset()
            .insert(ageDistGenerator())
            .remove(function (t) {
              return t._cycle == (updateCycle - 1);
            });
          res.view.change('age_distribution', ageChangeSet).run();
        }, 1000);
      });
  }
}
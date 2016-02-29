var dataset = [ 5, 10, 15, 20, 25 ];


function initD3(){
  d3.select('body')
    .selectAll('div')
    .data(dataset)
    .enter()
    .append('div')
    .attr('class', 'bar')
    .style('height', function(d){
      return d * 7 + 'px';
    })
    ;
}
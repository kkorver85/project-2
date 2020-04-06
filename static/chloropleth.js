//Pre-Data Setup

//Get width of the container in index file
var width = parseInt(d3.select("#chartDiv").style("width"));

//Designate height of the map
var height = width - width / 3.9;

var margin = 20;

//padding for text at the bottom and left axis
var tPadBot = 40;
var tPadLeft = 40;

var svg = d3
    .select("#chartDiv")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart")



// JS
var chart;
var palette = [
  '#ff3d00',
  '#ff7213',
  '#ffa726',
  '#ffc041',
  '#ffd85b',
  '#fff176',
  '#eaee87',
  '#d6eb99',
  '#c1e8aa',
  '#6ec1bb',
  '#1b9acb'
].reverse();
// JSC.fetch(
//   './meat-supply-per-person.csv'
// )
//   .then(function(response) {
//     return response.text();
//   })
//   .then(function(text) {
//     var mapData = JSC.csv2Json(text);
//     chart = renderMap(mapData);
//   });

function renderMap(data) {
  console.log(data)
  var points = JSC.nest()
    .key('Entity')
    .pointRollup(function(key, val) {
      let values = val[0];
      return {
        map: values.Entity,
        z: 100 - values.value
      };
    })
    .points(data);

  return JSC.chart('chartDiv', {
    type: 'map solid',
    title: {
      label: {
        text:
          'Percentage of population lacking access to basic drinking water',
        style_fontSize: 14
      },
      position: 'center'
    },
    mapping_projection: {
      type: 'lambertConformalConic',
      parallels: [10, 9]
    },
    defaultPoint: {
      tooltip: '%name <b>{%zValue:n1}%</b>',
      outline: { color: 'white', width: 0.5 },
      states_hover: {
        outline: { color: 'complement' }
      },
      focusGlow_width: 0
    },
    legend_position: 'bottom',

    palette: {
      pointValue: p => p.options('z'),

      colors: palette,
      colorBar: {
        width: 8,
        axis: {
          crosshair: {
            label_text: '{%value:n1}%',
            outline_width: 0
          },
          defaultTick_label: { text: '%value%' }
        }
      }
    },
    series: [{ points: points }],
    toolbar_items: {
      export_visible: false,
      zoom_visible: false,
      'Donate and Save Lives': {
        events_click: function() {
          window.location.href =
            'https://jscharting.com/store/pay-what-you-want/';
        },
        position: 'inside bottom',
        margin_left: 100
      }
    }
  });
}

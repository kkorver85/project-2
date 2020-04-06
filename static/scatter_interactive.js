// Bar chart 1

var width_s = document.getElementById('scatterPlot')
    .clientWidth;
var height_s = document.getElementById('scatterPlot')
    .clientHeight;

var margin = {
    top: 10,
    bottom: 70,
    left: 70,
    right: 20
}

var svg_s = d3.select('#scatterPlot')
    .append('svg')
    .attr('width', width_s)
    .attr('height', height_s + 50)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

width_s = width_s - margin.left - margin.right;
height_s = height_s - margin.top - margin.bottom;

var data = {};

var x_scale_s = d3.scaleLinear()
    .range([0, width_s]);

var y_scale_s = d3.scaleLinear()
    .range([height_s, 0]);

var color_scale_s = d3.scaleLinear()
    .range(['lightgreen', 'darkgreen']);
    // .range(['#c0fa87', '#0a7d2c']);

var y_axis_s = d3.axisLeft(y_scale_s);
var x_axis_s = d3.axisBottom(x_scale_s);

svg_s.append('g')
    .attr('class', 'x axis_s')
    .attr('transform', 'translate(0,' + height_s + ')');

svg_s.append('g')
    .attr('class', 'y axis_s');


// X axis label

var labelArea = 110;
var tPadBot = 40;
var labelMargin = 100;

svg_s.append("g").attr("class", "xText_s");

// xText will allows ut to select the group without excess code
var xText_s = d3.select(".xText_s");

function xTextRefresh_s(){
    xText_s.attr(
        "transform",
        "translate(" +
        (width_s / 2 - labelArea) +
        ", " +
        (height_s + tPadBot) +
        ")"
    )
}

xTextRefresh_s()

xText_s
    .append("text")
    .attr("y", 0)
    .text("Meat production (million tonnes)")

// End x axis label


// Y axis label

var labelArea = 100;
var leftTextX = -(margin.left * 0.8);
var leftTextY = height_s / 2 + labelArea;

svg_s.append("g").attr("class", "yText_s");

var yText_s = d3.select(".yText_s");

function yTextRefresh_s(){
    yText_s.attr(
        "transform",
        `translate(${leftTextX}, ${leftTextY}) rotate(-90)`
    )
}

yTextRefresh_s();

yText_s
    .append("text")
    .attr("y", 0)
    .text("CO2 Emissions (million tonnes)")

// End Y axis label

all_csv_data_s = {}

function draw_scatter(year) {

    var t = d3.transition()
        .duration(2000);

    csv_data = all_csv_data_s.filter(function(d) {
        return d.Year == year;
    });

    var max_x_value = d3.max(csv_data, function(d) {
        return +d.meat_production;
    });
    x_scale_s.domain([0, max_x_value]);

    var max_y_value = d3.max(csv_data, function(d) {
        return +d.Co2;
    });
    y_scale_s.domain([0, max_y_value]);
    color_scale_s.domain([0, max_y_value]);

    // Tooltips

    var toolTip = d3
        .tip()
        .attr("class", "d3-tip")
        .html (function(d){
            var meat_prod = parseFloat(d.meat_production).toFixed(2);
            var co2 = parseFloat(d.Co2).toFixed(2);
            var theState = `<div>${d.Country}</div>`;
            var theY = `<div>CO2: ${co2}MT</div>`;
            var theX = `<div>Meat: ${meat_prod}MT</div>`;
            return theState + theX + theY;
        });

    svg_s.call(toolTip);


    var circles = svg_s.selectAll('circle')
        .data(csv_data)

    circles
        .exit()
        .remove();

    // Create Circles
    svg_s.selectAll("circle")
        .data(csv_data)
        .enter()
        .append("circle")  // Add circle svg
        .attr("cx", function(d) {
            return x_scale_s(d.meat_production);  // Circle's X
        })
        .attr("cy", function(d) {  // Circle's Y
            return y_scale_s(d.Co2);
        })
        .attr('fill', function(d) {
            return color_scale_s(d.Co2);
        })
        .attr("r", 5) // radius
        .on("mouseover",function(d){
            toolTip.show(d,this);
        })
        .on("mouseout", function(d){
            toolTip.hide(d)
        });

     // Update circles
    //  svg_s.selectAll("circle")
    //     .data(csv_data)  // Update with new data
    //     .transition()  // Transition from old to new
    //     .duration(2000)  // Length of animation
    //     .each("start", function() {  // Start animation
    //         d3.select(this)  // 'this' means the current element
    //             .attr("fill", "red")  // Change color
    //             .attr("r", 5);  // Change size
    //     })
    //     // .delay(function(d, i) {
    //     //     return i / dataset.length * 500;  // Dynamic delay (i.e. each item delays a little longer)
    //     // })
    //     //.ease("linear")  // Transition easing - default 'variable' (i.e. has acceleration), also: 'circle', 'elastic', 'bounce', 'linear'
    //     .attr("cx", function(d) {
    //         return x_scale_s(d.meat_production);  // Circle's X
    //     })
    //     .attr("cy", function(d) {
    //         return y_scale_s(d.Co2);  // Circle's Y
    //     })
    //     .each("end", function() {  // End animation
    //         d3.select(this)  // 'this' means the current element
    //             .transition()
    //             .duration(500)
    //             .attr("fill", "black")  // Change color
    //             .attr("r", 2);  // Change radius
    //     });

    svg_s.select('.x.axis_s')
        .transition(t)
        .call(x_axis_s);

    svg_s.select('.y.axis_s')
        .transition(t)
        .call(y_axis_s);

}

// ==========================================================================
// Common code

d3.csv('/static/meat_vs_co2.csv').then(function(data){
    all_csv_data_s = data;
    draw_scatter('2017');
})

var slider = d3.select('#year');
slider.on('change', function() {
    draw(this.value);
    draw_2(this.value);
    draw_scatter(this.value);
});

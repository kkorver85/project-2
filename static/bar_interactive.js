// Bar chart 1

var width = document.getElementById('barChart')
    .clientWidth;
var height = document.getElementById('barChart')
    .clientHeight;

var margin = {
    top: 10,
    bottom: 70,
    left: 70,
    right: 20
}

var svg = d3.select('#barChart')
    .append('svg')
    .attr('width', width)
    .attr('height', height + 50)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

var data = {};

var x_scale = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

var y_scale = d3.scaleLinear()
    .range([height, 0]);

var colour_scale = d3.scaleQuantile()
    .range(["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"]);

var y_axis = d3.axisLeft(y_scale);
var x_axis = d3.axisBottom(x_scale);

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')');

svg.append('g')
    .attr('class', 'y axis');


// X axis label

var labelArea = 110;
var tPadBot = 40;
var labelMargin = 100;

svg.append("g").attr("class", "xText");

// xText will allows ut to select the group without excess code
var xText = d3.select(".xText");

function xTextRefresh(){
    xText.attr(
        "transform",
        "translate(" +
        (width / 2) +
        ", " +
        // (height - labelMargin - tPadBot) +
        (height + labelMargin) +
        ")"
    )
}

xTextRefresh()

xText
    .append("text")
    .attr("y", 0)
    .text("Countries")

// End x axis label


// Y axis label

var labelArea = 100;
var leftTextX = -(margin.left / 2);
var leftTextY = height / 2 + labelArea * 1.5;

svg.append("g").attr("class", "yText");

var yText = d3.select(".yText");

function yTextRefresh(){
    yText.attr(
        "transform",
        `translate(${leftTextX}, ${leftTextY}) rotate(-90)`
    )
}

yTextRefresh();

yText
    .append("text")
    .attr("y", 0)
    .text("Meat Consumption Per Person (in Kg)")

// End Y axis label

all_csv_data = {}

function draw(year) {

    var t = d3.transition()
        .duration(2000);

    csv_data = all_csv_data.filter(function(d) {
        return d.Year == year;
    });

    var countries = csv_data.map(function(d) {
        return d.Entity;
    });
    x_scale = x_scale.domain(countries);

    var max_value = d3.max(csv_data, function(d) {
        return +d.Meat;
    });

    y_scale.domain([0, max_value]);
    colour_scale.domain([0, max_value]);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-5, 0])
        .html(function(d) {
            var theState = `<div>${d.Entity}</div>`;
            var theY = `<div>Meat: ${d.Meat}Kg</div>`;
            return theState + theY;
        });
    svg.call(tip);

    var bars = svg.selectAll('.bar')
        .data(csv_data)

    bars
        .exit()
        .remove();

    var new_bars = bars
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) {
            return x_scale(d.Entity);
        })
        .attr('width', x_scale.bandwidth())
        .attr('y', height)
        .attr('height', 0)
        .on("mouseover",function(d){
            tip.show(d,this);
        })
        .on("mouseout", function(d){
            tip.hide(d)
        });

    new_bars.merge(bars)
        .transition(t)
        .attr('y', function(d) {
            return y_scale(+d.Meat);
        })
        .attr('height', function(d) {
            return height - y_scale(+d.Meat)
        })
        .attr('fill', function(d) {
            return colour_scale(+d.Meat);
        })

    svg.select('.x.axis')
        .call(x_axis)
        .selectAll("text")
        .attr("y", 15)
        .attr("x", 0)
        .attr("dy", ".35em")
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start");;

    svg.select('.y.axis')
        .transition(t)
        .call(y_axis);

}

// ==========================================================================
// Bar chart 2


var width = document.getElementById('barChart2')
    .clientWidth;
var height = document.getElementById('barChart2')
    .clientHeight;

var margin = {
    top: 10,
    bottom: 70,
    left: 70,
    right: 20
}

var svg2 = d3.select('#barChart2')
    .append('svg')
    .attr('width', width)
    .attr('height', height + 50)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

var data = {};

var x_scale2 = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

var y_scale2 = d3.scaleLinear()
    .range([height, 0]);

var colour_scale2 = d3.scaleQuantile()
    .range(["#d2e2fa", "#afc7ed", "#96b8f2", "#749adb", "#537cc2", "#385fa1", "#183c78", "#0b2857", "#001942"]);

var y_axis2 = d3.axisLeft(y_scale2);
var x_axis2 = d3.axisBottom(x_scale2);

svg2.append('g')
    .attr('class', 'x axis2')
    .attr('transform', 'translate(0,' + height + ')');

svg2.append('g')
    .attr('class', 'y axis2');


// X axis label

var labelArea = 110;
var tPadBot = 40;
var labelMargin = 100;

svg2.append("g").attr("class", "xText2");

// xText will allows ut to select the group without excess code
var xText2 = d3.select(".xText2");

function xText2Refresh(){
    xText2.attr(
        "transform",
        "translate(" +
        (width / 2) +
        ", " +
        // (height - labelMargin - tPadBot) +
        (height + labelMargin) +
        ")"
    )
}

xText2Refresh()

xText2
    .append("text")
    .attr("y", 0)
    .text("Countries")

// End x axis label


// Y axis label

var labelArea = 100;
var leftTextX = -(margin.left / 2);
var leftTextY = height / 2 + labelArea * 1.5;

svg2.append("g").attr("class", "yText2");

var yText2 = d3.select(".yText2");

function yText2Refresh(){
    yText2.attr(
        "transform",
        `translate(${leftTextX}, ${leftTextY}) rotate(-90)`
    )
}

yText2Refresh();

yText2
    .append("text")
    .attr("y", 0)
    .text("Cardiovascular Deaths (per 100,000 people)")

// End Y axis label

all_csv_data = {}

function draw_2(year) {

    var t = d3.transition()
        .duration(2000);

    csv_data = all_csv_data.filter(function(d) {
        return d.Year == year;
    });

    var countries = csv_data.map(function(d) {
        return d.Entity;
    });
    x_scale2 = x_scale2.domain(countries);

    var max_value = d3.max(csv_data, function(d) {
        return +d.Deaths;
    });

    y_scale2.domain([0, max_value]);
    colour_scale2.domain([0, max_value]);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-5, 0])
        .html(function(d) {
            var deaths = parseFloat(d.Deaths).toFixed(2);
            var theState = `<div>${d.Entity}</div>`;
            var theY = `<div>Deaths: ${deaths} people</div>`;
            return theState + theY;
        });
    svg.call(tip);

    var bars = svg2.selectAll('.bar')
        .data(csv_data)

    bars
        .exit()
        .remove();

    var new_bars = bars
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) {
            return x_scale2(d.Entity);
        })
        .attr('width', x_scale2.bandwidth())
        .attr('y', height)
        .attr('height', 0)
        .on("mouseover",function(d){
            tip.show(d,this);
        })
        .on("mouseout", function(d){
            tip.hide(d)
        });;

    new_bars.merge(bars)
        .transition(t)
        .attr('y', function(d) {
            return y_scale2(+d.Deaths);
        })
        .attr('height', function(d) {
            return height - y_scale2(+d.Deaths)
        })
        .attr('fill', function(d) {
            return colour_scale2(+d.Deaths);
        })

    svg2.select('.x.axis2')
        .call(x_axis2)
        .selectAll("text")
        .attr("y", 15)
        .attr("x", 0)
        .attr("dy", ".35em")
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start");;

    svg2.select('.y.axis2')
        .transition(t)
        .call(y_axis2);

}


// ==========================================================================
// Common code

d3.csv('/static/cardio_top_yrs.csv').then(function(data){
    all_csv_data = data;
    draw('2017');
    draw_2('2017');
})

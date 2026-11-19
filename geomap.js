// Lab 7: Geomaps
// Follow the lab instructions. Start with Activity 1.1: load ./topo.json with d3.json().
// Lab 7: Geomaps
// Follow the lab instructions. Start with Activity 1.1: load ./topo.json with d3.json().

 d3.json("./topo.json").then((data) => { 

   const topo = topojson.feature(data, data.objects.states)

    console.log("hello");
    console.log(topo);

    var projection = d3.geoAlbersUsa().scale(700).translate([450, 270])
   // These values were chosen to fit the US into our SVG.
   // If your map is clipped or off-center, adjust scale and translate.


   var path = d3.geoPath(projection);
    const svg = d3.select("#geomap").append('g').attr('transform', 'translate(50,50)');


   svg.append("g")
   .selectAll("path")
   .data(topo.features)
   .join("path")
     .attr("d", path)
     .attr("fill", 'whitesmoke')
     .attr("stroke", "black")
     .attr("stroke-width", "1px");


 })
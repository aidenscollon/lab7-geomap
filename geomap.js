// Lab 7: Geomaps
// Follow the lab instructions. Start with Activity 1.1: load ./topo.json with d3.json().
// Lab 7: Geomaps
// Follow the lab instructions. Start with Activity 1.1: load ./topo.json with d3.json().



    Promise.all([
        d3.json("./topo.json"), //load the TopoJSON data 
        d3.csv("./cities.csv"), //load the GPS coords for cities
        d3.csv("./states.csv")  //load the state population for each state  
    ]).then((data) => { 

       //give our data sensible names
    const topology = data[0];
    const cities = data[1];
    const states = data[2];

    const topo = topojson.feature(topology, topology.objects.states)


    const stateDictionary = new Map();
    states.forEach((state) => {  // this is basically a for loop
        stateDictionary.set(state.State, +state["2018 Population"]) 
    })

    console.log(stateDictionary);

    var blues = d3.scaleSequential()
                   .domain(d3.extent(stateDictionary.values()))
                   .range(["white", "steelblue"]);



    var projection = d3.geoAlbersUsa().scale(700).translate([450, 270])
   // These values were chosen to fit the US into our SVG.
   // If your map is clipped or off-center, adjust scale and translate.


    var path = d3.geoPath(projection);
    const svg = d3.select("#geomap").append('g').attr('transform', 'translate(50,50)');

    console.log(d3.extent(stateDictionary.values()))

    svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .join("path")
        .attr("d", path)
        .attr("fill", d => 
            blues(stateDictionary.get(d.properties.name))
        )
        .attr("stroke", "black")
        .attr("stroke-width", "1px");

    svg.append("g")
        .selectAll("circle")
        .data(cities)
        .join("circle")
            .attr("cx", d=>projection([+d.longitude, +d.latitude])[0])
            .attr("cy", d=>projection([+d.longitude, +d.latitude])[1])
            .attr("r", 5)
            .attr("fill", "red")
            .attr("stroke", "black")



 })
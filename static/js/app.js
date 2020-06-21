var json = d3.json("samples.json").then(data => data)
// D3 to read data  
  
  d3.json("samples.json").then(data => {
    console.log(data)})

///////////////////////////////////////////////////////////////////////
// BAR GRAPH
function buildPlot() {
  d3.json("samples.json").then(data => {
    // Grab values from the data json object to build the plots
    var sampleValues = data.samples[0].sample_values;
    var topValues = sampleValues.slice(0, 10).reverse();
    var otuIDs = data.samples[0].otu_ids;
    var otuTop = (data.samples[0].otu_ids.slice(0, 10)).reverse();
    var otuID = otuTop.map(d => "OTU " + d);
    var otuLabels = data.samples[0].otu_labels;
    console.log(otuID);
  
    var trace1 = {
      x: topValues,
      y: otuID,
      text: otuID,
      type: "bar",
      orientation: "h"
    };

    var layout1 = {
    title: "Top 10 OTUs",
    };

    Plotly.newPlot("bar", [trace1], layout1);


///////////////////////////////////////////////////////////////////////////
// BUBBLE GRAPH

    var trace2 = {
      x: otuIDs,
      y: sampleValues,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIDs
      },
      text: otuLabels

    };

// set the layout for the bubble plot
    var layout2 = {
      xaxis:{title: "OTU ID"},
    };

// create the bubble plot
   Plotly.newPlot("bubble", [trace2], layout2); 
  });
}

buildPlot();


///////////////////////////////////////////////////////////////////////////

// Creating dropdown
function dropDown() {
  var dropdown = d3.select("#selDataset")
  d3.json("samples.json").then(data => {
    var names =  data.names
    names.forEach(subject => {
      dropdown.append("option").text(subject).property("value")
    })
  })
  buildPlots(data.names[0]);
  getDemoInfo(data.names[0]);
}

dropDown();

///////////////////////////////////////////////////////////////////////////

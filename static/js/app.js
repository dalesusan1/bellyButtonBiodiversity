
// D3 to read data  
  
  d3.json("samples.json").then (data => {
    console.log(data)})

///////////////////////////////////////////////////////////////////////

function buildPlot() {
    d3.json("samples.json").then(data => {

    // Grab values from the data json object to build the plots
    var sampleValues = data.samples[0].sample_values;
    var topValues = sampleValues.slice(0, 10).reverse();
    var otuTop = (data.samples[0].otu_ids.slice(0, 10)).reverse();
    var otuID = otuTop.map(d => "OTU " + d);
    console.log(otuID)
  
    var trace1 = {
      x: topValues,
      y: otuID,
      text: otuID,
      type: "bar",
      orientation: "h"
  };

    var layout = {
    title: "Top 10 OTUs",
    margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
    }
  };

    Plotly.newPlot("bar", [trace1], layout);

  });
}

buildPlot();


///////////////////////////////////////////////////////////////////////////

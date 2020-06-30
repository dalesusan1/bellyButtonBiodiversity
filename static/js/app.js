// Create default charts and metadata

function init () {

    d3.json('samples.json').then(importedData => {
        var data = importedData;
        // otu ids as labels
        var otuIDs = data.samples[0].otu_ids;
        var topOtuIDs = otuIDs.map(d => "OTU " + d).slice(0,10).reverse();
            console.log(topOtuIDs);

        // sample values as values
        var sampleValues = data.samples[0].sample_values;
        var topSampleValues = sampleValues.slice(0,10).reverse();
            console.log(topSampleValues);

        // otu labels as hover
        var otuLabels = data.samples[0].otu_labels;
        var topOtuLabels = otuLabels.slice(0,10).reverse();
            console.log(topOtuLabels);

        ///////////////////BAR////////////////////////

        // Create trace
        var trace1 = {
            x: topSampleValues,
            y: topOtuIDs,
            text: topOtuLabels,
            type: "bar",
            orientation: "h"
        };
        // Create layout
        var layout = {
            title: "ID: " + data.samples[0].id,
            xaxis: {title: "Sample Values"},
            yaxis: {title: "OTU ID"}
        };

        // Create default plot
        Plotly.newPlot("bar", [trace1], layout);


        ///////////////////BUBBLE////////////////////////

        var trace2 = {
             // Use `otu_ids` for the x values
            x: otuIDs,
            //  Use `sample_values` for the y values
            y: sampleValues,
            //  Use `otu_labels` for the text values
            text: otuLabels,
            mode: 'markers',
            marker: {
              //  Use `otu_ids` for the marker colors
              color: otuIDs,
              //  Use `sample_values` for the marker size
              size: sampleValues
            }
          };
          
          var layout = {
              title: "ID: " + data.samples[0].id,
              xaxis: {title: "OTU ID"},
              yaxis: {title: "Sample Values"}
          };
          
          Plotly.newPlot('bubble', [trace2], layout);

       
        ///////////////////METADATA////////////////////////
        // Select metadata
        var metaData = data.metadata;
        // Select the element
        var demographicInfo = d3.select("#sample-metadata")
        // Append entries
        Object.entries(metaData[0]).map((key) => {
            demographicInfo.append("h5").text(key[0] + ": " + key[1]);  
        })


        //////////////////////DROPDOWN/////////////////////
        var sampleIDs = data.names;
            console.log(sampleIDs)
        var dropdown = d3.select("#selDataset")
        sampleIDs.forEach(function(name) {
             dropdown.append("option").text(name).property("value");
        });
})
}
// Call the init function
init()


// Update functions

var dropdown = d3.select("#selDataset");

function optionChanged (id) {
    var value = dropdown.property("value")
    console.log(value)

    d3.json('samples.json').then(importedData => {
        var data = importedData;

        ////////////////METADATA////////////////////
        var metadata = data.metadata;
        result = metadata.filter(meta => meta.id.toString() === value)[0];
            console.log(result);
        var demographicInfo = d3.select("#sample-metadata").text("");
        Object.entries(result).map((key) => {
            demographicInfo.append("h5").text(key[0] + ": " + key[1]);
        });


        ////////////////BAR GRAPH////////////////////


    })
}
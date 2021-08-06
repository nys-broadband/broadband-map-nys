var beforeMap = new mapboxgl.Map({
    container: 'before',
    style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
    bounds: [[-80.00125, 40.40703], [-71.64066, 45.08304]]
});

var afterMap = new mapboxgl.Map({
    container: 'after',
    style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
    bounds: [[-80.00125, 40.40703], [-71.64066, 45.08304]]
});

// A selector or reference to HTML element
var container = '#comparison-container';

var map = new mapboxgl.Compare(beforeMap, afterMap, container);
map.setSlider(0); // initially position slider off to the side

// Add navigation control:
afterMap.addControl(new mapboxgl.NavigationControl({
  showCompass: false
}));

// afterMap.addControl(new MapboxGeocoder({
//   accessToken: 'pk.eyJ1Ijoia25hbmFuIiwiYSI6ImNrbDlsMXNmNjI3MnEyb25yYjNremFwYXQifQ.l6loLOR-pOL_U2kzWBSQNQ',
//   mapboxgl: mapboxgl,
//   zoom: 13,
//   bbox: [-80.00125, 40.40703, -71.64066, 45.08304]
//   // origin: `https://usignite-intern.carto.com/api/v1/map?apikey=93ca9b2ca98129188e337d41aee1e0faad970acd`
// }), 'bottom-left'
// );

// enable tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// enable button to close modal after user reads disclaimer
document.getElementById('modal-checkbox').addEventListener('change', e => {
  if (e.target.checked) {
    $('#modal-dismiss').removeAttr('disabled');

  } else if (!e.target.checked) {
    $('#modal-dismiss').attr('disabled', 'disabled');
  }
})

// variables to hold the user's selection of variables to display:
var first_var = 'Broadband Score';
var second_var = 'Broadband Score';
var firstarr = [];
var secondarr = [];
checkbox = document.getElementById('checkbox');

// variables to hold and edit our color schemes
var sequential_colors = ['#8A8AFF','#5C5CFF','#2E2EFF','#0000FF','#0000A3']; //blue TRY VARYING SATURATION
var diverging_colors = ['#ca0020','#f4a582','#ffffbf','#abdda4','#0571b0'] //['#d7191c','#fdae61','#ffffbf','#abdda4','#2b83ba'] //['#d7191c','#fdae61','#ffffbf','#a6d96a','#1a9641'] // ['#ca0020','#f4a582','#ffffbf','#92c5de','#0571b0'];
var diverging_colors_transparent = ['#ca002080','#f4a58280','#ffffbf80','#abdda480','#0571b080'];

// 'display column name for frontend of visualization': 'column name in data '
var displayVal_to_colName = {
  '%Pop with 25Mbps/3 Mbps Speed': 'broadband_usage',
  'M-Lab Speed': 'avg_meanthroughputmbps',
  'Ookla Download Speed': 'avg_d_mbps_wt',
  'Ookla Upload Speed': 'avg_u_mbps_wt',
  'Number of Internet Providers': 'num_providers', //FIX!!!
  'FCC Download Speed': 'wt_avg_maxaddown',
  'FCC Upload Speed': 'wt_avg_maxadup',
  'Broadband Score': 'broadband_score',
  'Population': 'estimate_sex_and_age_total_population',
  'Average Household Size': 'estimate_households_by_type_total_households_average_househo',
  'Median Household Income': 'estimate_income_and_benefits_in_2019_inflation_adjusted_dolla',
  '%Households with Broadband Subscription': '_househoulds_with_broadband_subscription',
  '%Pop with Health Insurance': '_pop_with_health_ins',
  '%Pop 25+ with High School Degree': '_pop_with_high_school_degree_over_25',
  '%Pop 16+ Employed': '_pop_employed_over_16_yrs'
};

// get window size to set distances for hidden arrows
var windowWidth = window.innerWidth
var windowHeight = window.innerHeight

// function to set the positions for hidden instruction arrows based on window size
function hoverForInstructions() {
  // document.getElementById('address-box-arrow').style.top = `${windowHeight-145}px`
  // document.getElementById('address-box-arrow').style.left = `130px`
  document.getElementById('census-tract-arrow').style.top = `${windowHeight/2 - 150}px`
  document.getElementById('census-tract-arrow').style.left = `${windowWidth/2 - 230}px`
  document.getElementById('split-left-arrow').style.top = `375px`
  document.getElementById('split-left-arrow').style.left = `140px`
  document.getElementById('split-right-arrow').style.top = `375px`
  document.getElementById('split-right-arrow').style.left = `${windowWidth - 375}px`
  document.getElementById('checkbox-arrow').style.top = `405px`
  document.getElementById('checkbox-arrow').style.left = `${windowWidth - 375}px`
  document.getElementById('scores-view-arrow').style.top = `405px`
  document.getElementById('scores-view-arrow').style.left = `170px`
  document.getElementById('slide-arrow').style.top = `${windowHeight/2 - 60}px`
  document.getElementById('slide-arrow').style.left = `${windowWidth/2 - 71}px`

  // function to show glimpse of comparison map when user hovers on relevant words in instructions
  $('#slide-a-link').hover(function() {
    map.setSlider(windowWidth/2);
    beforeMap.setLayoutProperty('scores_layer', 'visibility','none');
    afterMap.setLayoutProperty('scores_layer', 'visibility','none');
    beforeMap.setPaintProperty('first_selected_layer', 'fill-color', [
      'step',
      ['get', 'wt_avg_maxaddown'],
      sequential_colors[0],
      152.78, sequential_colors[1],
      182.66, sequential_colors[2],
      209.54, sequential_colors[3],
      306.13, sequential_colors[4],
    ]);
    afterMap.setPaintProperty('second_selected_layer', 'fill-color', [
      'step',
      ['get', 'avg_d_mbps_wt'],
      sequential_colors[0],
      152.78, sequential_colors[1],
      182.66, sequential_colors[2],
      209.54, sequential_colors[3],
      306.13, sequential_colors[4],
    ]);
    beforeMap.setLayoutProperty('first_selected_layer', 'visibility','visible');
    afterMap.setLayoutProperty('second_selected_layer', 'visibility','visible');
    }, function() {
      map.setSlider(0)
      beforeMap.setLayoutProperty('first_selected_layer', 'visibility','none');
      afterMap.setLayoutProperty('second_selected_layer', 'visibility','none');
      beforeMap.setLayoutProperty('scores_layer', 'visibility','visible');
      afterMap.setLayoutProperty('scores_layer', 'visibility','visible');
  })
};

hoverForInstructions(); //call function

// create reverse object of displayVal_to_colName
var colName_to_displayVal = {};
for (key in displayVal_to_colName)
    colName_to_displayVal[displayVal_to_colName[key]] = key

// ADD initial_SQL_qry TO INITIAL SQL CALL TO DATABASE- not working, but using for getting values
// define the columns we will need for various steps (mapping, clicking on census tracts)
var sql = new cartodb.SQL({ user: 'usignite-intern' });
var sql_fromStatement = ' FROM dataset_for_vis_final'
var colsToMap = [
  'broadband_score', 'avg_meanthroughputmbps', 'avg_d_mbps_wt',
  'avg_u_mbps_wt', 'wt_avg_maxaddown', 'wt_avg_maxadup'
];
var initial_SQL_qry = 'SELECT '+colsToMap.join()+sql_fromStatement
var colsForTractClick = [
  'avg_meanthroughputmbps', 'avg_d_mbps_wt', 'avg_u_mbps_wt',
  'wt_avg_maxaddown', 'wt_avg_maxadup', 'broadband_usage', 'num_providers', 'broadband_score',
  'estimate_sex_and_age_total_population', 'estimate_households_by_type_total_households_average_househo',
  'estimate_income_and_benefits_in_2019_inflation_adjusted_dolla', '_househoulds_with_broadband_subscription',
  '_pop_with_health_ins', '_pop_with_high_school_degree_over_25', '_pop_employed_over_16_yrs'
]
var broadbandColsForTractClick = [
  'avg_meanthroughputmbps', 'avg_d_mbps_wt', 'avg_u_mbps_wt', 'wt_avg_maxaddown', 'wt_avg_maxadup',
  'broadband_usage', 'num_providers', '_househoulds_with_broadband_subscription', 'broadband_score'
]
var demogColsForTractClick = [
  'estimate_sex_and_age_total_population', 'estimate_households_by_type_total_households_average_househo',
  'estimate_income_and_benefits_in_2019_inflation_adjusted_dolla',
  '_pop_with_health_ins', '_pop_with_high_school_degree_over_25', '_pop_employed_over_16_yrs'
]
var temp_SQL_qry = 'SELECT '+colsForTractClick.join()+sql_fromStatement

// Function to calculate percentiles of data
function percentiles(arr) {
  arr.sort(d3.ascending);
  var len = arr.length;
  var per20 =  Math.floor(len*0.2) - 1;
  var per40 =  Math.floor(len*0.4) - 1;
  var per60 =  Math.floor(len*0.6) - 1;
  var per80 =  Math.floor(len*0.8) - 1;
  var percs = [arr[per20], arr[per40], arr[per60], arr[per80]];
  let unique = [...new Set(percs)];
  if (unique.length != 4) {
    percs.forEach(function (perc, i) {
      if (perc == percs[i+1]) {
        percs[i+1] += 0.001
      };
    });
  };
  return percs
};

function getIndexToIns(arr, num) {
  let newarr = arr.concat(num);
  let unique = [...new Set(newarr)];
  if (unique.length != 5) {
    return arr.concat(num).sort((a, b) => a - b).indexOf(num) + 1
  } else {return arr.concat(num).sort((a, b) => a - b).indexOf(num)}
};

// Function to draw histogram of selected variables
function createPlot(arr, percentiles, chartid) {
  [0,1,2,3,4].forEach((i) => {
    if (i == 0) {
      window[`x${i}`] = arr.filter(value => value < percentiles[i]);
      var name = `0 - ${percentiles[i]}`;
    } else if (i == 4) {
      window[`x${i}`] = arr.filter(value => value >= percentiles[i-1]);
      var name = `${percentiles[i-1]}+`;
    } else {
      window[`x${i}`] = arr.filter(value => value >= percentiles[i-1] && value < percentiles[i]);
      var name = `${percentiles[i-1]} - ${percentiles[i]}`
    }

    if (chartid == `chart${1}`) {
      xaxistitle = first_var
    } else xaxistitle = second_var

    window[`trace${i}`] = { // change this var name to be the range
      x: window[`x${i}`],
      type: 'histogram',
      marker: {
        color: sequential_colors[i]
      },
      name: name
    }
  })

  var data = [trace0, trace1, trace2, trace3, trace4];

  var layout = {
    margin: {
      t: 30, //top margin
      l: 50, //left margin
      r: 0, //right margin
      b: 0 //bottom margin
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    barmode: 'stack',
    legend: {
      font: {
        size: 10
      },
      itemclick: 'toggleothers',
      xanchor: 'center',
      yanchor: 'top',
      x: 0.2,
      y: -0.2,
      orientation: 'v',
      traceorder: 'normal',
      tracegroupgap: 0
    },
    yaxis: {
      title: {
        text: 'Number of census tracts',
        font: {
          size: 10
        },
        standoff: 0
      }
    },
    xaxis: {
      title: {
        text: `${xaxistitle} (Mbps)`,
        font: {
          size: 10
        },
        standoff: 0
      }
    }
  };

  var config = {
    'displayModeBar': false // this is the line that hides the bar.
  };

  Plotly.newPlot(chartid, data, layout, config);
};

// Function to draw table of broadband variables for clicked census tract
function createTable(tractValsObj, percentilesObj, clickedTract, clickedCounty, chartid) {
  colorMap = {};
  for (const [key, value] of Object.entries(tractValsObj)) {
    colorMap[key] = getIndexToIns(percentilesObj[`percs_${key}`], value)
  }
  console.log(colorMap)

  var values = [
        Object.keys(tractValsObj).map(x => colName_to_displayVal[x]),
        Object.values(tractValsObj)]

  var data = [{
    type: 'table',
    header: {
      values: [`<b>Tract ${clickedTract}<br>${clickedCounty} County</b>`],
      align: "center",
      line: {width: 1, color: 'white'},
      fill: {color: "white"},
      font: {size: 12, color: "black"}
    },
    cells: {
      values: values,
      align: "left",
      line: {color: "white", width: 1},
      font: {size: 11, color: ["black"]},
      fill: {color: [Object.keys(tractValsObj).map(x => diverging_colors_transparent[colorMap[x]])]}
    }
  }]

  var layout = {
    margin: {
      t: 0,
      l: 4,
      r: 0,
      b: 0
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
  };

  var config = {
    'displayModeBar': false // hide plotly toolbar.
  };

  Plotly.newPlot(chartid, data, layout, config);
};

var tempObj = {};
var percentiles_tractClick = {};
$.each(colsForTractClick, function(i, colName) {
  tempObj[`${colName}`] = []
});

// this function will update the variable selections on the first dropdown menu for variable selection:
$("#first-dropdown li a").click(function() {
  map.setSlider(window.innerWidth / 2);

  document.getElementById("chart1").textContent = "";
  document.getElementsByClassName("my-legend")[0].style.visibility = 'hidden';

  first_var = $(this).text();
  first_check = true;
  $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
  document.getElementById("left-controls-title").innerHTML = `<p style = 'text-align: right'>${first_var} <i class="fas fa-caret-left"></i></p>`;


  firstarr = featuresObj[`${displayVal_to_colName[first_var]}`];

  // show fill layer for first variable
  beforeMap.setLayoutProperty('scores_layer', 'visibility','none');
  afterMap.setLayoutProperty('scores_layer', 'visibility','none');
  beforeMap.setLayoutProperty('first_selected_layer', 'visibility','visible');

  if ($('#checkbox').prop('checked')) {
    combinedarr = firstarr.concat(secondarr);
    var intervals = percentiles(combinedarr);
    createPlot(firstarr, intervals, 'chart1');
    console.log(intervals);
    beforeMap.setPaintProperty('first_selected_layer', 'fill-color', [
      'step',
      ['get', displayVal_to_colName[first_var]],
      sequential_colors[0],
      intervals[0], sequential_colors[1],
      intervals[1], sequential_colors[2],
      intervals[2], sequential_colors[3],
      intervals[3], sequential_colors[4],
    ]);
    if (secondarr.length > 0) {
      createPlot(secondarr, intervals, 'chart2');
      afterMap.setPaintProperty('second_selected_layer', 'fill-color', [
        'step',
        ['get', displayVal_to_colName[second_var]],
        sequential_colors[0],
        intervals[0], sequential_colors[1],
        intervals[1], sequential_colors[2],
        intervals[2], sequential_colors[3],
        intervals[3], sequential_colors[4],
      ]);
    };
  } else {
    var intervals = percentiles(firstarr);
    createPlot(firstarr, intervals, 'chart1');
    console.log(intervals);
    beforeMap.setPaintProperty('first_selected_layer', 'fill-color', [
      'step',
      ['get', displayVal_to_colName[first_var]],
      sequential_colors[0],
      intervals[0], sequential_colors[1],
      intervals[1], sequential_colors[2],
      intervals[2], sequential_colors[3],
      intervals[3], sequential_colors[4],
    ]);
  };

  if (first_var != 'Broadband Score' && second_var != 'Broadband Score') {
    $('#checkbox').removeAttr('disabled');
  } else {
    $('#checkbox').attr('disabled', 'disabled');
  };

  afterMap.getSource('highlight-clickedTract-source-afterMap').setData({
    'type': 'FeatureCollection',
    'features': []
  });

});


// this function will update the variable selections on the second dropdown menu for variable selection:
$("#second-dropdown li a").click(function() {
  map.setSlider(window.innerWidth / 2);

  document.getElementById("chart2").textContent = "";
  document.getElementsByClassName("my-legend")[0].style.visibility = 'hidden';
  document.getElementById("broadband-legend").style.visibility = 'hidden';

  second_var = $(this).text() //$(this).data('value') - this is a string AND it is updating the global first_var variable BUT still throwing error when we show the layer... `'${$(this).data('value')}'`
  $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
  document.getElementById("right-controls-title").innerHTML = `<i class="fas fa-caret-right"></i> ${second_var}`;

  secondarr = featuresObj[`${displayVal_to_colName[second_var]}`]

  afterMap.setLayoutProperty('scores_layer', 'visibility','none');
  beforeMap.setLayoutProperty('scores_layer', 'visibility','none');
  afterMap.setLayoutProperty('second_selected_layer', 'visibility','visible');

  if ($('#checkbox').prop('checked')) {
    combinedarr = secondarr.concat(firstarr);
    var intervals = percentiles(combinedarr);
    createPlot(secondarr, intervals, 'chart2');
    console.log(intervals);
    afterMap.setPaintProperty('second_selected_layer', 'fill-color', [
      'step',
      ['get', displayVal_to_colName[second_var]],
      sequential_colors[0],
      intervals[0], sequential_colors[1],
      intervals[1], sequential_colors[2],
      intervals[2], sequential_colors[3],
      intervals[3], sequential_colors[4],
    ]);
    if (firstarr.length > 0) {
      createPlot(firstarr, intervals, 'chart1');
      beforeMap.setPaintProperty('first_selected_layer', 'fill-color', [
        'step',
        ['get', displayVal_to_colName[first_var]],
        sequential_colors[0],
        intervals[0], sequential_colors[1],
        intervals[1], sequential_colors[2],
        intervals[2], sequential_colors[3],
        intervals[3], sequential_colors[4],
      ]);
    };
  } else {
    var intervals = percentiles(secondarr);
    createPlot(secondarr, intervals, 'chart2');
    console.log(intervals);
    afterMap.setPaintProperty('second_selected_layer', 'fill-color', [
      'step',
      ['get', displayVal_to_colName[second_var]],
      sequential_colors[0],
      intervals[0], sequential_colors[1],
      intervals[1], sequential_colors[2],
      intervals[2], sequential_colors[3],
      intervals[3], sequential_colors[4],
    ]);
  };

  if (first_var != 'Broadband Score' && second_var != 'Broadband Score') {
    $('#checkbox').removeAttr('disabled');
  } else {
    $('#checkbox').attr('disabled', 'disabled');
  };

  afterMap.getSource('highlight-clickedTract-source-afterMap').setData({
    'type': 'FeatureCollection',
    'features': []
  });

});

// listen for a change to the checkbox
checkbox.addEventListener('change', e => {
    if (e.target.checked) {
      combinedarr = firstarr.concat(secondarr);
      var intervals = percentiles(combinedarr);
      createPlot(firstarr, intervals, 'chart1');
      createPlot(secondarr, intervals, 'chart2');
      console.log(intervals)
      beforeMap.setPaintProperty('first_selected_layer', 'fill-color', [
        'step',
        ['get', displayVal_to_colName[first_var]],
        sequential_colors[0],
        intervals[0], sequential_colors[1],
        intervals[1], sequential_colors[2],
        intervals[2], sequential_colors[3],
        intervals[3], sequential_colors[4],
      ]);
      afterMap.setPaintProperty('second_selected_layer', 'fill-color', [
        'step',
        ['get', displayVal_to_colName[second_var]],
        sequential_colors[0],
        intervals[0], sequential_colors[1],
        intervals[1], sequential_colors[2],
        intervals[2], sequential_colors[3],
        intervals[3], sequential_colors[4],
      ]);
    };
    if (!e.target.checked) {
      intervals_1 = percentiles(firstarr);
      intervals_2 = percentiles(secondarr);
      createPlot(firstarr, intervals_1, 'chart1');
      createPlot(secondarr, intervals_2, 'chart2');
      console.log(intervals_1)
      console.log(intervals_2)
      beforeMap.setPaintProperty('first_selected_layer', 'fill-color', [
        'step',
        ['get', displayVal_to_colName[first_var]],
        sequential_colors[0],
        intervals_1[0], sequential_colors[1],
        intervals_1[1], sequential_colors[2],
        intervals_1[2], sequential_colors[3],
        intervals_1[3], sequential_colors[4],
      ]);
      afterMap.setPaintProperty('second_selected_layer', 'fill-color', [
        'step',
        ['get', displayVal_to_colName[second_var]],
        sequential_colors[0],
        intervals_2[0], sequential_colors[1],
        intervals_2[1], sequential_colors[2],
        intervals_2[2], sequential_colors[3],
        intervals_2[3], sequential_colors[4],
      ]);
    }
});

// Function to reset map to original state
$("#reset-button").click(function() {
  afterMap.setLayoutProperty('scores_layer', 'visibility','visible');
  afterMap.setLayoutProperty('second_selected_layer', 'visibility','none');
  beforeMap.setLayoutProperty('scores_layer', 'visibility','visible');
  beforeMap.setLayoutProperty('first_selected_layer', 'visibility','none');
  document.getElementsByClassName("my-legend")[0].style.visibility = 'visible';
  document.getElementById("broadband-legend").style.visibility = 'hidden';
  $('#checkbox').attr('disabled', 'disabled')

  map.setSlider(0); // reposition slider to the left side

  // reset instructions text on left map controls
  document.getElementById("left-controls-title").innerHTML = `About this map`;
  document.getElementById("chart1").innerHTML = `
  There is no one source of truth for broadband quality. This map compares measures of broadband coverage
  from various sources and shows an average broadband speed score by New York census tract.<br>
  <br>
  <b>Scores View:</b>
  Click any
  <a id="census-tract-a-link">census tract</a>
  <div class="arrow" id="census-tract-arrow">
    <i style='font-size: 100px' class="fas fa-long-arrow-alt-down"></i>
  </div>
  to view its broadband and demographic data.
  <br><b>Comparison View:</b> The FCC collects data from ISPs (Internet Service Providers)
  on the broadband speeds they provide. However these speeds don't always line up with speeds experienced
  by consumers. Display
  <a id="split-left-a-link">ISP-reported broadband speeds on the left</a>
  <div class="arrow" id="split-left-arrow">
    <i style='font-size: 80px' class="fas fa-long-arrow-alt-left"></i>
  </div>
  of the map and corresponding
  <a id="split-right-a-link">measured speeds on the right</a>
  <div class="arrow" id="split-right-arrow">
    <i style='font-size: 80px' class="fas fa-long-arrow-alt-right"></i>
  </div>
  , then
  <a id="slide-a-link">slide to compare</a>
  <div class="arrow" id="slide-arrow">
    <i style='font-size: 80px' class="fas fa-long-arrow-alt-left"></i>
    <i style='font-size: 80px' class="fas fa-long-arrow-alt-right"></i>
  </div>
  these speeds across the state. Use
   <a id="checkbox-a-link">this checkbox</a>
   <div class="arrow" id="checkbox-arrow">
     <i style='font-size: 80px' class="fas fa-long-arrow-alt-right"></i>
   </div>
   to apply the same values to colors on both sides of the map.
   <a id="scores-view-a-link">Return to the scores view</a>
   <div class="arrow" id="scores-view-arrow">
     <i style='font-size: 80px' class="fas fa-long-arrow-alt-left"></i>
   </div>
  at any time.
`;

  // call the function that sets hidden arrow positions after we re-draw them on resetting HTML of the left menu
  hoverForInstructions();

  // reset broadband score description on right map controls
  document.getElementById("right-controls-title").innerHTML = `Broadband Score`;
  document.getElementById("chart2").innerHTML = `A scoring system was developed to provide a single metric that captures the overall performance and accessibility of broadband
    in a census tract. The score creates a single <em>Broadband Score</em> by combining data fields from various datasets
    after analysis & modeling.
    <br>
    The full data dictionary containing fields used to calculate the score and all fields visualized is available on
    <a target="_blank" rel="noopener noreferrer"
      href="https://github.com/nys-broadband/broadband-map-nys">this Github repository
    </a>.
    <br>
    <br>
    Data values in those fields were split into quintiles and thus each census tract received a score of 1-5 based on the
    average of the quintile it fell into for each field. For each variable and the score itself, a lower value indicates
    worse performance and a higher value indicates better performance.
    <br>
    <br>
    <b>Blank census tracts indicate no Broadband Score due to a lack of data.</b>
`;

  // reset variables
  first_var = 'Broadband Score';
  second_var = 'Broadband Score';
  firstarr = [];
  secondarr = [];

  // reset button text
  document.getElementById('left-button').innerHTML = 'Split map left <span class="caret"></span>'
  document.getElementById('right-button').innerHTML = 'Split map right <span class="caret"></span>'

  afterMap.getSource('highlight-clickedTract-source-afterMap').setData({
    'type': 'FeatureCollection',
    'features': []
  })

});

// After map loads, get properties for this temporary object from which we will get percentiles
afterMap.on('load', function() {
  sql.execute(`${temp_SQL_qry}`)
      .done(function(data) {
        var rawdata = data.rows;
        rawdata.forEach((el) => {
          for (const [key, value] of Object.entries(tempObj)) {
            tempObj[`${key}`].push(el[`${key}`])
          };
        });
        for (const [key, value] of Object.entries(tempObj)) {
          percentiles_tractClick[`percs_${key}`] = percentiles(value)
        };
        tempObj = {}; // reset tempObj since we don't need to keep it saved
        console.log(percentiles_tractClick)
      });
});

// Populate the variable selection dropdowns on the frontend:
// $.each(displayVal_to_colName, function(key, value) {
//   $('.dropdown-menu').append(`
//     <li><a class="dropdown-item" data-value=${value} href="#">${key}</a></li>
//     `)
// })

// Obj var to hold arrays of all property values
var featuresObj = {};
$.each(colsToMap, function(i, colName) {
  featuresObj[`${colName}`] = []
});

// After map loads, get properties for drawing charts & calculating percentiles
afterMap.on('load', function() {
  sql.execute(`${initial_SQL_qry}`)
      .done(function(data) {
        var rawdata = data.rows;
        rawdata.forEach((el) => {
          for (const [key, value] of Object.entries(featuresObj)) {
            featuresObj[`${key}`].push(el[`${key}`])
          };
        });
      });
});


afterMap.on('load', function() {
  $('#exampleModalCenter').modal('show') // show modal when style loads
});

// Function to add styling for hovered census tract
beforeMap.on('load', function() {

  // openNav(); //load welcome message on load

  // add an empty data source, which we will use to highlight the census tract that the user is hovering over
  beforeMap.addSource('highlight-tract-source-beforeMap', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  });

  // add a layer for the hovered census tract
  beforeMap.addLayer({
    id: 'highlight-tract-layer-beforeMap',
    type: 'line',
    source: 'highlight-tract-source-beforeMap',
    paint: {
      'line-width': 2,
      'line-color': 'black',
      // 'fill-opacity': 1,
      // 'fill-outline-color': 'black'
    }
  });
})

// Function to add styling for hovered census tract
afterMap.on('load', function() {

  // openNav(); //load welcome message on load

  // add an empty data source, which we will use to highlight the census tract that the user is hovering over
  afterMap.addSource('highlight-tract-source-afterMap', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  });

  // add a layer for the hovered census tract
  afterMap.addLayer({
    id: 'highlight-tract-layer-afterMap',
    type: 'line',
    source: 'highlight-tract-source-afterMap',
    paint: {
      'line-width': 2,
      'line-color': 'black',
    }
  });

    // add an empty data source, which we will use to highlight the census tract that the user is hovering over
    afterMap.addSource('highlight-clickedTract-source-afterMap', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });

    // add a layer for the hovered census tract
    afterMap.addLayer({
      id: 'highlight-clickedTract-layer-afterMap',
      type: 'line',
      source: 'highlight-clickedTract-source-afterMap',
      paint: {
        'line-width': 2,
        'line-color': 'black',
      }
  });

})

const REQUEST_GET_MAX_URL_LENGTH = 2048;

addCartoLayer();

// Function to add layers based on CARTO tiles:
async function addCartoLayer() {
  const tileSourceURLs = await getTileSources();

  beforeMap.addLayer(
    {
      id: 'scores_layer',
      type: 'fill',
      source: {
        type: 'vector',
        tiles: tileSourceURLs
      },
      'source-layer': 'layer0',
      layout: {
        'visibility': 'visible'
      },
      paint: {
        'fill-color': [
          'step',
          ['get', 'broadband_score'],
          diverging_colors[0],
          2, diverging_colors[1],
          3, diverging_colors[2],
          4, diverging_colors[3],
          5, diverging_colors[4],
        ],
        'fill-opacity': 1
      }
    }
  );

  afterMap.addLayer(
    {
      id: 'scores_layer',
      type: 'fill',
      source: {
        type: 'vector',
        tiles: tileSourceURLs
      },
      'source-layer': 'layer0',
      layout: {
        'visibility': 'visible'
      },
      paint: {
        'fill-color': [
          'step',
          ['get', 'broadband_score'],
          diverging_colors[0],
          2, diverging_colors[1],
          3, diverging_colors[2],
          4, diverging_colors[3],
          5, diverging_colors[4],
        ],
        'fill-opacity': 1
        // 'fill-outline-color': 'black'
      }
    }
  );

  beforeMap.addLayer(
    {
      id: 'first_selected_layer',
      type: 'fill',
      source: {
        type: 'vector',
        tiles: tileSourceURLs
      },
      'source-layer': 'layer0',
      layout: {
        'visibility': 'none'
      },
      paint: {
        'fill-color': [
          'step',
          ['get', displayVal_to_colName[first_var]],
          sequential_colors[0],
          203.06, sequential_colors[1],
          249.9, sequential_colors[2],
          306.13, sequential_colors[3],
          411.95, sequential_colors[4],
        ],
        'fill-opacity': 1
        // 'fill-outline-color': 'black'
      }
    }
  );

  afterMap.addLayer(
    {
      id: 'second_selected_layer',
      type: 'fill',
      source: {
        type: 'vector',
        tiles: tileSourceURLs
      },
      'source-layer': 'layer0',
      layout: {
        'visibility': 'none'
      },
      paint: {
        'fill-color': [
          'step',
          ['get', displayVal_to_colName[second_var]],
          sequential_colors[0],
          123.85, sequential_colors[1],
          158.54, sequential_colors[2],
          176.68, sequential_colors[3],
          191.9, sequential_colors[4],
        ],
        'fill-opacity': 1
        // 'fill-outline-color': 'black'
      }
    }
  );

}

// Function to get tiles from CARTO source
async function getTileSources() {
  const mapConfig = JSON.stringify({
    version: '1.3.1',
    buffersize: {mvt: 1},
    layers: [
      {
        type: 'mapnik',
        options: {
          sql: 'SELECT the_geom_webmercator, tract, county, avg_d_mbps_wt, avg_u_mbps_wt, wt_avg_maxaddown, wt_avg_maxadup, broadband_score FROM dataset_for_vis_final',
          vector_extent: 4096,
          bufferSize: 1,
          version: '1.3.1'
        }
      }
    ]
  });
  const url = `https://usignite-intern.carto.com/api/v1/map?apikey=93ca9b2ca98129188e337d41aee1e0faad970acd`;
  const getUrl = `${url}&config=${encodeURIComponent(mapConfig)}`;
  let request;

  if (getUrl.length < REQUEST_GET_MAX_URL_LENGTH) {
    request = new Request(getUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });

  } else {
    request = new Request(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: mapConfig
    });
  }

  const response = await fetch(request);
  return (await response.json()).metadata.tilejson.vector.tiles
}

// Create a popup, but don't add it to the map yet. This will be the hover popup
var popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
  anchor: ""
});

beforeMap.on('load', function() {

  // Function to query rendered features for the census tract the user is hovering over, highlight that tract, then populate popup with that tract's info
  beforeMap.on('mousemove', function(e) {

    //query for the features under the mouse:
    var features = beforeMap.queryRenderedFeatures(e.point, {
        layers: ['scores_layer', 'first_selected_layer']
      });
    console.log(features)

    // Check whether features exist
    if (features.length > 0) {
      beforeMap.getCanvas().style.cursor = 'pointer'; //change cursor to pointer if hovering over a census tract

      var hoveredFeature = features[0];
      //Extract necessary variables:
      var tract_id = hoveredFeature.properties.tract;
      var county_name = hoveredFeature.properties.county
      var first_var_value = hoveredFeature.properties[`${displayVal_to_colName[first_var]}`];
      var second_var_value = hoveredFeature.properties[`${displayVal_to_colName[second_var]}`];

      if (first_var === second_var) {
        window['popupContent'] = `
          <div style = "font-family:sans-serif; font-size:14px; font-weight:bold">Census Tract ${tract_id}</div>
          <div style = "font-family:sans-serif; font-size:14px; font-weight:bold">${county_name} County</div>
          <div style = "font-family:sans-serif; font-size:11px; font-weight:600">${first_var}: ${first_var_value}</div>
        `;
      } else {
        window['popupContent'] = `
          <div style = "font-family:sans-serif; font-size:14px; font-weight:bold">Census Tract ${tract_id}</div>
          <div style = "font-family:sans-serif; font-size:14px; font-weight:bold">${county_name} County</div>
          <div style = "font-family:sans-serif; font-size:11px; font-weight:600">${first_var}: ${first_var_value}</div>
          <div style = "font-family:sans-serif; font-size:11px; font-weight:600">${second_var}: ${second_var_value}</div>
        `;
      };

      //fix the position of the popup as the position of the circle:
      popup.setLngLat(e.lngLat).setHTML(popupContent).addTo(beforeMap);

      // set this circle's geometry and properties as the data for the highlight source
      beforeMap.getSource('highlight-tract-source-beforeMap').setData(hoveredFeature.geometry);

      } else { //if len(features) <1
        // remove the Popup, change back to default cursor and clear data from the highlight data source
        popup.remove();
        beforeMap.getCanvas().style.cursor = '';
        beforeMap.getSource('highlight-tract-source-beforeMap').setData({
          'type': 'FeatureCollection',
          'features': []
        })
      }
  });
});

afterMap.on('load', function() {

  // Function to query rendered features for the census tract the user is hovering over, highlight that tract, then populate popup with that tract's info
  afterMap.on('mousemove', function(e) {
    //query for the features under the mouse:
    var features = afterMap.queryRenderedFeatures(e.point, {
        layers: ['scores_layer', 'second_selected_layer']
      });

    // Check whether features exist
    if (features.length > 0) {
      afterMap.getCanvas().style.cursor = 'pointer'; //change cursor to pointer if hovering over a census tract

      var hoveredFeature = features[0];
      //Extract necessary variables:
      var tract_id = hoveredFeature.properties.tract;
      var county_name = hoveredFeature.properties.county;
      var first_var_value = hoveredFeature.properties[`${displayVal_to_colName[first_var]}`];
      var second_var_value = hoveredFeature.properties[`${displayVal_to_colName[second_var]}`];

      if (first_var === second_var) {
        window['popupContent'] = `
          <div style = "font-family:sans-serif; font-size:14px; font-weight:bold">Census Tract ${tract_id}</div>
          <div style = "font-family:sans-serif; font-size:14px; font-weight:bold">${county_name} County</div>
          <div style = "font-family:sans-serif; font-size:11px; font-weight:600">${first_var}: ${first_var_value}</div>
        `;
      } else {
        window['popupContent'] = `
          <div style = "font-family:sans-serif; font-size:14px; font-weight:bold">Census Tract ${tract_id}</div>
          <div style = "font-family:sans-serif; font-size:14px; font-weight:bold">${county_name} County</div>
          <div style = "font-family:sans-serif; font-size:11px; font-weight:600">${first_var}: ${first_var_value}</div>
          <div style = "font-family:sans-serif; font-size:11px; font-weight:600">${second_var}: ${second_var_value}</div>
        `;
      };

      //fix the position of the popup as the position of the circle:
      popup.setLngLat(e.lngLat).setHTML(popupContent).addTo(afterMap);
      //create and populate a feature with the properties of the hoveredFeature necessary for data-driven styling of the highlight layer
      // set this circle's geometry and properties as the data for the highlight source
      afterMap.getSource('highlight-tract-source-afterMap').setData(hoveredFeature.geometry);

      } else { //if len(features) <1
        // remove the Popup, change back to default cursor and clear data from the highlight data source
        popup.remove();
        afterMap.getCanvas().style.cursor = '';
        afterMap.getSource('highlight-tract-source-afterMap').setData({
          'type': 'FeatureCollection',
          'features': []
        })
      }

  });

  afterMap.on('click', 'scores_layer', function(e) {

    document.getElementById("chart1").textContent = "";
    document.getElementById("chart2").textContent = "";
    document.getElementById("left-controls-title").textContent = "Broadband Data";
    document.getElementById("right-controls-title").innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16" data-toggle="tooltip" data-placement="top" data-html="true" title="Values of -9999 indicate missing data">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
      </svg>
      Demographic Data`;
    document.getElementById("broadband-legend").style.visibility = 'visible';

    // enable tooltips
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })

    // get the clicked tract number by querying the rendered features
    var features = afterMap.queryRenderedFeatures(e.point, {
        layers: ['scores_layer'],
    });
    var clickedFeature = features[0]
    var clickedTract = clickedFeature.properties.tract
    var clickedCounty = clickedFeature.properties.county

    // Check whether features exist
    if (features.length > 0) {
      // sql query to get data for clicked tract
      var tractClick_SQL_qry_broadband = 'SELECT '+broadbandColsForTractClick.join()+sql_fromStatement+' WHERE tract = '+clickedTract
      var tractClick_SQL_qry_demog = 'SELECT '+demogColsForTractClick.join()+sql_fromStatement+' WHERE tract = '+clickedTract
      sql.execute(`${tractClick_SQL_qry_broadband}`)
         .done(function(data) {
          window['broadbandTractValues'] = data.rows[0];
          console.log(broadbandTractValues);
          // create table with plotly HERE using broadbandTractValues and percentilesObject as input
          createTable(broadbandTractValues, percentiles_tractClick, clickedTract, clickedCounty, 'chart1');
        });

      sql.execute(`${tractClick_SQL_qry_demog}`)
         .done(function(data) {
          window['demogTractValues'] = data.rows[0];
          console.log(demogTractValues);
          // create table with plotly HERE using broadbandTractValues and percentilesObject as input
          createTable(demogTractValues, percentiles_tractClick, clickedTract, clickedCounty, 'chart2');
        });


      var clickedFeature_highlightData = {
        'type': 'Feature',
        'geometry': clickedFeature.geometry
      };
      // set this circle's geometry and properties as the data for the clicked highlight source
      afterMap.getSource('highlight-clickedTract-source-afterMap').setData(clickedFeature_highlightData);
    } else {//if len(features) <1
      afterMap.getSource('highlight-clickedTract-source-afterMap').setData({
        'type': 'FeatureCollection',
        'features': []
      })
    }

  })
})

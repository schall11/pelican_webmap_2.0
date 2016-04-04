
        require([
                "esri/map",
                "esri/geometry/Point", "esri/geometry/Polyline", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol","esri/renderers/HeatmapRenderer",
                "esri/Color", "esri/graphic", "esri/layers/FeatureLayer", "esri/layers/GraphicsLayer", "esri/graphicsUtils", "esri/geometry/geodesicUtils", "esri/units",
                "esri/dijit/Popup", "esri/dijit/PopupTemplate", "esri/geometry/Extent", "esri/dijit/HomeButton", "esri/dijit/Scalebar",
                "esri/dijit/BasemapToggle", "esri/dijit/Legend", "esri/renderers/UniqueValueRenderer",
                "dojo/dom-class", "dojo/dom-construct", "dojo/on", "dojo/_base/array", "dojo/domReady!"
            ],
            function(
                Map, Point, Polyline, SimpleMarkerSymbol, SimpleLineSymbol, HeatmapRenderer,
                Color, Graphic, FeatureLayer, GraphicsLayer, graphicsUtils, geodesicUtils, Units,
                Popup, PopupTemplate, Extent, HomeButton, Scalebar,
                BasemapToggle, Legend, UniqueValueRenderer,
                domClass, domConstruct, on, array
            ) {
				
                ///////
                //////
                //// Begin Map
				var outline = new SimpleLineSymbol(SimpleLineSymbol.Style_Solid).setColor("red").setWidth(3);
                var ol = new SimpleLineSymbol(SimpleLineSymbol.Style_Solid, new Color([255, 0, 0]), 1.5);
                var fill = new SimpleMarkerSymbol(SimpleMarkerSymbol.Style_Circle).setOutline(outline);
                var popup = new Popup({
                    markerSymbol: fill,
                    highlight: true,
                    titleInBody: false
                }, domConstruct.create("div"));
                domClass.add(popup.domNode, "dark");
				var spPop = new PopupTemplate({
                    title: "Starting Location",
                    fieldInfos: [{
                        fieldName: "Date_",
                        label: 'Starting Date:',
                        visible: true
                    }]
                });
				
				var name_colors = [
                    [166, 206, 227],
                    [31, 120, 180],
                    [178, 223, 138],
                    [51, 160, 44],
                    [251, 154, 153],
                    [227, 26, 28],
                    [253, 191, 111],
                    [255, 127, 0],
                    [202, 178, 214],
                    [106, 61, 154],
                    [255, 255, 153],
                    [177, 89, 40],
                    [86, 90, 153],
                    [204, 80, 25],
                    [117, 255, 0],
                    [237, 142, 255],
                    [123, 178, 151],
                    [255, 236, 191],
                    [238, 211, 255],
                    [203, 54, 126],
                    [102, 202, 234],
                    [230, 120, 120],
                    [102, 189, 202],
                    [95, 95, 215],
                    [175, 65, 175],
                    [250, 165, 105],
                    [120, 120, 120],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0],
					[0, 255, 0]
					
                ];
				var nameColor = [];
				var dict_nc = [];
				var namesAll = ['Annabelle', 'Barnabus', 'Chester', 'Daphne', 'Eleanor', 'George'];
				var ptt_ids = ['141554','141556','141557','141558','141559','141560']
				for (var n = 0; n < namesAll.length; n++) {
                    dict_nc.push({
						'name' : namesAll[n],
						'color' : name_colors[n]
				})
					var tL = [];
                    tL.push(ptt_ids[n]);
                    tL.push(name_colors[n]);
                    nameColor.push(tL);
				}
				console.log(nameColor);
				var outline = new SimpleLineSymbol(SimpleLineSymbol.Style_Solid).setColor("red").setWidth(3);
                var ol = new SimpleLineSymbol(SimpleLineSymbol.Style_Solid, new Color([255, 0, 0]), 1.5);
                var fill = new SimpleMarkerSymbol(SimpleMarkerSymbol.Style_Circle).setOutline(outline);
				var renderer1 = new UniqueValueRenderer(null, "ptt_id");
                for (i = 0; i < nameColor.length; i++) {
                    renderer1.addValue((nameColor[i][0]), new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 6, ol, new Color([255, 0, 0])).setColor(new Color([nameColor[i][1][0], nameColor[i][1][1], nameColor[i][1][2]])));
                }
				console.log(renderer1);
				 var startingPts = new esri.layers.FeatureLayer("http://maps.dnr.utah.gov:6080/arcgis/rest/services/DWR/AWPE_Argos_Data/MapServer/0", {
                    mode: FeatureLayer.MODE_SNAPSHOT,
                    //infoTemplate: spPop,
                    outFields: ['*'],
                    visible: true
                });
				startingPts.setRenderer(renderer1);
				
                var map = new Map("map", {
                    basemap: "dark-gray",
                    sliderPosition: "top-left",
                    zoom: 5,
					autoResize: true,
					minZoom: 3,
                    infoWindow: popup
                });
				

                map.addLayers([startingPts]);

                var toggle = new BasemapToggle({
                    map: map,
                    basemap: "hybrid"
                }, "BasemapToggle");

                var legend = new Legend({
                    map: map,
                    layerInfos: [
					{
                        layer: startingPts,
                        title: "Symbols"
                    }],
                    autoUpdate: false
                }, "legend");

                
                

                var scalebar = new Scalebar({
                    map: map,
                    attachTo: "bottom-left",
                    scalebarUnit: "dual"
                });

                map.on("load", function() {
                    var fullExtent = startingPts.fullExtent.expand(2);
                    map.setExtent(fullExtent);
                    toggle.startup();
                    legend.startup();
					var homeButton = new HomeButton({
                    theme: "HomeButton",
                    map: map,
                    extent: fullExtent,
                    visible: true
                }, "HomeButton");
                    homeButton.startup()
                    map.infoWindow.resize(300, 250);
                })




                $(function() {
                    $("#trackToggle").button();
                    $("#ltoggle").button();
                });



                $('#ltoggle').click(function() {
                    $('#legend').slideToggle();
                    if ($(this).is(':checked')) {
                        $(this).button('option', 'label', 'Show Legend');
                    } else {

                        $(this).button('option', 'label', 'Hide Legend');
                    }
                }); 
				
                




                

                startingPts.on("mouse-over", function() {
                    if (!$("#trackToggle").is(':checked')) {
                        map.setMapCursor("pointer");
                    }
                });
                startingPts.on("mouse-out", function() {
                    map.setMapCursor("default");
                });
                
                /* $(document).keyup(function(e) {
                    if (e.keyCode == 27) { // escape key maps to keycode `27`
                        map.infoWindow.hide();
                        featureLayer2.clearSelection();
                        $('#legend').show();
                    }
                }); */
                
                $('#lHide').click(function() {
                    $('#info').hide();
                    $('#legendToggle').show();

                });
                $('#legendToggle').click(function() {
                    $('#legend').show();
                    $('#info').show();
                    $('#legendToggle').hide();

                });

               

                
            });

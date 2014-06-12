

    var selectedMainPaper = "http://www.maalaimalar.com/RSS/SectionRssFeed.aspx?Id=1&Main=18";
    
	
	//	create JSON model instance
	var oModel = new sap.ui.model.json.JSONModel();

	// JSON sample data
	var mData = {

		// path : items
		"items" : [
			{
				"value": "0",
				"text": "Maalai Malar"
				
			},

			{
				"value": "1",
				"text": "Daily Thanthi"
				
			},

			{
				"value": "2",
				"text": "Dina Karan"
				
				
			},

			{
				"value": "3",
				"text": "Dina Mani"
				
			}

		],

		// path : selectedKey
		"selected": "5"
	};

	// set the data for the model
	oModel.setData(mData);

	// set the model to the core
	sap.ui.getCore().setModel(oModel);

	var oItemTemplate = new sap.ui.core.Item({
		key: "{value}",
		text: "{text}"
	});

	// select
	var oSelect0 = new sap.m.Select({
		items: {
			path: "/items", template: oItemTemplate
		},

		selectedKey: {
			path : "/selected",
			template: "{selected}"
		},

		change: function(oControlEvent) {
	
			alert("Selected Item:" +oControlEvent.getParameter("selectedItem").getKey());
            
			var selectedKey = oControlEvent.getParameter("selectedItem").getKey();
			
			if (selectedKey == 0) {
				
				selectedMainPaper = "http://www.maalaimalar.com/RSS/SectionRssFeed.aspx?Id=1&Main=18";
				
			}
			
			if (selectedKey == 1) {
				selectedMainPaper = "http://www.dailythanthi.com/RSS/SectionRssFeed.aspx?Main=2&Id=6";
			}
			
			
			if (selectedKey == 2) {
				selectedMainPaper = "http://www.dinakaran.com/rss_Latest.asp";
			}
			
			if (selectedKey == 3) {
				selectedMainPaper = "http://demo.dinamani.com/edition/rssSectionXml.aspx?SectionId=129";
			}
			
			alert("Selected URL" +selectedMainPaper);
			showData(selectedMainPaper);
		}
	});	
		

	var d = sap.ui.Device;
	
	var Bar = new sap.m.Bar({
		contentLeft : [ new sap.m.Button('SlideRight', {
			icon : sap.ui.core.IconPool.getIconURI("menu2"),
			press : function() {
				//oContainer.setSecondaryContentWidth(sap.ui.getCore().byId("tfSidePaneWidth").getValue());

				if (d.system.tablet == true) {
					oContainer.setSecondaryContentWidth("300px");
				}

				if (d.system.phone == true) {
					oContainer.setSecondaryContentWidth("230px");
				}

				if (d.system.desktop == true) {
					oContainer.setSecondaryContentWidth("350px");
				}
				oContainer.setShowSecondaryContent(!oContainer
						.getShowSecondaryContent());
			}
		}) ],
		
		contentMiddle : [ 
		                  //oSelectNewsPaper
		                  oSelect0

		],
	//contentRight: [new sap.m.Button('Button1', {text: "Edit"})]
	});


/*	var aData = {
		feedEntries : [
				{

					title : "http://www.maalaimalar.com/RSS/SectionRssFeed.aspx?Id=1&Main=18",
					description : "Maalai Malar - Head Lines",
					icon : "sap-icon://employee",

				},
				{

					title : "http://www.maalaimalar.com/RSS/SectionRssFeed.aspx?Id=19&Main=18",
					description : "Maalai Malar - Head Lines",
					icon : "sap-icon://documents",

				},
				{

					title : "http://www.maalaimalar.com/RSS/SectionRssFeed.aspx?Id=114&Main=2",
					description : "Maalai Malar - Cinema",
					icon : "sap-icon://discussion",

				},
				{

					title : "http://scn.sap.com/community/developer-center/front-end/blog/feeds/posts",
					description : "SAPUI5 Space Blogs",
					icon : "sap-icon://dimension",

				},

				{

					title : "http://www.maalaimalar.com/RSS/SectionRssFeed.aspx?Id=114&Main=2",
					description : "Maalai Malar - Cinema Kisu Kisu",
					icon : "sap-icon://display",

				}, ]
	};

	var oModel = new sap.ui.model.json.JSONModel();
	oModel.setData(aData);

*/
	var oItemTemplate = new sap.m.StandardListItem({
		title : "{title}",
		description : "{description}",
		icon : "{icon}",
		type : "Active"
	});

	jQuery.sap.require("sap.ui.core.IconPool");

	showData(selectedMainPaper);
	
	var oTileContainer = new sap.m.TileContainer('myTile',{		
		    width : "100%",
			height : "100%"});

	
	var w = window.innerWidth;
	alert("inner width" + w);
	var h = window.innerHeight;
	alert("inner Height" + h);
	
	var strHeight = "height=";
	var strWidth = " width=";
	var px = "px";
	var strConcat = strHeight.concat(h);
	strConcat = strConcat.concat(px);
	strConcat = strConcat.concat(strWidth);
	strConcat = strConcat.concat(w);
	strConcat = strConcat.concat(px);
	alert("strConcat" +strConcat);	
	
	var oOverlay = new sap.ui.ux3.OverlayContainer({openButtonVisible:false});
	
	 oOverlay.attachClose(function(oControlEvent) { 
	    	var id = oControlEvent.getParameters().id;
	    	oOverlay.removeAllContent();
	    //	alert("Thing \""+ id+ "\"closed");
	    });
	    oOverlay.attachOpen(function(oControlEvent) {
			var id = oControlEvent.getParameters().id;
		//	alert("Thing \"" + id + "\"open triggered");
		});
/*	    oOverlay.attachOpenNew(function(oControlEvent) {
			var id = oControlEvent.getParameters().id;
			//alert("Thing \"" + id + "\"openNew triggered");
		});	*/
	
	function handlePress(oEvent) {
		
		
		var str = "'";
		var link = str.concat(oEvent.oSource.getActiveIcon()); 
		link = link.concat(str);
		
		/*var ow = window.outerWidth; //including toolbars and status bar etc.
		alert("outer Width " + ow);
		var oh = window.outerHeight;
		alert("outer Height " + oh);*/
		
		
		//alert("Link: " +link);
		var scrolling = "scrolling=yes";
		
		
		var HtmlIFrame = new sap.ui.core.HTML({
			  content:
			          "<iframe src=" + link 
			         + strConcat
			         //"height=500px width=1200px>" 
			          + scrolling  
			          + "</iframe>" 
			          
		});			
		
	//	alert("HtmlIFrame:" +HtmlIFrame);
		oOverlay.addContent(
				HtmlIFrame
		);
	//	window.open(oEvent.oSource.getActiveIcon(), "target=_blank");
    	oOverlay.open();

		
	}

	function showData(url) {
		alert("Url inside Show Data" +url);

		var data = {
			FeedCollection : []
		};

		
		var urlFeed = url;
		
		$.jGFeed(urlFeed, function(feeds) {
			if (!feeds.entries.length) {
				// there was an error
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show("No Data Found!");
			}

			else {

				for ( var i = 0; i < feeds.entries.length; i++) {
					var entry = feeds.entries[i];

					var FeedArray = {};

					var date = new Date(entry.publishedDate);

					var months = Array("January", "February", "March", "April",
							"May", "June", "July", "August", "September",
							"October", "November", "December");
					var string = date.getDate() + " " + months[date.getMonth()]
							+ " " + date.getFullYear();

					FeedArray.Number = string;
					//  FeedArray.Title = entry.title;
					FeedArray.Title = entry.contentSnippet;
					FeedArray.Info = entry.author;
					FeedArray.ActiveIcon = entry.link;
					var fName = entry.author.substr(0, entry.author
							.indexOf(' '));
					var lName = entry.author
							.substr(entry.author.indexOf(' ') + 1);
					var fullName = fName.toLowerCase() + "."
							+ lName.toLowerCase();
					/*  var iconUrl = 'http://scn.sap.com/people/' + fullName + '/avatar/46.png';
					  FeedArray.Icon = iconUrl;*/

					data.FeedCollection.push({
						Feed : FeedArray
					});
				}

				var oModel = new sap.ui.model.json.JSONModel(data);

				var oTiles = new sap.m.StandardTile({
					icon : "{Feed/Icon}",
					number : "{Feed/Number}",
					title : "{Feed/Title}",
					info : "{Feed/Info}",
					activeIcon : "{Feed/ActiveIcon}",
					press : handlePress
				})

				oTileContainer.bindAggregation("tiles", {
					path : "/FeedCollection",
					template : oTiles
				});
				oTileContainer.setModel(oModel);
			}
		}, 30);

	}

	function resetData(oEvent) {

		oTileContainer.destroyTiles();

	}

	var oContainer = new sap.ui.unified.SplitContainer({
		content : [ 
		            Bar, 
   			    	oTileContainer
		],
		secondaryContent : [ 
		         /*            new sap.ui.commons.Button({
			text : "Content",
			width : "100%",
			height : "100%",
			lite : true
		}),*/

		]
	});
	oContainer.addStyleClass("myContainerClass");
	
	oContainer.placeAt("content");
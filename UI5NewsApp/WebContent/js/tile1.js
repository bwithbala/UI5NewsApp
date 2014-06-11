	
alert("inside Tile.Js");

/*try {
		sap.ui.getCore().loadLibrary("sap.ui.commons");
	} catch (e) {
		alert("This test page requires the library 'sap.ui.commons' which is not available.");
		throw (e);
	}*/

	oSelectNewsPaper = new sap.m.Select({
		type : sap.m.SelectType.Default,
		autoAdjustWidth : true,
		items : [ oItemMaalaiMalar = new sap.ui.core.Item({
			key : "0",
			text : "Maalai Malar",
		}),

		oItemDailyThanthi = new sap.ui.core.Item({
			key : "1",
			text : "Daily Thanthi",
		}),

		oItemDinaKaran = new sap.ui.core.Item({
			key : "2",
			text : "Dina Karan",
		}) ]
	});

	var Bar = new sap.m.Bar({
		contentLeft : [ new sap.m.Button('SlideRight', {
			text : "SlideRight",
			type : sap.m.ButtonType.accept,
			press : function() {
				oContainer.setSecondaryContentWidth("300px");
				oContainer.setShowSecondaryContent(!oContainer
						.getShowSecondaryContent());
			}
		}) ],
		contentMiddle : [ oSelectNewsPaper

		],
	//contentRight: [new sap.m.Button('Button1', {text: "Edit"})]
	});

	var d = sap.ui.Device;

	var aData = {
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

	var oItemTemplate = new sap.m.StandardListItem({
		title : "{title}",
		description : "{description}",
		icon : "{icon}",
		type : "Active"
	});

	jQuery.sap.require("sap.ui.core.IconPool");


	showData("http://www.maalaimalar.com/RSS/SectionRssFeed.aspx?Id=1&Main=18");
	
	var oTileContainer = new sap.m.TileContainer('myTile',{		
		    width : "100%",
			height : "100%"});

	function handlePress(oEvent) {
		window.open(oEvent.oSource.getActiveIcon(), "target=_blank");
	}

	function showData(url) {

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
		secondaryContent : [ new sap.ui.commons.Button({
			text : "Content",
			width : "100%",
			height : "100%",
			lite : true
		}),

		]
	});

	oContainer.placeAt("content");
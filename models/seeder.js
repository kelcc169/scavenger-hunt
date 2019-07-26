function seedLocations(req, res) {
	const locations =[
		{name: 'The Showbox',
			latitude: -122.339376,
			longitude: 47.608481
			// pictureUrl: ,
			// listId: ,
			// listIndex: 
		},
		{name: 'Benaroya Hall',
		latitude: -122.336877,
		longitude: 47.608127
		// pictureUrl: ,
		// listId: ,
		// listIndex: 
	},
		{name: 'The Triple Door',
		latitude: -122.337363,
		longitude: 47.608716
		// pictureUrl: ,
		// listId: ,
		// listIndex: 
	},
		{name: 'The 5th Ave Theater',
		latitude: -122.333810,
		longitude: 47.609377
		// pictureUrl: ,
		// listId: ,
		// listIndex: 
	},
	];

	for (location of locations) {
		var newLocation = new Location(location);
		newLocation.save();
	}

res.send('Database seeded')


}
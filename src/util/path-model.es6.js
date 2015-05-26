define(['jquery', 'bluebird'], ($, P) => {
	'use strict';


	/* storing and retrieving path models */
	let _paths = {
		"vascular": {
			"24tile:60000001": {
				"24tile:60000003": {
					"type":    "vascular",
					"subtype": "arterial",
					"path": [
						"24tile:60000001",
						"x",
						"y",
						"24tile:60000003"
					],
					"from": "24tile:60000001",
					"to":   "24tile:60000003"
				},
				"24tile:60000014": {
					"type": "vascular",
					"subtype": "arterial",
					"path": [
						"24tile:60000001",
						"x",
						"24tile:60000014"
					],
					"from": "24tile:60000001",
					"to":   "24tile:60000014"
				},

				"24tile:60000005": {
					"type": "vascular",
					"subtype": "arterial",
					"path": [
						"24tile:60000001",
						"x",
						"y",
						"y0",
						"y1",
						"24tile:60000005"
					],
					"from": "24tile:60000001",
					"to":   "24tile:60000005"
				},
				"24tile:60000011": {
					"type": "vascular",
					"subtype": "arterial",
					"path": [
						"24tile:60000001",
						"x",
						"y",
						"y0",
						"y1",
						"24tile:60000011"
					],
					"from": "24tile:60000001",
					"to":   "24tile:60000011"
				},

				"24tile:60000018": {
					"type": "vascular",
					"subtype": "arterial",
					"path": [
						"24tile:60000001",
						"x",
						"y",
						"y0",
						"y2",
						"24tile:60000018"
					],
					"from": "24tile:60000001",
					"to":   "24tile:60000018"
				},
				"24tile:60000023": {
					"type": "vascular",
					"subtype": "arterial",
					"path": [
						"24tile:60000001",
						"x",
						"y",
						"y0",
						"y2",
						"24tile:60000023"
					],
					"from": "24tile:60000001",
					"to":   "24tile:60000023"
				}
			},
			"24tile:60000014": {
				"24tile:60000020": {
					"type": "vascular",
					"subtype": "arterial",
					"path": [
						"24tile:60000014",
						"24tile:60000020"
					],
					"from": "24tile:60000014",
					"to":   "24tile:60000020",
					"adjacent": true
				}
			},
			"24tile:60000020": {
				"24tile:60000022": {
					"type": "vascular",
					"subtype": "arterial",
					"path": [
						"24tile:60000020",
						"z",
						"24tile:60000022"
					],
					"from": "24tile:60000020",
					"to":   "24tile:60000022"
				}
			}
		}
	};


	/* to retrieve the path models relating to the given ids from the server and fill the path cache */
	function fetchPathsFor(ids) {

		console.log(ids);

		let idSet = new Set(ids);

		let result = {};

		for (let type of Object.keys(_paths)) {
			result[type] = {};
			for (let from of Object.keys(_paths[type])) {
				if (idSet.has(from)) {
					let fromObj = {};
					for (let to of Object.keys(_paths[type][from])) {
						if (idSet.has(to)) {
							fromObj[to] = _paths[type][from][to]
						}
					}
					if (Object.keys(from).length > 0) {
						result[type][from] = fromObj;
					}
				}
			}
		}

		return P.resolve(result);
	}


	return { fetchPathsFor };

});

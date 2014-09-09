//
// RequireJS Configuration
//
requirejs.config({
	paths: {
		'domReady': '../bower_components/requirejs-domready/domReady',
		'jquery': '../bower_components/jquery/dist/jquery',
		'jquery-ui': '../bower_components/jquery-ui/jquery-ui'
	},
	shim: {
		'jquery': { exports: '$' },
		'jquery-ui': ['jquery']
	}
});

//
// Example application
//
require(['jquery', '../dist/amy-skin.min', 'jquery-ui', '../dist/amy-circuitboard.min', 'domReady!'], function ($, skin) {

	//
	// Set up a model offering the required API (which is still under design)
	//
	function equipWithAPI(obj) {
		obj.getChild = function (id) {
			return obj.children[id];
		};
		obj.getChildIds = function () {
			return obj.children ? Object.keys(obj.children) : 0;
		};
		if (obj.children) {
			$.each(obj.children, function (childId, child) {
				child.id = childId;
				equipWithAPI(child);
			});
		}
		return obj;
	}

//	var model = equipWithAPI({
//		id: 's',
//		children: {
//			a: { name: 'Tile A', css: {
//				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
//				'& header': { borderColor: '#ffbbbb' }
//			}},
//			b: { name: 'Tile B', css: {
//				'&': { backgroundColor: 'blue', borderColor: 'lightblue', color: 'white' },
//				'& header': { borderColor: 'lightblue' }
//			}},
//			c: { name: 'Tile C', css: {
//				'&': { backgroundColor: 'gray', borderColor: 'lightgray', color: 'white' },
//				'& header': { borderColor: 'lightgray' }
//			}},
//			d: { name: 'Tile D',
//				css: {
//					'&': { backgroundColor: 'green', borderColor: 'lightgreen', color: 'white' },
//					'& header': { borderColor: 'lightgreen' }
//				},
//				children: {
//					d1: { name: 'Tile D1', css: {
//						'&': { backgroundColor: 'lightgreen', borderColor: 'green', color: 'black' },
//						'& header': { borderColor: 'green' }
//					}},
//					d2: { name: 'Tile D2', css: {
//						'&': { backgroundColor: 'lightgreen', borderColor: 'green', color: 'black' },
//						'& header': { borderColor: 'green' }
//					}},
//					d3: { name: 'Tile D3', css: {
//						'&': { backgroundColor: 'lightgreen', borderColor: 'green', color: 'black' },
//						'& header': { borderColor: 'green' }
//					}}
//				}
//			},
//			e: { name: 'Tile E', css: {
//				'&': { backgroundColor: 'purple', borderColor: 'orchid', color: 'white' },
//				'& header': { borderColor: 'orchid' }
//			}}
//		}
//	});
	var model = equipWithAPI({
		id: 'fma:60000000',
		children: {
			'fma:60000001': { name: 'Large Intestine', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000002': { name: 'Jejuno Ileum', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000003': { name: 'Liver Pancreas Duodenum', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000004': { name: 'Stomach', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000005': { name: 'Esophagus', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000006': { name: 'Mouth Throat', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000007': { name: 'Genitals Gonads', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000008': { name: 'Vascular Caudal', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000009': { name: 'Vascular Abdominal', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000010': { name: 'Vascular Thoracic', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000011': { name: 'Vascular Cephalic', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000012': { name: 'Lungs', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000013': { name: 'Urinary Tract', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000014': { name: 'Nervous Caudal', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000015': { name: 'Nervous Lower Spinal', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000016': { name: 'Nervous Upper Spinal', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000017': { name: 'Nervous Cephalic', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000018': { name: 'Nasopharynx Conjunctiva', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000019': { name: 'Lower Limb', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000020': { name: 'Pelvis', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000021': { name: 'Abdomen', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000022': { name: 'Thorax', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000023': { name: 'Neck Upper Limb', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			'fma:60000024': { name: 'Head', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}}
		}
	});

	//
	// Use the $.fn.circuitboard method to instantiate the circuit-board
	//
	var cb = $('#circuitboard').circuitboard({
		model: model,
		tileSpacing: 0
	}).circuitboard('instance');

	//
	// Apply the 'skin' plugin, which gives tiles a header
	// and applies css from the model
	//
	cb.onTileCreated(skin);

	//
	// Open and close tiles by a click.
	// Make open tiles twice as large as closed ones.
	//
	cb.onTileCreated(function (tile) {
		tile.on('click', function () {
			tile.open = !tile.open;
			tile.weight = tile.open ? 2 : 1;
		});
	});

})
;

import { Category } from "models/Category"

export const categories: Array<Category> = [
	{
		_id: "1",
		name: "Electronics",
		children: [
			{
				_id: "11",
				name: "Mobiles",
				children: [
					{
						_id: "111",
						name: "Feature Phones"
					},
					{
						_id: "112",
						name: "Smartphones",
						children: [
							{
								_id: "1121",
								name: "Slim"
							},
							{
								_id: "1122",
								name: "Gaming"
							},
							{
								_id: "1123",
								name: "Camera"
							}
						]
					},
					{
						_id: "113",
						name: "Accessories",
						children: [
							{
								_id: "1131",
								name: "Cases & Covers"
							},
							{
								_id: "1132",
								name: "Screen Protectors"
							},
							{
								_id: "1133",
								name: "Power Bank"
							},
							{
								_id: "1134",
								name: "Charger"
							}
						]
					},
					{
						_id: "114",
						name: "Refurbished & Open Box"
					}
				]
			},
			{
				_id: "12",
				name: "Smartwatches",
				children: [
					{
						_id: "121",
						name: "Normal"
					},
					{
						_id: "122",
						name: "Health Tracker"
					},
					{
						_id: "123",
						name: "Calling Supported"
					}
				]
			},
			{
				_id: "13",
				name: "Computer",
				children: [
					{
						_id: "132",
						name: "Laptops",
						children: [
							{
								_id: "1321",
								name: "Graphic Intensive"
							},
							{
								_id: "1322",
								name: "Business Grade"
							},
							{
								_id: "1323",
								name: "Gaming"
							},
							{
								_id: "1324",
								name: "Slim Series"
							},
							{
								_id: "1325",
								name: "Touch Screen"
							}
						]
					},
					{
						_id: "133",
						name: "Desktop",
						children: [
							{
								_id: "1331",
								name: "iMac"
							},
							{
								_id: "1332",
								name: "All in One"
							},
							{
								_id: "1333",
								name: "NUCs"
							}
						]
					},
					{
						_id: "134",
						name: "Accessories",
						children: [
							{
								_id: "1341",
								name: "Internal HDD"
							},
							{
								_id: "1342",
								name: "External HDD"
							},
							{
								_id: "1343",
								name: "Keyboards"
							},
							{
								_id: "1344",
								name: "Printer & Ink"
							},
							{
								_id: "1346",
								name: "Monitor"
							},
							{
								_id: "1345",
								name: "Networking Device"
							}
						]
					},
					{
						_id: "135",
						name: "Software"
					}
				]
			},
			{
				_id: "14",
				name: "Tablets"
			},
			{
				_id: "15",
				name: "Gaming Devices",
				children: [
					{
						_id: "151",
						name: "PlayStation"
					},
					{
						_id: "152",
						name: "XBOX"
					},
					{
						_id: "153",
						name: "Gameboy"
					},
					{
						_id: "154",
						name: "Arcade"
					}
				]
			},
			{
				_id: "16",
				name: "Camera",
				children: [
					{
						_id: "161",
						name: "Full Frame DSLR"
					},
					{
						_id: "162",
						name: "APS-C DSLR"
					},
					{
						_id: "163",
						name: "Medium Format"
					},
					{
						_id: "164",
						name: "Cinema"
					},
					{
						_id: "165",
						name: "Camcorder"
					},
					{
						_id: "166",
						name: "Night Vision"
					},
					{
						_id: "167",
						name: "Security"
					},
					{
						_id: "168",
						name: "Accessories"
					}
				]
			},
			{
				_id: "17",
				name: "Television"
			},
			{
				_id: "18",
				name: "Home Audio & Theater"
			},
			{
				_id: "19",
				name: "Lighting",
				children: [
					{
						_id: "191",
						name: "Garden"
					},
					{
						_id: "192",
						name: "Table Lamp"
					},
					{
						_id: "193",
						name: "Decoration"
					},
					{
						_id: "194",
						name: "Concealed"
					},
					{
						_id: "195",
						name: "Halogen"
					},
					{
						_id: "196",
						name: "Tube Light"
					},
					{
						_id: "197",
						name: "Studio"
					},
					{
						_id: "198",
						name: "CFL & Bulbs"
					}
				]
			}
		]
	},
	{
		_id: "2",
		name: "Musical Instruments",
		children: [
			{
				_id: "21",
				name: "Keyboard"
			},
			{
				_id: "22",
				name: "Grand Piano"
			},
			{
				_id: "23",
				name: "Violin"
			},
			{
				_id: "24",
				name: "Guitar",
				children: [
					{
						_id: "241",
						name: "Acoustic"
					},
					{
						_id: "242",
						name: "Electric"
					},
					{
						_id: "244",
						name: "Bass"
					}
				]
			},
			{
				_id: "25",
				name: "Harp"
			},
			{
				_id: "26",
				name: "Drums",
				children: [
					{
						_id: "261",
						name: "Acoustic"
					},
					{
						_id: "262",
						name: "Electronic"
					}
				]
			},
			{
				_id: "27",
				name: "Flute"
			},
			{
				_id: "28",
				name: "Microphone"
			},
			{
				_id: "29",
				name: "Amplifier"
			}
		]
	},
	{
		_id: "3",
		name: "Home Appliances",
		children: [
			{
				_id: "31",
				name: "Air Conditioners"
			},
			{
				_id: "32",
				name: "Kitchen Appliances",
				children: [
					{
						_id: "321",
						name: "Refrigerators"
					},
					{
						_id: "322",
						name: "Mixer"
					},
					{
						_id: "323",
						name: "Grinder"
					},
					{
						_id: "324",
						name: "Mixer"
					}
				]
			},
			{
				_id: "33",
				name: "Washing Machine"
			},
			{
				_id: "34",
				name: "Sewing Machine",
				children: [
					{
						_id: "341",
						name: "Manual"
					},
					{
						_id: "342",
						name: "Electric"
					}
				]
			},
			{
				_id: "35",
				name: "Fan",
				children: [
					{
						_id: "351",
						name: "Ceiling Fan",
						children: [
							{
								_id: "3511",
								name: "Simple"
							},
							{
								_id: "3512",
								name: "Designer"
							}
						]
					},
					{
						_id: "352",
						name: "Table Fan"
					},
					{
						_id: "353",
						name: "Long Stand Fan"
					},
					{
						_id: "354",
						name: "Cooler",
						children: [
							{
								_id: "3541",
								name: "Metal Body"
							},
							{
								_id: "3542",
								name: "Plastic Body"
							}
						]
					}
				]
			},
			{
				_id: "36",
				name: "Heater"
			},
			{
				_id: "37",
				name: "Geyser",
				children: [
					{
						_id: "371",
						name: "LPG Powered"
					},
					{
						_id: "372",
						name: "Electric"
					}
				]
			}
		]
	},
	{
		_id: "4",
		name: "Books",
		children: [
			{
				_id: "41",
				name: "Education"
			},
			{
				_id: "42",
				name: "Fiction"
			},
			{
				_id: "43",
				name: "War Stories"
			},
			{
				_id: "44",
				name: "Classic"
			},
			{
				_id: "45",
				name: "Children",
				children: [
					{
						_id: "451",
						name: "Learning"
					},
					{
						_id: "452",
						name: "Rhymes"
					},
					{
						_id: "453",
						name: "Comics"
					}
				]
			},
			{
				_id: "46",
				name: "Fine Arts"
			},
			{
				_id: "47",
				name: "Religion"
			},
			{
				_id: "48",
				name: "Music"
			},
			{
				_id: "49",
				name: "Science & Technology"
			},
			{
				_id: "410",
				name: "Language & Literature"
			},
			{
				_id: "411",
				name: "Crime Stories"
			}
		]
	},
	{
		_id: "5",
		name: "Jobs",
		children: [
			{
				_id: "51",
				name: "Web Developer"
			},
			{
				_id: "52",
				name: "Application Developer",
				children: [
					{
						_id: "521",
						name: "Linux"
					},
					{
						_id: "522",
						name: "Windows"
					},
					{
						_id: "523",
						name: "MacOS"
					},
					{
						_id: "524",
						name: "Mobile",
						children: [
							{
								_id: "5241",
								name: "Android"
							},
							{
								_id: "5242",
								name: "KaiOS"
							},
							{
								_id: "5243",
								name: "Ubuntu Touch"
							}
						]
					}
				]
			},
			{
				_id: "53",
				name: "Graphic Designer"
			},
			{
				_id: "54",
				name: "Web Designer"
			},
			{
				_id: "55",
				name: "Customer Care Executive"
			},
			{
				_id: "56",
				name: "Sales & Marketing"
			},
			{
				_id: "57",
				name: "Human Resources"
			},
			{
				_id: "58",
				name: "Delivery Services"
			},
			{
				_id: "59",
				name: "Computer Operator"
			},
			{
				_id: "510",
				name: "Teaching"
			},
			{
				_id: "511",
				name: "Human Resources"
			},
			{
				_id: "512",
				name: "Driver"
			},
			{
				_id: "513",
				name: "Cook"
			},
			{
				_id: "514",
				name: "Reception & Front-Office"
			},
			{
				_id: "515",
				name: "Operator & Technician"
			},
			{
				_id: "516",
				name: "Accountant"
			}
		]
	},
	{
		_id: "6",
		name: "Furniture",
		children: [
			{
				_id: "61",
				name: "Table",
				children: [
					{
						_id: "611",
						name: "Work Desk"
					},
					{
						_id: "612",
						name: "Dining Table"
					},
					{
						_id: "613",
						name: "Dressing Table"
					}
				]
			},
			{
				_id: "62",
				name: "Bed",
				children: [
					{
						_id: "621",
						name: "Single Bed"
					},
					{
						_id: "622",
						name: "Double Bed"
					}
				]
			},
			{
				_id: "63",
				name: "Sofa / Couch Set"
			},
			{
				_id: "64",
				name: "Cabinets"
			}
		]
	}
]

export default categories

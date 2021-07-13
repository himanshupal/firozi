import { Category } from "models/Category"

const categories: Array<Category> = [
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
						name: "Smartphones"
					},
					{
						_id: "113",
						name: "Accessories"
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
					}
				]
			},
			{
				_id: "13",
				name: "Computer",
				children: [
					{
						_id: "131",
						name: "Tablets"
					},
					{
						_id: "132",
						name: "Laptops"
					},
					{
						_id: "133",
						name: "Desktops"
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
								name: "Printer"
							},
							{
								_id: "1345",
								name: "Other"
							}
						]
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
				name: "Piano"
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
			}
		]
	}
]

export default categories

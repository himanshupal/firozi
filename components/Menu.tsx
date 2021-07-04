import Link from "next/link"

interface Route {
	path: string
	text: string
}

const routes: Array<Route> = [
	{
		path: "",
		text: "Deals"
	},
	{
		path: "",
		text: "Saved"
	},
	{
		path: "",
		text: "Followed"
	},
	{
		path: "",
		text: "My Ads"
	},
	{
		path: "",
		text: "Settings"
	}
]

const Menu = (): JSX.Element => {
	return (
		<div className="h-menu bg-blood sticky top-header z-10">
			<div className="h-1/3 border-t-2 pb-2 overflow-auto">
				<div className="py-2 px-8">
					<label
						htmlFor="sort"
						className="block pl-2 text-white text-lg font-cursive"
					>
						Sort by
					</label>
					<select name="sort" className="w-full px-2 h-8">
						<option value="priceInc">Cheapest to Costly</option>
						<option value="priceDec">Costly to Cheapest</option>
						<option value="postNew">Newest to Oldest</option>
						<option value="postOld">Oldest to Newest</option>
					</select>
				</div>
				<div className="py-2 px-8">
					<label
						htmlFor="price"
						className="block pl-2 text-white text-lg font-cursive"
					>
						Price
					</label>
					<input name="price" className="w-full px-2 h-8" />
				</div>
				<div className="py-2 px-8">
					<label
						htmlFor="filter"
						className="block pl-2 text-white text-lg font-cursive"
					>
						Filter
					</label>
					<input name="filter" className="w-full px-2 h-8" />
				</div>
			</div>
			<div className="border-t-2 pb-2">
				<div className="py-2 px-8">
					<label
						htmlFor="search"
						className="block pl-2 text-white text-lg font-cursive"
					>
						Search
					</label>
					<input name="search" className="w-full px-2 h-8" />
				</div>
				<div className="py-2 px-8">
					<label
						htmlFor="location"
						className="block pl-2 text-white text-lg font-cursive"
					>
						Location
					</label>
					<input name="location" className="w-full px-2 h-8" />
				</div>
			</div>
			<div className="border-t-2 pt-1">
				{routes.map(({ path, text }, index) => (
					<Link href={path} key={index}>
						<div className="text-white text-lg font-cursive pl-10 py-1">
							{text}
						</div>
					</Link>
				))}
			</div>
			<div className="border-t-2 p-1 text-white text-center text-xs font-thin">
				&copy; {new Date().getFullYear()} Firozi Inc.
			</div>
		</div>
	)
}

export default Menu

import { Range } from "rc-slider"
import { useState } from "react"

import shallow from "zustand/shallow"
import filterState from "store/filter"

import "rc-slider/assets/index.css"

const Menu = ({ reference }): JSX.Element => {
	const [{ min, max }, setRange] = useState({ min: 0, max: 1500 })
	const [searchPlaceholder, setSearchPlaceholder] =
		useState<string>("Search Ads")
	const [locationPlaceholder, setLocationPlaceholder] =
		useState<string>("Search Location")

	const [
		searchQuery,
		setSearchQuery,
		locationQuery,
		setLocationQuery,
		setSearchTerm,
		setLocationTerm
	] = filterState(
		(state) => [
			state.search,
			state.setSearch,
			state.location,
			state.setLocation,
			state.setSearchTerm,
			state.setLocationTerm
		],
		shallow
	)

	return (
		<div
			className="h-content flex flex-col overflow-auto bg-blood absolute top-header z-10 min-w-full md:min-w-max md:w-1/4"
			ref={reference}
		>
			<div className="border-t-2 md:py-4 block md:hidden">
				<div className="pb-3 px-8">
					<label
						htmlFor="search"
						className="block pl-2 text-white text-lg font-cursive sm:text-xl md:pb-2 md:text-2xl md:text-center"
					>
						Search
					</label>
					<div className="flex">
						<span className="bg-white w-8 h-8 flex items-center justify-center">
							<img src="/icons/search.svg" alt="Search Icon" />
						</span>

						<form
							onSubmit={(e) => {
								e.preventDefault()
								setSearchTerm(searchQuery)
							}}
							className="w-full"
						>
							<input
								name="search"
								type="search"
								value={searchQuery}
								className="w-full px-2 h-8"
								placeholder={searchPlaceholder}
								onChange={(e) => setSearchQuery(e.target.value)}
								onFocus={() => setSearchPlaceholder("Press Enter to Search")}
								onBlur={() => setSearchPlaceholder("Search")}
							/>
							<button type="submit" style={{ display: "none" }} />
						</form>
					</div>
				</div>
				<div className="pb-3 px-8">
					<label
						htmlFor="location"
						className="block pl-2 text-white text-lg font-cursive sm:text-xl md:pb-2 md:text-2xl md:text-center"
					>
						Location
					</label>
					<div className="flex">
						<span className="bg-white w-8 h-8 flex items-center justify-center">
							<img src="/icons/location.svg" alt="Search Icon" />
						</span>
						<form
							className="w-full"
							onSubmit={(e) => {
								e.preventDefault()
								setLocationTerm(locationQuery)
							}}
						>
							<input
								name="location"
								type="search"
								value={locationQuery}
								placeholder={locationPlaceholder}
								onChange={(e) => setLocationQuery(e.target.value)}
								onFocus={() => setLocationPlaceholder("Press Enter to Search")}
								onBlur={() => setLocationPlaceholder("Search Location")}
								className="w-full px-2 h-8"
							/>
							<button type="submit" style={{ display: "none" }} />
						</form>
					</div>
				</div>
			</div>

			<div className="border-t-2 h-48 overflow-auto flex-grow flex-shrink-0 md:py-4">
				<div className="pb-3 px-8">
					<label
						htmlFor="sort"
						className="block pl-2 text-white text-lg font-cursive sm:text-xl md:pb-2 md:text-2xl md:text-center"
					>
						Sort by
					</label>
					<select name="sort" className="w-full px-2 h-8 appearance-none">
						<option value="priceInc">Price: Low to High</option>
						<option value="priceDec">Price: High to Low</option>
						<option value="postNew">Most Recent</option>
						<option value="postOld">Oldest First</option>
					</select>
				</div>
				<div className="pb-6 px-10">
					<label
						htmlFor="price"
						className="block text-white text-lg font-cursive sm:text-xl md:pb-2 md:text-2xl md:text-center"
					>
						Price
					</label>
					<Range
						max={1500}
						step={50}
						defaultValue={[min, max]}
						onChange={([min, max]) => setRange({ min, max })}
						marks={{
							[min]: {
								style: { color: "white" },
								label: min === 0 ? "MIN" : `₹${min}`
							},
							[max]: {
								style: { color: "white" },
								label: max === 1500 ? "MAX" : `₹${max}`
							}
						}}
					/>
				</div>
				<div className="pb-3 px-8">
					<label
						htmlFor="filter"
						className="block pl-2 text-white text-lg font-cursive sm:text-xl md:pb-2 md:text-2xl md:text-center"
					>
						Filter
					</label>
					<input name="filter" className="w-full px-2 h-8" />
				</div>
				<div className="pb-3 px-8">
					<label
						htmlFor="filter"
						className="block pl-2 text-white text-lg font-cursive sm:text-xl md:pb-2 md:text-2xl md:text-center"
					>
						Filter
					</label>
					<input name="filter" className="w-full px-2 h-8" />
				</div>
				<div className="pb-3 px-8">
					<label
						htmlFor="filter"
						className="block pl-2 text-white text-lg font-cursive sm:text-xl md:pb-2 md:text-2xl md:text-center"
					>
						Filter
					</label>
					<input name="filter" className="w-full px-2 h-8" />
				</div>
				<div className="pb-3 px-8">
					<label
						htmlFor="filter"
						className="block pl-2 text-white text-lg font-cursive sm:text-xl md:pb-2 md:text-2xl md:text-center"
					>
						Filter
					</label>
					<input name="filter" className="w-full px-2 h-8" />
				</div>
				<div className="pb-3 px-8">
					<label
						htmlFor="filter"
						className="block pl-2 text-white text-lg font-cursive sm:text-xl md:pb-2 md:text-2xl md:text-center"
					>
						Filter
					</label>
					<input name="filter" className="w-full px-2 h-8" />
				</div>
			</div>

			<div className="border-t-2 p-1 text-white text-center text-xs font-thin block md:hidden">
				&copy; {new Date().getFullYear()} Firozi Inc.
			</div>
		</div>
	)
}

export default Menu

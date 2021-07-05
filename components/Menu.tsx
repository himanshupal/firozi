const Menu = (): JSX.Element => {
	return (
		<div className="h-content flex flex-col overflow-auto bg-blood absolute top-header z-10 min-w-full md:min-w-max md:w-1/4">
			<div className="border-t-2 md:py-4 block md:hidden">
				<div className="pb-3 px-8">
					<label
						htmlFor="search"
						className="block pl-2 text-white text-lg font-cursive sm:text-xl md:pb-2 md:text-2xl md:text-center"
					>
						Search
					</label>
					<input name="search" className="w-full px-2 h-8" />
				</div>
				<div className="pb-3 px-8">
					<label
						htmlFor="location"
						className="block pl-2 text-white text-lg font-cursive sm:text-xl md:pb-2 md:text-2xl md:text-center"
					>
						Location
					</label>
					<input name="location" className="w-full px-2 h-8" />
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
					<select name="sort" className="w-full px-2 h-8">
						<option value="priceInc">Price: Low to High</option>
						<option value="priceDec">Price: High to Low</option>
						<option value="postNew">Most Recent</option>
						<option value="postOld">Oldest First</option>
					</select>
				</div>
				<div className="pb-3 px-8">
					<label
						htmlFor="price"
						className="block pl-2 text-white text-lg font-cursive sm:text-xl md:pb-2 md:text-2xl md:text-center"
					>
						Price
					</label>
					<input name="price" className="w-full px-2 h-8" />
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

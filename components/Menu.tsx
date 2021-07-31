import { Range } from "rc-slider"
import { Fragment, useState } from "react"

import shallow from "zustand/shallow"
import userState from "store/user"
import filterState from "store/filter"
import categories from "data/categories"

import "rc-slider/assets/index.css"
import { Category } from "models/Category"
import { gql, useLazyQuery } from "@apollo/client"
import { User } from "models/User"
import { Ad } from "models/Ad"
import { AD_CORE_FIELDS_FRAGMENT } from "queries/ads"
import flatList from "helpers/flatList"

interface CategorySelectorProps {
	list: Array<Category>
	level?: number
	checked?: Array<string>
	updateChecked?: (string) => void
}

const CategoryItem = ({ category, level, checked, updateChecked }) => {
	return (
		<div
			className="w-full h-8 text-white flex items-center"
			style={{
				paddingLeft: `${16 * level}px`,
				fontSize: `${18 - level * 1.5}px`
			}}
		>
			<span className="checkbox__input">
				<input
					id={`category-${category._id}`}
					type="checkbox"
					checked={checked.includes(category._id)}
					onChange={() => updateChecked(category._id)}
				/>

				<span className="checkbox__control">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						aria-hidden="true"
						focusable="false"
					>
						<path
							fill="none"
							stroke="currentColor"
							strokeWidth="3"
							d="M1.73 12.91l6.37 6.37L22.79 4.59"
						/>
					</svg>
				</span>
			</span>

			<label
				className="pl-1.5 whitespace-nowrap flex-grow"
				htmlFor={`category-${category._id}`}
			>
				{category.name}
			</label>
		</div>
	)
}

const CategorySelector = ({
	list,
	level = 0,
	checked,
	updateChecked
}: CategorySelectorProps) => {
	return (
		<div className="flex flex-col">
			{list.map((category) => (
				<Fragment key={`category-${category._id}`}>
					{category.hasOwnProperty("children") ? (
						<Fragment>
							<CategoryItem
								category={category}
								level={level}
								checked={checked}
								updateChecked={updateChecked}
							/>
							<CategorySelector
								list={category.children}
								level={level + 1}
								checked={checked}
								updateChecked={updateChecked}
							/>
						</Fragment>
					) : (
						<CategoryItem
							category={category}
							level={level}
							checked={checked}
							updateChecked={updateChecked}
						/>
					)}
				</Fragment>
			))}
		</div>
	)
}

const Menu = ({ reference }): JSX.Element => {
	const [searchPlaceholder, setSearchPlaceholder] =
		useState<string>("Search Ads")
	const [locationPlaceholder, setLocationPlaceholder] =
		useState<string>("Search Location")

	const userId = userState((state) => state.userId)

	const [
		sort,
		setSort,
		price,
		setPrice,
		searchQuery,
		setSearchQuery,
		locationQuery,
		maxPrice,
		searchTerm,
		locationTerm,
		categoryFilters,
		setLocationQuery,
		setSearchTerm,
		setLocationTerm,
		updateCategoryFilters
	] = filterState(
		(state) => [
			state.sort,
			state.setSort,
			state.price,
			state.setPrice,
			state.search,
			state.setSearch,
			state.location,
			state.maxPrice,
			state.searchTerm,
			state.locationTerm,
			state.categoryFilters,
			state.setLocation,
			state.setSearchTerm,
			state.setLocationTerm,
			state.updateCategoryFilters
		],
		shallow
	)

	const [getAds] = useLazyQuery<{
		user: User
		ads: Array<Ad>
		maxPrice: number
	}>(
		gql`
			${AD_CORE_FIELDS_FRAGMENT}
			query ads(
				$userId: ID
				$searchTerm: String
				$locationTerm: String
				$categories: [String]
				$priceMin: Float
				$priceMax: Float
				$sort: String
			) {
				ads(
					filter: $searchTerm
					location: $locationTerm
					exclude: $categories
					priceMin: $priceMin
					priceMax: $priceMax
					sortBy: $sort
				) {
					...AdCoreFields
					condition
					workingHours
					offlineOnly
					workingPeriod
					salaryPeriod
				}
				user(_id: $userId) {
					_id
					saved
				}
				maxPrice
			}
		`,
		{
			variables: {
				userId: userId || null,
				searchTerm,
				locationTerm,
				categories: flatList(categories)
					.map((x) => x._id)
					.filter((x) => !categoryFilters.includes(x)),
				priceMin: price.min,
				priceMax: price.max,
				sort
			}
		}
	)

	return (
		<div
			className="h-content flex flex-col overflow-auto bg-blood absolute top-header z-10 md:min-w-max sm:w-1/2 md:w-1/4"
			ref={reference}
		>
			<div className="border-t-2 md:py-4 block md:hidden">
				<div className="pb-3 px-8">
					<label
						htmlFor="search"
						className="block pl-2 text-white font-cursive text-2xl md:pb-2 md:text-3xl md:text-center"
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
						className="block pl-2 text-white font-cursive text-2xl md:pb-2 md:text-3xl md:text-center"
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
						className="block pl-2 text-white font-cursive text-2xl md:pb-2 md:text-3xl md:text-center"
					>
						Sort by
					</label>
					<select
						name="sort"
						value={sort}
						className="w-full px-2 h-8 appearance-none"
						onChange={(e) => setSort(e.target.value)}
					>
						<option value="price_Inc">Price: Low to High</option>
						<option value="price_Dec">Price: High to Low</option>
						<option value="published_Inc">Most Recent</option>
						<option value="published_Dec">Oldest First</option>
					</select>
				</div>

				<div className="pb-6 px-10">
					<label
						htmlFor="price"
						className="block text-white font-cursive text-2xl md:pb-2 md:text-3xl md:text-center"
					>
						Price
					</label>
					<Range
						max={maxPrice}
						step={50}
						value={[price.min, price.max]}
						onChange={([min, max]) => setPrice(min, max)}
						marks={{
							[price.min]: {
								style: { color: "white" },
								label: `₹${price.min.toString()}`
							},
							[price.max]: {
								style: { color: "white" },
								label:
									price.max === maxPrice ? "MAX" : `₹${price.max.toString()}`
							}
						}}
					/>
				</div>

				<div className="pb-3 px-8">
					<label
						htmlFor="Categories"
						className="block pl-2 text-white font-cursive text-2xl md:pb-2 md:text-3xl md:text-center pb-2"
					>
						Categories
					</label>

					<CategorySelector
						list={categories}
						checked={categoryFilters}
						updateChecked={updateCategoryFilters}
					/>
				</div>
			</div>

			<div className="py-2 text-white text-center">
				<button
					className="border-2 px-10 py-1 rounded shadow-md hover:bg-gray-200 hover:text-blood hover:border-blue-500 transition"
					// onClick={() => getAds()}
				>
					Apply Filters
				</button>
			</div>

			<div className="border-t-2 p-1 pl-2 text-white text-xs font-thin block">
				&copy; {new Date().getFullYear()} Firozi Inc.
			</div>
		</div>
	)
}

export default Menu

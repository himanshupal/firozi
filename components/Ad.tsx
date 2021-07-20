import Link from "next/link"
import { Ad } from "models/Ad"

const durationShort = (duration: string) => {
	switch (duration) {
		case "Day":
			return "daily"
		case "Week":
			return "weekly"
		case "Month":
			return "PM"
		case "Quarter":
			return "quarterly"
		case "Year":
			return "PA"
		case "Contract":
			return "once"
		default:
			return duration
	}
}

type AdProps = {
	details: Ad
}

const AdCard = ({
	details: {
		title,
		slug,
		images,
		price,
		adtype,
		salaryPeriod,
		condition,
		negotiable,
		description,
		location,
		published,
		workingHours,
		workingPeriod,
		offlineOnly
	}
}: AdProps) => {
	console.log(images)

	return (
		<div className="rounded-xl text-blood w-72 shadow-lg inline-block my-3 mx-3 text-left hover:shadow-2xl transition-all">
			{images?.map(
				(image, index) =>
					index === 0 && (
						<img
							className="w-full object-cover rounded-t-xl"
							src={image}
							alt={`${slug}-image`}
							key={`ad-${index + 1}`}
						/>
					)
			)}
			<Link href={`/${slug}`} passHref>
				<div className="text-3xl font-bold py-1 px-3 cursor-pointer">
					{title}
				</div>
			</Link>
			<div className="flex w-full items-center justify-between bg-gray-300 py-1 px-3">
				<div className="text-2xl font-semibold flex items-center">
					₹ {price}/-
					<span className="text-base pl-2">{durationShort(salaryPeriod)}</span>
				</div>
				<div className="text-right text-xs">
					{condition && <div>{condition}</div>}
					{negotiable && <div>Negotiable</div>}
					{offlineOnly && <div>Offline Only</div>}
					{workingHours && workingPeriod && (
						<div>
							{workingHours} hrs/{workingPeriod.toLowerCase()} required
						</div>
					)}
				</div>
			</div>
			<div className="py-1 px-3 text-sm leading-tight">
				{description?.length > 175
					? description?.slice(0, 175) + "..."
					: description}
			</div>
			<div className="border-t-2 flex items-center justify-between py-1 px-3 text-sm">
				<div className="overflow-ellipsis overflow-x-hidden whitespace-nowrap flex-grow">
					{location}
				</div>
				{published && <div className="whitespace-nowrap pl-2">{published}</div>}
			</div>
		</div>
	)
}

export default AdCard

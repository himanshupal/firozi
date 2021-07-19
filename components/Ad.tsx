import Link from "next/link"
import { Ad } from "models/Ad"

const AdCard = ({
	title,
	slug,
	images,
	price,
	salaryPeriod,
	condition,
	negotiable,
	description,
	location,
	published
}: Ad) => {
	return (
		<div className="rounded-xl text-blood w-72 shadow-lg inline-block my-3 text-left hover:shadow-2xl transition-all">
			{images.map((image, index) => (
				<img
					className="w-full object-cover rounded-t-xl"
					src={image}
					alt={`${slug}-image`}
					key={`ad-${index + 1}`}
				/>
			))}
			<Link href={`/${slug}`} passHref>
				<div className="text-3xl font-bold py-1 px-3 cursor-pointer">
					{title}
				</div>
			</Link>
			<div className="flex w-full items-center justify-between bg-gray-300 py-1 px-3">
				<div className="text-xl font-semibold">
					₹ {price}/- {salaryPeriod}
				</div>
				<div className="text-right text-xs">
					<div>{condition}</div>
					{negotiable && <div>Negotiable</div>}
				</div>
			</div>
			<div className="py-1 px-3 text-sm leading-tight">
				{description.length > 175
					? description.slice(0, 175) + "..."
					: description}
			</div>
			<div className="border-t-2 flex items-center justify-between py-1 px-3">
				<div className="overflow-ellipsis overflow-x-hidden whitespace-nowrap flex-grow">
					{location}
				</div>
				<div className="whitespace-nowrap pl-2">{published}</div>
			</div>
		</div>
	)
}

export default AdCard

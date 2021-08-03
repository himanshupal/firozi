import { Ad } from "models/Ad"
import { useRouter } from "next/router"
import { gql, useMutation } from "@apollo/client"
import { durationShort } from "helpers/duration"

import store from "store"
import shallow from "zustand/shallow"
import { districts } from "data/districts"

type AdProps = {
	userId: string
	ad: Ad
}

const SAVE_AD = gql`
	mutation saveAd($ad: ID!, $user: ID!) {
		saveAd(ad: $ad, user: $user)
	}
`

const UNSAVE_AD = gql`
	mutation unsaveAd($ad: ID!, $user: ID!) {
		unsaveAd(ad: $ad, user: $user)
	}
`

const AdCard = ({ userId, ad }: AdProps) => {
	const router = useRouter()

	const [saved, pushSaved, pullSaved] = store(
		(state) => [state.saved, state.pushSaved, state.pullSaved],
		shallow
	)

	const [saveAd, { loading: savingAd }] = useMutation(SAVE_AD, {
		variables: { ad: ad._id, user: userId },
		update(_, { data: { saveAd } }) {
			if (saveAd) pushSaved(ad._id.toString())
		}
	})
	const [unsaveAd, { loading: unsavingAd }] = useMutation(UNSAVE_AD, {
		variables: { ad: ad._id, user: userId },
		update(_, { data: { unsaveAd } }) {
			if (unsaveAd) pullSaved(ad._id.toString())
		}
	})

	return (
		<div
			className={`rounded-xl text-blood w-72 shadow my-3 mx-3 text-left hover:shadow-lg transition-all relative ${
				router.pathname !== "/" ? `flex flex-col flex-shrink-0` : `inline-block`
			}`}
		>
			{!!userId && (
				<div
					onClick={() =>
						saved?.includes(ad._id.toString()) ? unsaveAd() : saveAd()
					}
					className={`absolute rounded right-2 top-2 p-1 bg-white ${
						savingAd || unsavingAd ? `cursor-wait` : `cursor-pointer`
					}`}
				>
					<img
						width="16"
						height="16"
						src={`/icons/${
							saved?.includes(ad._id.toString()) ? `check` : `save`
						}.svg`}
						alt="Save Icon"
					/>
				</div>
			)}

			<div className="absolute py-0.5 px-1.5 text-xs bg-white text-blood left-2 top-2 rounded cursor-pointer">
				{ad.adtype}
			</div>

			{ad.images?.map(
				(image, index) =>
					index === 0 && (
						<img
							className={
								router.pathname !== "/"
									? `w-full object-cover rounded-t-xl max-h-48`
									: `w-full object-cover rounded-t-xl`
							}
							src={image}
							alt={`${ad.slug}-image`}
							key={`ad-${index + 1}`}
						/>
					)
			)}
			<div
				onClick={() => router.push(`/ad/${ad.slug}`)}
				className="text-3xl font-bold py-1 px-3 cursor-pointer"
			>
				{ad.title}
			</div>
			<div className="flex w-full items-center justify-between bg-gray-300 py-1 px-3">
				<div className="text-2xl font-semibold flex items-center">
					₹ {ad.price}/-
					<span className="text-base pl-2">
						{durationShort(ad.salaryPeriod)}
					</span>
				</div>
				<div className="text-right text-xs">
					{ad.condition && <div>{ad.condition}</div>}
					{ad.negotiable && <div>Negotiable</div>}
					{ad.offlineOnly && <div>Offline Only</div>}
					{ad.workingHours && ad.workingPeriod && (
						<div>
							{ad.workingHours} hrs/{ad.workingPeriod.toLowerCase()} required
						</div>
					)}
				</div>
			</div>
			<div className="py-1 px-3 text-sm leading-tight flex-grow">
				{ad.description?.length > 175
					? ad.description?.slice(0, 175) + "..."
					: ad.description}
			</div>
			<div className="border-t-2 flex items-center justify-between py-1 px-3 text-sm">
				<div className="overflow-ellipsis text-xs overflow-x-hidden whitespace-nowrap flex-grow">
					{
						districts
							.map(
								(x) =>
									x.districts.filter((x) =>
										new RegExp(`^.*${x}.*$`, "i").test(ad.location)
									)[0]
							)
							.filter((x) => x)[0]
					}
				</div>
			</div>
		</div>
	)
}

export default AdCard

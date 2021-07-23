import { Ad } from "models/Ad"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { NextRouter } from "next/router"
import { gql, useMutation } from "@apollo/client"

import store from "store"
import shallow from "zustand/shallow"

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
	userId: string
	router: NextRouter
	loginToggle?: Dispatch<SetStateAction<boolean>>
	details: Ad
	// saved: Array<string>
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

const AdCard = ({
	// saved,
	userId,
	router,
	loginToggle,
	details: {
		_id,
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
	const [saved, pushSaved, pullSaved] = store(
		(state) => [state.saved, state.pushSaved, state.pullSaved],
		shallow
	)

	const [saveAd, { loading: savingAd }] = useMutation(SAVE_AD, {
		variables: { ad: _id, user: userId },
		update(_, { data: { saveAd } }) {
			if (saveAd) pushSaved(_id.toString())
		}
	})
	const [unsaveAd, { loading: unsavingAd }] = useMutation(UNSAVE_AD, {
		variables: { ad: _id, user: userId },
		update(_, { data: { unsaveAd } }) {
			if (unsaveAd) pullSaved(_id.toString())
		}
	})

	return (
		<div className="rounded-xl text-blood w-72 shadow-lg inline-block my-3 mx-3 text-left hover:shadow-2xl transition-all relative">
			{!!userId && (
				<div
					onClick={() =>
						saved?.includes(_id.toString()) ? unsaveAd() : saveAd()
					}
					className={`absolute rounded right-2 top-2 p-1 bg-white ${
						savingAd || unsavingAd ? `cursor-wait` : `cursor-pointer`
					}`}
				>
					<img
						width="16"
						height="16"
						src={`/icons/${
							saved?.includes(_id.toString()) ? `check` : `save`
						}.svg`}
						alt="Save Icon"
					/>
				</div>
			)}

			<div className="absolute py-0.5 px-1.5 text-xs bg-white text-blood left-2 top-2 rounded cursor-pointer">
				{adtype}
			</div>

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
			<div
				onClick={() =>
					!!userId ? router.push(`/ad/${slug}`) : loginToggle((login) => !login)
				}
				className="text-3xl font-bold py-1 px-3 cursor-pointer"
			>
				{title}
			</div>
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

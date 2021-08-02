import { gql } from "@apollo/client"

export const AD_CORE_FIELDS_FRAGMENT = gql`
	fragment AdCoreFields on Ad {
		_id
		slug
		price
		title
		adtype
		category
		location
		negotiable
		description
		images
		createdBy {
			_id
			name
		}
	}
`

export const CREATE_AD = gql`
	mutation createAd(
		$title: String
		$description: String
		$category: String
		$images: [String]
		$price: Float
		$adtype: String
		$usedFor: String
		$condition: String
		$shippingBy: String
		$negotiable: Boolean
		$workingHours: String
		$workingPeriod: String
		$salaryPeriod: String
		$offlineOnly: Boolean
		$location: String
		$createdBy: String
	) {
		createAd(
			title: $title
			description: $description
			category: $category
			images: $images
			adtype: $adtype
			price: $price
			usedFor: $usedFor
			condition: $condition
			shippingBy: $shippingBy
			negotiable: $negotiable
			workingHours: $workingHours
			workingPeriod: $workingPeriod
			salaryPeriod: $salaryPeriod
			offlineOnly: $offlineOnly
			location: $location
			createdBy: $createdBy
		)
	}
`

export const UPDATE_AD = gql`
	${AD_CORE_FIELDS_FRAGMENT}
	mutation updateAd(
		$slug: String
		$title: String
		$description: String
		$category: String
		$images: [String]
		$price: Float
		$usedFor: String
		$condition: String
		$shippingBy: String
		$negotiable: Boolean
		$workingHours: String
		$workingPeriod: String
		$salaryPeriod: String
		$offlineOnly: Boolean
		$location: String
	) {
		updateAd(
			slug: $slug
			title: $title
			description: $description
			category: $category
			images: $images
			price: $price
			usedFor: $usedFor
			condition: $condition
			shippingBy: $shippingBy
			negotiable: $negotiable
			workingHours: $workingHours
			workingPeriod: $workingPeriod
			salaryPeriod: $salaryPeriod
			offlineOnly: $offlineOnly
			location: $location
		) {
			...AdCoreFields
			salaryPeriod
			offlineOnly
			workingHours
			workingPeriod
			usedFor
			condition
			shippingBy
			published
		}
	}
`

export const USER_ADS = gql`
	${AD_CORE_FIELDS_FRAGMENT}
	query getUserAds($id: String) {
		user(_id: $id) {
			_id
			ads {
				...AdCoreFields
				createdAt
				workingHours
				offlineOnly
				workingPeriod
				salaryPeriod
			}
		}
	}
`

export const AD = gql`
	${AD_CORE_FIELDS_FRAGMENT}
	query ad($slug: String) {
		ad(slug: $slug) {
			...AdCoreFields
			salaryPeriod
			workingPeriod
			offlineOnly
			workingHours
			usedFor
			condition
			shippingBy
			published
			createdBy {
				_id
				name
				avatar
				contact
				email
				hidden
				ads {
					...AdCoreFields
				}
			}
		}
		similar(slug: $slug) {
			...AdCoreFields
		}
	}
`

export const EDIT_AD = gql`
	${AD_CORE_FIELDS_FRAGMENT}
	query ad($slug: String) {
		ad(slug: $slug) {
			...AdCoreFields
			salaryPeriod
			offlineOnly
			workingHours
			workingPeriod
			usedFor
			condition
			shippingBy
			published
		}
	}
`

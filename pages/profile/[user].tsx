import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Keyboard, Navigation, Pagination } from "swiper"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"

const User = (): JSX.Element => {
	const {
		query: { user }
	} = useRouter()

	SwiperCore.use([Keyboard, Pagination, Navigation])

	const [session, loading] = useSession()

	if (loading) return <div>Loading...</div>

	return (
		<Swiper
			className="w-full h-full"
			keyboard
			pagination={{
				dynamicBullets: true,
				clickable: true
			}}
			navigation
			hashNavigation={{ watchState: true }}
		>
			<SwiperSlide
				className="flex flex-col overflow-auto px-14"
				data-hash="about"
			>
				<div className="text-5xl font-bold py-2">About Me</div>
				{session?.user?.name}

				<div className="text-3xl">
					<Link href="/profile/edit">Edit profile</Link>
				</div>
			</SwiperSlide>
			<SwiperSlide
				className="flex flex-col overflow-auto px-14"
				data-hash="ads"
			>
				<div className="text-5xl font-bold py-2">My Ads</div>
			</SwiperSlide>
			<SwiperSlide
				className="flex flex-col overflow-auto px-14"
				data-hash="saved"
			>
				<div className="text-5xl font-bold py-2">Saved Ads</div>
			</SwiperSlide>
		</Swiper>
	)
}

export default User

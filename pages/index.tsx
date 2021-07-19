import Head from "next/head"
import Link from "next/link"
import { Fragment } from "react"

import Ad from "components/Ad"

const Home = (): JSX.Element => {
	const ads = [
		{
			title: "Washing Machine",
			price: 3500,
			adtype: "Product",
			condition: "New",
			slug: "washing-machine",
			negotiable: true,
			images: ["https://picsum.photos/300/350"],
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, at natus aliquam sint exercitationem minus pariatur ab quae modi voluptatibus quibusdam? Est sequi placeat nostrum beatae quidem voluptatum corporis dolor, modi sint laudantium quam a nam hic minus dolorem repellendus odio sunt, sed eveniet! Doloribus nisi dicta repudiandae sint magni modi ad, earum eius minima ab amet neque quod ipsum iure praesentium qui.",
			location: "Bareilly"
		},
		{
			title: "Refridgerator",
			price: 7400,
			adtype: "Product",
			condition: "Used",
			slug: "refridgerator",
			negotiable: false,
			images: ["https://picsum.photos/300/500"],
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, at natus aliquam sint exercitationem minus pariatur ab quae modi voluptatibus quibusdam? Est sequi placeat nostrum beatae quidem voluptatum corporis dolor, modi sint laudantium quam a nam hic minus dolorem repellendus odio sunt, sed eveniet! Doloribus nisi dicta repudiandae sint magni modi ad, earum eius minima ab amet neque quod ipsum iure praesentium qui.",
			location: "Pilibhit"
		},
		{
			title: "Yu Yuphoria for sale",
			price: 6412,
			adtype: "Product",
			condition: "Used",
			slug: "yu-yuphoria-for-sale",
			negotiable: true,
			images: ["https://picsum.photos/300/610"],
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, at natus aliquam sint exercitationem minus pariatur ab quae modi voluptatibus quibusdam? Est sequi placeat nostrum beatae quidem voluptatum corporis dolor, modi sint laudantium quam a nam hic minus dolorem repellendus odio sunt, sed eveniet! Doloribus nisi dicta repudiandae sint magni modi ad, earum eius minima ab amet neque quod ipsum iure praesentium qui.",
			location: "Lal fatak"
		},
		{
			title: "Micromax Canvas",
			price: 3548,
			adtype: "Product",
			condition: "Used",
			slug: "micromax-canvas",
			negotiable: false,
			images: ["https://picsum.photos/300/270"],
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, at natus aliquam sint exercitationem minus pariatur ab quae modi voluptatibus quibusdam? Est sequi placeat nostrum beatae quidem voluptatum corporis dolor, modi sint laudantium quam a nam hic minus dolorem repellendus odio sunt, sed eveniet! Doloribus nisi dicta repudiandae sint magni modi ad, earum eius minima ab amet neque quod ipsum iure praesentium qui.",
			location: "Qila"
		},
		{
			title: "Bicycle for Sale",
			price: 1250,
			adtype: "Product",
			condition: "Used",
			slug: "bicycle-for-sale",
			negotiable: true,
			images: ["https://picsum.photos/300/300"],
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, at natus aliquam sint exercitationem minus pariatur ab quae modi voluptatibus quibusdam? Est sequi placeat nostrum beatae quidem voluptatum corporis dolor, modi sint laudantium quam a nam hic minus dolorem repellendus odio sunt, sed eveniet! Doloribus nisi dicta repudiandae sint magni modi ad, earum eius minima ab amet neque quod ipsum iure praesentium qui.",
			location: "Delapeer"
		},
		{
			title: "Chemistry Sample Questions",
			price: 270,
			adtype: "Product",
			condition: "Used",
			slug: "chemistry-sample-questions",
			negotiable: true,
			images: ["https://picsum.photos/300/410"],
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, at natus aliquam sint exercitationem minus pariatur ab quae modi voluptatibus quibusdam? Est sequi placeat nostrum beatae quidem voluptatum corporis dolor, modi sint laudantium quam a nam hic minus dolorem repellendus odio sunt, sed eveniet! Doloribus nisi dicta repudiandae sint magni modi ad, earum eius minima ab amet neque quod ipsum iure praesentium qui.",
			location: "Hardoi"
		},
		{
			title: "Micromax Canvas",
			price: 3548,
			adtype: "Product",
			condition: "Used",
			slug: "micromax-canvas",
			negotiable: false,
			images: ["https://picsum.photos/300/270"],
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, at natus aliquam sint exercitationem minus pariatur ab quae modi voluptatibus quibusdam? Est sequi placeat nostrum beatae quidem voluptatum corporis dolor, modi sint laudantium quam a nam hic minus dolorem repellendus odio sunt, sed eveniet! Doloribus nisi dicta repudiandae sint magni modi ad, earum eius minima ab amet neque quod ipsum iure praesentium qui.",
			location: "Qila"
		},
		{
			title: "Refridgerator",
			price: 7400,
			adtype: "Product",
			condition: "Used",
			slug: "refridgerator",
			negotiable: false,
			images: ["https://picsum.photos/300/500"],
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, at natus aliquam sint exercitationem minus pariatur ab quae modi voluptatibus quibusdam? Est sequi placeat nostrum beatae quidem voluptatum corporis dolor, modi sint laudantium quam a nam hic minus dolorem repellendus odio sunt, sed eveniet! Doloribus nisi dicta repudiandae sint magni modi ad, earum eius minima ab amet neque quod ipsum iure praesentium qui.",
			location: "Pilibhit"
		}
	]

	return (
		<Fragment>
			<Head>
				<title>Firozi | Ads</title>
			</Head>

			<Link href="/ad/create" passHref>
				<button className="bg-blood p-2 absolute bottom-6 right-0 text-center text-sm text-white">
					<img
						width="24"
						height="24"
						className="inline-block"
						src="/icons/plus-lg.svg"
						alt="Icon Plus"
					/>
					<div>New Ad</div>
				</button>
			</Link>

			{/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-4 p-4"> */}
			<div className="bricks p-4 text-center gap-4">
				{ads.map((ad, index) => (
					<Ad
						title={ad.title}
						price={ad.price}
						adtype={ad.adtype}
						condition={ad.condition}
						slug={ad.slug}
						negotiable={ad.negotiable}
						images={ad.images}
						description={ad.description}
						location={ad.location}
						key={`ad-${index + 1}`}
					/>
				))}
			</div>
		</Fragment>
	)
}
export default Home

import Flicking from "@egjs/react-flicking"
import "@egjs/react-flicking/dist/flicking.css"
import { useEffect, useState } from "react"

const Slider = () => {
	const [images, setImages] = useState<Array<string>>([])

	const getImage = (i): string => {
		return `https://picsum.photos/350/250?grayscale&random=${i}`
	}

	useEffect(() => {
		for (let i = 1; i <= 10; i++) {
			const imgPath = getImage(i)
			setImages([...images, imgPath])
		}
	}, [])

	return (
		<div className="slider">
			<Flicking
				bounce="200"
				align="prev"
				circular={true}
				onMoveEnd={(e) => {
					console.log(e)
				}}
			>
				{images.map((image, i) => (
					<div className="slider__item" key={i}>
						<img className="slider__item--image" src={image} />
						<span
							className="slider__item--remove"
							onClick={() => setImages(images.filter((x) => x !== image))}
						>
							❌
						</span>

						{/* <img
						key={i}
						src={`/img${i + 1}.jpg`}
						className="slider__item--image"
					/> */}
					</div>
				))}
			</Flicking>
		</div>
	)
}

export default Slider

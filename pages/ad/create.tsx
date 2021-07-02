import Aside from "../../components/Aside"
import Article from "../../components/Article"

import Slider from "../../components/Slider"

import Input from "../../components/Input"

const CreateAd = (): JSX.Element => {
	return (
		<>
			<Aside />
			<Article className="flex flex-column align-items-center">
				<Slider />

				<div className="fields flex gap-3">
					<Input name="name" label="Your Name" />
					<Input name="name" label="Username" disabled />
				</div>
				<Input name="name" label="Old Password" type="password" />
				<Input name="name" label="New Password" type="password" />
				<Input name="name" label="Confirm New Password" />
			</Article>
		</>
	)
}

export default CreateAd

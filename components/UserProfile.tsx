import { User } from "models/User"

interface UserProfile {
	userDetails: User
}

const fields: Array<keyof User> = [
	"name",
	"email",
	"hidden",
	"contact",
	"location"
]

const UserProfile = ({ userDetails }: UserProfile): JSX.Element => {
	return (
		<>
			{userDetails["avatar"] && (
				<img
					className="w-44 h-44 rounded-full object-cover"
					src={userDetails["avatar"]}
					alt="User Avatar"
				/>
			)}

			<div className="flex flex-col gap-4 py-6">
				{Object.keys(userDetails)
					.filter((x: keyof User) => fields.includes(x))
					.map((key, index) => (
						<div
							key={index}
							className="flex flex-col sm:flex-row gap-5 sm:items-center"
						>
							<div className="text-white text-xs font-thin bg-blood px-4 py-1 w-20 text-center rounded capitalize">
								{key}
							</div>
							<div className="text-blood font-semibold">
								{typeof userDetails[key] === "boolean"
									? userDetails[key]
										? "Yes"
										: "No"
									: userDetails[key] || "-"}
							</div>
						</div>
					))}
			</div>
		</>
	)
}

export default UserProfile

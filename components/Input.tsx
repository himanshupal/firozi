import { FC, InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string
	label?: string
	type?: string
}

const Input: FC<InputProps> = ({ name, label, type = "text", ...rest }) => {
	return (
		<div className="py-3 px-8">
			{label && (
				<label
					htmlFor={name}
					className="block pl-2 text-white text-lg font-cursive"
				>
					{label}
				</label>
			)}
			<input name={name} className="w-full px-2 h-8" type={type} {...rest} />
		</div>
	)
}

export default Input

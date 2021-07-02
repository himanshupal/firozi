import { FC, InputHTMLAttributes, useState } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string
	label?: string
	type?: string
}

const Input: FC<InputProps> = ({ name, label, type = "text", ...rest }) => {
	const [focus, setFocus] = useState<Boolean>(false)

	const toggleOutline = () => setFocus((focus) => !focus)

	return (
		<div
			className={focus ? "field field--focused" : "field"}
			onFocus={toggleOutline}
			onBlur={toggleOutline}
		>
			{label && (
				<label htmlFor={name} className="field__label">
					{label}
				</label>
			)}
			<input
				name={name}
				className={`field__input field__${type}`}
				type={type}
				{...rest}
			/>
		</div>
	)
}

export default Input

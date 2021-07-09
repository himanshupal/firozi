import { Dispatch, ReactNode, SetStateAction } from "react"

interface ModalProps {
	title?: string
	toggle: Dispatch<SetStateAction<Boolean>>
	children: ReactNode
}

const Modal = ({ title, toggle, children }: ModalProps): JSX.Element => {
	return (
		<div className="fixed top-0 h-screen w-screen bg-blood bg-opacity-90 z-50 flex flex-col items-center">
			<img
				className="absolute top-2.5 right-3 cursor-pointer"
				src="/icons/cancel.svg"
				onClick={() => toggle((state) => !state)}
			/>
			<div className="h-full flex flex-col justify-center">
				{title && (
					<div className="text-4xl text-white py-2 pl-3 pb-3 font-cursive">
						{title}
					</div>
				)}
				<div className="bg-white rounded-lg p-3">{children}</div>
			</div>
		</div>
	)
}

export default Modal

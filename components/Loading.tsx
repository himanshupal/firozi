const Loading = ({ message = "Please Wait" }): JSX.Element => {
	return (
		<div className="w-full h-screen absolute top-0 left-0 flex flex-col items-center justify-center bg-black opacity-95 z-50 text-white">
			<div className="w-7 h-7 bg-white rounded-full transform animate-ping" />
			<div className="text-3xl mt-6 transform animate-bounce">{message}</div>
		</div>
	)
}

export default Loading

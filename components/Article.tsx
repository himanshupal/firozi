import React, { HTMLAttributes } from "react"

interface ArticleProps extends HTMLAttributes<HTMLDivElement> {
	children?: JSX.Element | Array<JSX.Element>
}

const Article: React.FC<ArticleProps> = ({
	children,
	className
}): JSX.Element => {
	return (
		<article className={`panel panel--main bg-blue ${className}`}>
			{children}
		</article>
	)
}

export default Article

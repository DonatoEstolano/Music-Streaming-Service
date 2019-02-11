import React from "react"

/*
Grows to a percentage of the parent element's width
based on props.percentage's value (0,100)
 */
const Filler = (props) => {
	return (
		<div
		className="filler"
		style={{width: `${props.percentage}%`}}
		/>
	)
}
export default Filler
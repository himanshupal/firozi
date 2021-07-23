export const durationShort = (duration: string) => {
	switch (duration) {
		case "Day":
			return "daily"
		case "Week":
			return "weekly"
		case "Month":
			return "PM"
		case "Quarter":
			return "quarterly"
		case "Year":
			return "PA"
		case "Contract":
			return "once"
		default:
			return duration
	}
}

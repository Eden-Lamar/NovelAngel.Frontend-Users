const getCountryFlagCode = (country) => {
	const flagMap = {
		'Chinese': 'cn',
		'Japanese': 'jp',
		'South Korean': 'kr'
	};
	return flagMap[country] || 'un'; // fallback to UN flag if country not found
};

// Format date
const formatDate = (date) => {
	const now = new Date();
	const commentDate = new Date(date);
	const diffMs = now - commentDate;
	const diffMins = Math.floor(diffMs / 60000);
	const diffHours = Math.floor(diffMs / 3600000);
	const diffDays = Math.floor(diffMs / 86400000);

	if (diffMins < 1) return "Just now";
	if (diffMins < 60) return `${diffMins}m ago`;
	if (diffHours < 24) return `${diffHours}h ago`;
	if (diffDays < 7) return `${diffDays}d ago`;

	return commentDate.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: commentDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
	});
};


export { getCountryFlagCode, formatDate };
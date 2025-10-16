const getCountryFlagCode = (country) => {
	const flagMap = {
		'Chinese': 'cn',
		'Japanese': 'jp',
		'South Korean': 'kr'
	};
	return flagMap[country] || 'un'; // fallback to UN flag if country not found
};


export { getCountryFlagCode };
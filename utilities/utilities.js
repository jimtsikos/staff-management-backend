const handleError = (response, error) => {
    console.error("Code: " + error.code + " | Message: " + capitalizeFirstLetter(error.message));
	response.status(500).json({
		"errors": [
			{
				"code": error.code,
				"message": capitalizeFirstLetter(error.message)
			}
		]
	});
}

const capitalizeFirstLetter = (s) => {
	return s !== undefined && s !== null ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}

module.exports = {
    handleError
}
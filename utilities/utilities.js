const handleError = (response, error) => {
    console.error(error.message);
	response.status(500).json({
		"errors": [
			{
				"msg": error.message
			}
		]
	});
}

module.exports = {
    handleError
}
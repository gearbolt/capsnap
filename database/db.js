let init = function(db){
	// Create the tables we need to store tokens
	db.schema.createTableIfNotExists('tokens', function (table) {
		table.increments()
		table.string('value')
		table.string('timestamp')
    table.string('page')
    table.string('sitekey')
		table.string('source')
	}).then(() => {})

}

module.exports = init

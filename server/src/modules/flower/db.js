const {
	CollectionDefinition,
	Schema,
	Schemas,
	Permission,
	PermissionTypes,
	DatabaseTrigger,
} = require('@modular-rest/server')

module.exports = [
	new CollectionDefinition({
		db: 'flower',
		collection: 'wildflowers',
		schema: new Schema({
			name: String,
			description: String,
			image: Schemas.file,
		}),
		permissions: [
			new Permission({
				type: PermissionTypes.god_access,
				read: true,
				write: true,
			}),
			new Permission({
				type: PermissionTypes.anonymous_access,
				read: true,
			}),
		],
		trigger: [
			new DatabaseTrigger('insert', (query, _queryResult) => {
				console.log('inserted', query)
			})
		]
	}),
]
/**
 * Application level config. Change the config if you require.
 */

module.exports = {
		development: {
			db: 'mongodb://localhost:27017/family',
			app: {
				name: 'familyApp'
			},
			facebook : {
				clientID : '1442886509267852',
				clientSecret : 'b29377710ccc86aa38abe67c83aa6a8e',
				callbackURL : 'http://127.0.0.1:3000/auth/facebook/callback'
			}
		},
	  	production: {
	    	db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
			app: {
				name: 'familyApp'
			},
			facebook: {
				clientID: "clientID",
				clientSecret: "clientSecret",
				callbackURL: "{{production callbackURL}}"
			}
	 	}
	}

const config = {
	"gatsby": {
		"pathPrefix": "/",
		"siteUrl": "http://z.zdns.cn",
		"gaTrackingId": null
	},
	"header": {
		"logo": "/logo.jpg",
		"logoLink": "http://z.zdns.cn",
		"title": "Zcloud 文档中心",
		"githubUrl": "",
		"helpUrl": "",
		"tweetText": "",
		"links": [
			{ "text": "", "link": ""}
		],
		"search": {
			"enabled": false,
			"indexName": "",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
    navOrder: [
      [
        'product',
        'introduction',
        'nouns',
        'functions',
        'scenarios',
      ],
      [
        'install',
        'base',
        'zcloud',
      ],
      [
        'quickstart',
        'mysql',
        'wordpress',
      ]
    ],
		"links": [
		],
		"frontline": true,
		"ignoreIndex": true,
	},
	"siteMetadata": {
		"title": "Zcloud 文档中心",
		"description": "Documentation built with mdx. Powering zc.zdns.cn ",
		"ogImage": null,
		"docsLocation": "https://github.com/zdnscloud/docs/tree/master/content",
		"favicon": "/logo.svg"
	},
};

module.exports = config;

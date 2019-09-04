const config = {
	"gatsby": {
		"pathPrefix": "/",
		"siteUrl": "https://zc.zdns.cn",
		"gaTrackingId": null
	},
	"header": {
		"logo": "/logo.jpg",
		"logoLink": "https://zc.zdns.cn",
		"title": "Zcloud 文档中心",
		"githubUrl": "https://github.com/zdnscloud/docs",
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
        'install',
      ],
      [
        'quickstart',
        'quickstart',
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

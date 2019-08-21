const config = {
	"gatsby": {
		"pathPrefix": "/",
		"siteUrl": "https://zc.zdns.cn",
		"gaTrackingId": null
	},
	"header": {
		"logo": "/logo.jpg",
		"logoLink": "https://zc.zdns.cn",
		"title": "ZCloud 文档中心",
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
		"forcedNavOrder": [
      "/product",
      "/install",
      "/quickstart",
      "/companion",
      "/companion2",
      "/api",
      "/question",
      "/release",
		],
		"links": [
		],
		"frontline": true,
		"ignoreIndex": false,
	},
	"siteMetadata": {
		"title": "ZCloud 文档中心",
		"description": "Documentation built with mdx. Powering zc.zdns.cn ",
		"ogImage": null,
		"docsLocation": "https://github.com/zdnscloud/docs/tree/master/content",
		"favicon": "/logo.svg"
	},
};

module.exports = config;

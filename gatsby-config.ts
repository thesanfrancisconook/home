import type { GatsbyConfig } from "gatsby"
require('dotenv').config()

const config: GatsbyConfig = {
    pathPrefix: "/thesfnook",  // Add this line
    siteMetadata: {
      title: `SF Nook`,
      description: `SF Nook - Community Art Space`,
      siteUrl: `https://thesfnook.com`  // Update this to your domain
    },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
        resolve: 'gatsby-plugin-env-variables',
        options: {
            allowList: ['AIRTABLE_PAT', 'AIRTABLE_BASE_ID']
          }
    },
  ]
}

export default config
import React from "react";
import {StaticQuery, graphql} from "gatsby";
import Link from '../link';

const Header = () => (
  <StaticQuery
    query={
      graphql`
        query sidebarTitleQuery {
          site {
            siteMetadata {
              headerTitle
              logo {
                link
                image
              }
            }
          }
        }
        `}
    render={(data) => {
      const {
        site: {
          siteMetadata: {
            headerTitle,
            logo,
          }
        }
      } = data;
      const finalLogoLink = logo.link !== '' ? logo.link : '/';
      return (
        <div className={'navBarWrapper'}>
          <nav className={'navbar navbar-default navBarDefault'}>
            <div className={'navbar-header navBarHeader'}>
              <Link to={finalLogoLink} className={'navbar-brand navBarBrand'}>
                <img className={'img-responsive'} src={logo.image} alt={'logo'} />
                <div className={"headerTitle"} dangerouslySetInnerHTML={{__html: headerTitle}} />
              </Link>
            </div>
          </nav>
        </div>
      );
    }}
  />
);

export default Header;

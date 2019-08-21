import React from 'react';
import './components/styles.css';

const CommunityAuthor = ({name, imageUrl, twitterUrl, githubUrl, description}) => {
    return(
        <>
        	<h2 className="communitySection">About the community author</h2>
        	<hr className="separator" />
        	<div className="authorSection">
        		<div className="authorImg">
        			<img src={imageUrl} />
        		</div>
        		<div className="authorDetails">
	        		<div className="authorName">
	        			<strong>{name}</strong>
	        		</div>
	        		<div className="authorDesc">
                {description}
	        		</div>
        		</div>
        	</div>
        	<hr className="separator" />
        </>
    )
};

export default CommunityAuthor;

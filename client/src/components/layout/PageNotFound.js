import React,{Fragment} from 'react'
const PageNotfound = props => {
    return (
        <Fragment>
            <h1 className="x-large text-primary">
                <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>Page Not Found 
            </h1>
            <p className="large">Sorry, this page is not exist</p>
        </Fragment>
    )
}
export default PageNotfound

import "./notFound.css"
const NotFound=()=>{
    return(
        <div className="not-found-container">
            <img src='https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png'/>
            <div className="text">
            <h1>Page Not Found</h1>
            <p>We are sorry, the page you requested could not be found.</p>
            </div>
        </div>
    )
}
export default NotFound
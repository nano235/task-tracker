import {Link} from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='container not-found-container'>
            <div className="not-found">
                <h2>Page Not Found</h2>
                <h4>Oh my!!!</h4>
                <h4>There is no page like this</h4>
                <Link to="/" className='btn go-home'>Go To Home</Link>
            </div>
        </div>
    )
}

export default NotFound
import PropTypes from 'prop-types'
import Button from './Button'
import {useLocation} from 'react-router-dom'

const Header = ({title, onAdd, showTask}) => {
    const location = useLocation()
    return (
        <header className='header' onClick = {onAdd}>
            <h1>{title}</h1>
            {location.pathname === '/' && (<Button 
            text={showTask ? 'Close' : 'Add'} 
            />)}
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker"
}

Header.propTypes = {
    title: PropTypes.string
}

export default Header

import PropTypes from 'prop-types'

function Button({text, onClick}) {
    return (
        <button className='btn'>
            {text}
        </button>
    )
}

Button.defaultProps = {
    text: "Add"
}

Button.propTypes = {
    text: PropTypes.string
}

export default Button

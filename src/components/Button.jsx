
import PropTypes from 'prop-types';

const Button = ({btnName,handleClick,type = "button"}) => {
  return (
    <button type={type} className="btn my-3 rounded-full bg-[#5c5470]  mb-4" onClick={handleClick}>{btnName}</button>
  )
}



Button.propTypes = {
  btnName: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export default Button

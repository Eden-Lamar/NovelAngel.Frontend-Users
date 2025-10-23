import { startCase } from 'lodash';
import {Alert} from "@heroui/alert";
import 'animate.css';

const AlertMessage = ({message, color = "danger", duration = 10000, onClose }) => {
	if (!message) return null;

  // Automatically clear after duration if onClose provided
  if (onClose && duration > 0) {
    setTimeout(() => onClose(), duration);
  }

		return(
			<div className="fixed top-20 left-1/2 -translate-x-1/2 max-w-[90vw] lg:max-w-[60vw] z-50 animate__animated animate__fadeInDown">
				<Alert
					hideIconWrapper
					color={color}
					variant="faded"
					radius="full"
					title={startCase(message)}
				/>
    </div>
		)
}

export default AlertMessage;
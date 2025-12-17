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
			<div className="fixed top-20 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none animate__animated animate__fadeInDown">
				<div className="w-full max-w-2xl pointer-events-auto">
				<Alert
					hideIconWrapper
					color={color}
					variant="solid"
					radius="lg"
					title={startCase(message)}
				/>
				</div>
			</div>
		)
}

export default AlertMessage;
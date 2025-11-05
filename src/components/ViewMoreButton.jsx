import { Link } from "@heroui/link";
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const ViewMoreButton = ({ category, to, text = "View More" }) => {
	const navigate = useNavigate();
	
	// Determine the destination
	const destination = to || `/novels?category=${category}`;

  return (
    <Link
			onClick={() => navigate(destination)}
			underline="hover"
			className="flex items-center cursor-pointer"
		>
			<span className="text-sm">{text}</span> <MdOutlineKeyboardArrowRight className="text-lg"/>
    </Link>
  );
};

export default ViewMoreButton
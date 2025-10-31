import { Link } from "@heroui/link";
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";

const ViewMoreButton = ({ category }) => {
	const navigate = useNavigate();
  return (
    <Link
			onClick={() => navigate(`/novels?category=${category}`)}
			underline="hover"
			className="text-sm flex items-center cursor-pointer"
		>
			<span>View More</span> <MdKeyboardArrowRight className=""/>
    </Link>
  );
};

export default ViewMoreButton
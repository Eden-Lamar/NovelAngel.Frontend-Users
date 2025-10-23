// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import 'animate.css';

function PaymentSuccess() {
    const navigate = useNavigate();
		
    // const [searchParams] = useSearchParams();
    // const [countdown, setCountdown] = useState(10);
    
    // const status = searchParams.get('status');
    // const txRef = searchParams.get('tx_ref');
    // const transactionId = searchParams.get('transaction_id');

    // Countdown timer for auto-redirect
    // useEffect(() => {
    //     if (countdown > 0) {
    //         const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    //         return () => clearTimeout(timer);
    //     } else {
    //         navigate('/admin/');
    //     }
    // }, [countdown, navigate]);
		

    const handleGoToHome = () => {
        if (window.history.state && window.history.state.idx > 0) {
						navigate(-1);
				} else {
						navigate("/");
				};
    };

    return (
        <div className="bg-[#1a1b23] h-screen flex items-center justify-center p-4">
            <div className="w-md">
                {/* Success Card */}
                <div className="card border border-blue-500  p-8  animate__animated animate__zoomIn">
                    
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            {/* Pulsing background circle */}
                            {/* <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-20"/> */}
                            {/* Main icon */}
                            <IoShieldCheckmarkOutline className="text-cyan-500 text-8xl relative z-10 animate__animated animate__bounceIn" />
                        </div>
                    </div>

                    {/* Success Message */}
                    <div className="text-center mb-1">
                        <h1 className="font-vibes text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-blue-500 mb-3 animate__animated animate__fadeInUp py-1">
                            Payment Successful
                        </h1>
                        <p className="text-gray-300 text-lg mb-2 animate__animated animate__fadeInUp animate__delay-1s">
                            Your coins have been credited to your account
                        </p>
                        
                    </div>

                    {/* Transaction Details */}
                    {/* {(txRef || transactionId) && (
                        <div className="bg-gray-700/30 rounded-lg p-4 mb-6 border border-gray-600 animate__animated animate__fadeInUp animate__delay-3s">
                            <h3 className="text-sm font-semibold text-gray-400 mb-2">Transaction Details</h3>
                            {txRef && (
                                <p className="text-xs text-gray-300 mb-1">
                                    <span className="text-gray-500">Reference:</span> {txRef}
                                </p>
                            )}
                            {transactionId && (
                                <p className="text-xs text-gray-300">
                                    <span className="text-gray-500">Transaction ID:</span> {transactionId}
                                </p>
                            )}
                            {status && (
                                <p className="text-xs text-gray-300 mt-1">
                                    <span className="text-gray-500">Status:</span>{' '}
                                    <span className="text-green-400 font-semibold uppercase">{status}</span>
                                </p>
                            )}
                        </div>
                    )} */}

                    {/* Divider */}
                    <div className="divider my-0"/>

                    {/* Auto-redirect notice */}
                    {/* <div className="text-center my-2">
                        <p className="text-gray-400 text-sm">
                            Redirecting to dashboard in{' '}
                            <span className="text-[#ffd700] font-bold text-base">{countdown}</span> seconds...
                        </p>
                    </div> */}

                    {/* Dashboard Button */}
										<div className="flex justify-center mt-2">
											<Button
													onClick={handleGoToHome}
													color="primary"
													variant="ghost"
													className="w-full"
											>
													<p>Go to Home</p>
											</Button>
										</div>

                    {/* Additional Info */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            Thank you for your purchase! You can now unlock premium chapters.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PaymentSuccess;
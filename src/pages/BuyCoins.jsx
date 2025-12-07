import { useState, useEffect } from "react";
import api from '../api/axiosInstance';
import { FaCoins, FaGift, FaCrown, FaStar } from "react-icons/fa";
import { PiCoinsFill, PiShootingStarDuotone } from "react-icons/pi";
import { GiCutDiamond } from "react-icons/gi";
import { GiTwoCoins } from "react-icons/gi";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { useAuth } from "../context/useAuth";
import AlertMessage from "../components/AlertMessage";

const COIN_PLANS = [
    { baseCoins: 100, bonus: 0, price: 1.00, popular: false },
    { baseCoins: 300, bonus: 0, price: 2.99, popular: false },
    { baseCoins: 500, bonus: 0, price: 4.99, popular: false },
    { baseCoins: 1000, bonus: 50, price: 9.99, popular: true },
    { baseCoins: 2000, bonus: 200, price: 19.99, popular: false },
    { baseCoins: 5000, bonus: 1750, price: 49.99, popular: false },
    { baseCoins: 10000, bonus: 4500, price: 99.99, popular: false },
];

function BuyCoins() {
    const { auth, isAuthenticated } = useAuth();
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [purchaseLoading, setPurchaseLoading] = useState(null);
    const [error, setError] = useState(null);
    const [userCoinBalance, setUserCoinBalance] = useState(null);

    // Fetch user profile to get current coin balance
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            if (!auth?.token) return;
            
            setIsProfileLoading(true);
            try {
                const profileResponse = await api.get('/user/profile');
                
                if (isMounted) {
                    setUserCoinBalance(profileResponse.data.data.coinBalance);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    const errorMessage = err.response?.data?.message || "Failed to fetch coin balance";
                    setError(errorMessage);
                    console.error("Error fetching data:", errorMessage);
                }
            } finally {
                if (isMounted) {
                    setIsProfileLoading(false);
                }
            }
        };
        fetchData();
        return () => {
            isMounted = false;
        };
    }, [auth?.token]);

    const handlePurchase = async (baseCoins) => {
        if (!auth?.token) {
            setError("Please login to purchase coins");
            return;
        }
        
        setPurchaseLoading(baseCoins);
        setError(null);

        try {
            const response = await api.post(
                "/payments/buy-coins",
                { coins: baseCoins },
                // {
                //     headers: { Authorization: `Bearer ${auth?.token}` }
                // }
            );

            if (response.data.link) {
                window.location.href = response.data.link;
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to initiate purchase");
        } finally {
            setPurchaseLoading(null);
        }
    };

    const getBadgeColor = (plan) => {
        if (plan.baseCoins >= 10000) return "secondary";
        if (plan.baseCoins >= 5000) return "warning";
        if (plan.baseCoins >= 1000) return "primary";
        return "success";
    };

    const getCardIcon = (plan) => {
        if (plan.baseCoins >= 10000) return <GiCutDiamond className="text-5xl text-purple-500" />;
        if (plan.baseCoins >= 5000) return <FaCrown className="text-5xl text-yellow-500" />;
        if (plan.baseCoins >= 1000) return <PiShootingStarDuotone className="text-5xl text-cyan-500" />;
        return <PiCoinsFill className="text-5xl text-gold" />;
    };

    return (
        <div className="container mx-auto px-2 md:px-10 py-8">
            {/* Error Alert */}
            {error && (
							<AlertMessage message={error} onClose={() => setError(null)} />
            )}

            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500 mb-3">
                    Buy Coins to Unlock Premium Chapters
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                    Purchase Coins to access exclusive chapters and support your favorite stories
                </p>
								{/* Show coin balance only if user is logged in */}
								{ isAuthenticated && (
                <div className="mt-6">
                    {isProfileLoading ? (
                        null
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">Your Coins:</span>
                            <GiTwoCoins className="text-gold" />
                            <span className=" text-gray-900 dark:text-gray-300">
                                {userCoinBalance?.toLocaleString() || 0}
                            </span>
                        </div>
                    )}
									</div>
								)}
            </div>

            {/* Coin Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {COIN_PLANS.map((plan) => {
                    const totalCoins = plan.baseCoins + plan.bonus;
                    const hasBonus = plan.bonus > 0;

                    return (
                        <Card
                            key={plan.baseCoins}
                            className={`relative border border-amber-500/50 hover:bottom-1 transition-transform duration-300`}
                        >
                            <CardBody className="p-6">
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <Chip
                                        startContent={<FaStar />}
                                        className="absolute top-3 right-3 animate__animated  animate__pulse animate__infinite animate_slower"
                                        size="sm"
																				color="warning"
																				variant="shadow"
                                    >
                                        POPULAR
                                    </Chip>
                                )}

                                {/* Icon */}
                                <div className="flex justify-center mb-4">
                                    {getCardIcon(plan)}
                                </div>

                                {/* Base Coins */}
                                <div className="text-center mb-4">
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <FaCoins className="text-gold text-xl" />
                                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                                            {plan.baseCoins.toLocaleString()}
                                        </h3>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Base Coins</p>
                                </div>

                                {/* Bonus Badge */}
                                {hasBonus && (
                                    <div className="flex justify-center mb-4">
                                        <Chip
                                            startContent={<FaGift />}
                                            color={getBadgeColor(plan)}
                                            variant="flat"
                                            size="lg"
                                            className="font-semibold"
                                        >
                                            +{plan.bonus.toLocaleString()} BONUS
                                        </Chip>
                                    </div>
                                )}

                                {/* Total Coins */}
                                {hasBonus && (
                                    <div className="text-center mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total You Get:</p>
                                        <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500">
                                            {totalCoins.toLocaleString()} Coins
                                        </p>
                                    </div>
                                )}

                                {/* Divider */}
                                <di className="divider"/>

                                {/* Price */}
                                <div className="text-center mb-4">
                                    <p className="text-3xl font-bold text-gold">
                                        ${plan.price.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">USD</p>
                                </div>

                                {/* Purchase Button */}
                                <Button
                                    onClick={() => handlePurchase(plan.baseCoins)}
                                    isLoading={purchaseLoading === plan.baseCoins}
                                    className={`w-full ${
                                        plan.popular
                                            ? ""
                                            : ""
                                    }`}
																		color={plan.popular ? "warning" : "primary"}
                                    variant={plan.popular ? "solid" : "ghost"}
                                    size="lg"
                                    // startContent={!purchaseLoading && <FaCoins />}
                                >
                                    {purchaseLoading === plan.baseCoins ? "Processing..." : "Select Plan"}
                                </Button>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>

            {/* How It Works Section */}
            <Card className="mb-6 border-2 border-cyan-500/50">
                <CardBody className="p-8">
                    <h2 className="text-2xl font-bold text-gold mb-6">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-5xl mb-3">1️⃣</div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Choose a Package
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Select the coin package that best suits your reading needs
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-3">2️⃣</div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Complete Payment
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Securely pay via card, bank transfer, or USSD
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-3">3️⃣</div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Start Reading
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Coins are credited within 3 minutes and you can unlock chapters
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Benefits Section */}
            <Card className="border-2 border-gray-200 dark:border-gray-700">
                <CardBody className="p-8">
                    <h2 className="text-2xl font-bold text-gold mb-6">Why Buy Coins?</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <PiCoinsFill className="text-gold text-2xl mt-1 flex-shrink-0" />
                            <div className="text-gray-700 dark:text-gray-300">
                                <strong className="text-gray-900 dark:text-white">Unlock Premium Content:</strong> Access locked chapters instantly
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaGift className="text-cyan-500 text-2xl mt-1 flex-shrink-0" />
                            <div className="text-gray-700 dark:text-gray-300">
                                <strong className="text-gray-900 dark:text-white">Bonus Coins:</strong> Get extra coins with larger packages
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaStar className="text-yellow-500 text-2xl mt-1 flex-shrink-0" />
                            <div className="text-gray-700 dark:text-gray-300">
                                <strong className="text-gray-900 dark:text-white">Support Translators:</strong> Help translators continue bringing great stories
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaCrown className="text-orange-500 text-2xl mt-1 flex-shrink-0" />
                            <div className="text-gray-700 dark:text-gray-300">
                                <strong className="text-gray-900 dark:text-white">No Expiration:</strong> Your coins never expire, use them anytime
                            </div>
                        </li>
                    </ul>
                </CardBody>
            </Card>
        </div>
    );
}

export default BuyCoins;
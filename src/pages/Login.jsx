import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {Image} from "@heroui/image";
import { FaRegEyeSlash, FaRegEye  } from "react-icons/fa";
import loginImage from '../assets/girl-reading-novel.gif'; // Add your image
import { useAuth } from '../context/useAuth';

// Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, loading } = useAuth();
		const [serverError, setServerError] = useState("");
		const [showPassword, setShowPassword] = useState(false);


    const from = location.state?.from || '/';

		// ✅ React Hook Form setup
		const {
			register,
			handleSubmit,
			formState: { errors },
		} = useForm({
			resolver: yupResolver(schema),
		});


    const onSubmit  = async (data) => {
				setServerError("");

				const result = await login(data.email, data.password);
        
        if (result.success) {
            navigate(from, { replace: true });
        } else {
					setServerError(result.error || "Invalid email or password.");
        }
    };

    return (
        <div className="max-h-screen w-full flex bg-[#09090b] text-white ">
            {/* Left Side - Form */}
						<div className="flex flex-col w-full lg:w-1/2 justify-center items-center">
						<div className="w-full flex items-center justify-center p-2 h-3/4">
                <div className="w-3/4 h-3/4 max-w-md space-y-4">
                    {/* Header */}
                    <div className="text-center">
                      
                        <h2 className="text-3xl font-bold font-vibes text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500">
                            Welcome Back
                        </h2>
                        <p className="text-gray-400 dark:text-gray-400">
                            Continue your reading Journey
                        </p>
                    </div>

										{/* Server Error */}
										{serverError && (
											<div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
												{serverError}
											</div>
										)}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex flex-col gap-4 dark">
                            <Input
																{...register("email")}
                                type="email"
                                label="Email"
                                size="sm"
                                classNames={{
                                    input: "text-base",
                                }}
																isInvalid={!!errors.email}
																errorMessage={errors.email?.message}
                            />

                            <Input
																{...register("password")}
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                size="sm"
                                classNames={{
                                    input: "text-base",
                                }}
																isInvalid={!!errors.password}
																errorMessage={errors.password?.message}
																 endContent={ // 👈 add the toggle icon here
																<button
																	type="button"
																	onClick={() => setShowPassword((prev) => !prev)}
																	className="focus:outline-none cursor-pointer"
																>
																	{showPassword ? (
																		<FaRegEyeSlash className="text-lg text-gray-400" />
																	) : (
																		<FaRegEye className="text-lg text-gray-400" />
																	)}
																</button>
															}
                            />
                        </div>

                        {/* <div className="flex items-center ">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-gold hover:text-amber-500 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div> */}

                        <Button
                            type="submit"
                            className="w-full"
                            size="md"
														variant='ghost'
														color="warning"
                            isLoading={loading}
                        >
                            {loading ? 'Signing in...' : 'Continue'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="divider">OR</div>

                    {/* Google Sign In */}
                    <Button
                        variant="ghost"
                        className="w-full text-gray-700 dark:text-gray-300"
                        size="md"
												color='default'
                        startContent={<img alt="Google logo" loading="lazy" width="16" height="16" decoding="async" data-nimg="1" src="https://claude.ai/images/google.svg" style={{"color": "transparent"}}/>}
                        isDisabled
                    >
                        Continue with Google
                    </Button>

                    {/* Sign Up Link */}
                    <p className="text-center text-xs text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-gold hover:text-amber-500 font-semibold transition-colors"
                        >
                            Sign up
                        </Link>
                    </p>

                    {/* Terms */}
                    <p className="text-center text-xs text-gray-500 dark:text-gray-500">
                        By continuing, you agree to Novel Angel's{' '}
                        <Link to="/terms" className="underline hover:text-gold transition-colors">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="underline hover:text-gold transition-colors">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
					</div>
            {/* Right Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 ">
                <div className="flex items-center justify-center p-12">
                    <Image
												height={608.5}
												width={500}
                        alt="Welcome back"
                        src={loginImage}
                        className="max-w-full"
                    />
                </div>
                {/* Decorative elements */}
                {/* <div className="absolute top-20 left-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" /> */}
            </div>
            
        </div>
    );
}

export default Login;
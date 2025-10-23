import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import registerImage from '../assets/girl-reading-novel.gif'; // Add your image
import { useAuth } from '../context/useAuth';

// Yup validation schema
const schema = yup.object().shape({
    username: yup
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must not exceed 20 characters")
        .required("Username is required"),
    email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    // confirmPassword: yup
    //     .string()
    //     .oneOf([yup.ref('password'), null], "Passwords must match")
    //     .required("Please confirm your password"),
});

function Register() {
    const navigate = useNavigate();
    const { register: registerUser, loading } = useAuth();
    const [serverError, setServerError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setServerError("");

        const result = await registerUser(data.username, data.email, data.password);
				
        if (result.success) {
           // Go back if possible, otherwise go home
					if (window.history.state && window.history.state.idx > 0) {
						navigate(-1);
					} else {
						navigate("/");
					};
        } else {
					setServerError(result.error || "Registration failed. Please try again");
        }
    };

    return (
        <div className="max-h-screen w-full flex bg-[#09090b] text-white">
            {/* Left Side - Form */}
            <div className="flex flex-col w-full lg:w-1/2 justify-center items-center">
                <div className="w-full flex items-center justify-center p-2 h-3/4">
                    <div className="w-3/4 h-3/4 max-w-md space-y-4">
                        {/* Header */}
                        <div className="text-center">
                            <h2 className="text-3xl font-bold font-vibes text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan-500">
                                Create your account
                            </h2>
                            <p className="text-gray-400">
                                Start your reading adventure today
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
                                    {...register("username")}
                                    type="text"
                                    label="Username"
                                    size="sm"
                                    classNames={{
                                        input: "text-base",
                                    }}
                                    isInvalid={!!errors.username}
                                    errorMessage={errors.username?.message}
                                />

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
                                    endContent={
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

                                {/* <Input
                                    {...register("confirmPassword")}
                                    type={showConfirmPassword ? "text" : "password"}
                                    label="Confirm Password"
                                    size="sm"
                                    classNames={{
                                        input: "text-base",
                                    }}
                                    isInvalid={!!errors.confirmPassword}
                                    errorMessage={errors.confirmPassword?.message}
                                    endContent={
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                                            className="focus:outline-none cursor-pointer"
                                        >
                                            {showConfirmPassword ? (
                                                <FaRegEyeSlash className="text-lg text-gray-400" />
                                            ) : (
                                                <FaRegEye className="text-lg text-gray-400" />
                                            )}
                                        </button>
                                    }
                                /> */}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                size="md"
                                variant='ghost'
                                color="warning"
                                isLoading={loading}
                            >
                                {loading ? 'Creating account...' : 'Continue'}
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="divider">OR</div>

                        {/* Google Sign Up */}
                        <Button
                            variant="ghost"
                            className="w-full text-gray-700 dark:text-gray-300"
                            size="md"
                            color='default'
                            startContent={
                                <img 
                                    alt="Google logo" 
                                    loading="lazy" 
                                    width="16" 
                                    height="16" 
                                    decoding="async" 
                                    src="https://claude.ai/images/google.svg" 
                                    style={{"color": "transparent"}}
                                />
                            }
                            isDisabled
                        >
                            Continue with Google
                        </Button>

                        {/* Login Link */}
                        <p className="text-center text-xs text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-gold hover:text-amber-500 font-semibold transition-colors"
                            >
                                Log in
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
            <div className="hidden lg:flex lg:w-1/2">
                <div className="flex items-center justify-center p-12">
                    <Image
                        height={608.5}
                        width={500}
                        alt="Join us"
                        src={registerImage}
                        className="max-w-full"
                    />
                </div>
            </div>
        </div>
    );
}

export default Register;
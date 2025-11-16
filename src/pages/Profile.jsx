import { useState, useEffect, useRef } from "react";
import api from "../api/axiosInstance";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { LuTrash2, LuMail } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { PiCoinsFill } from "react-icons/pi";
import { RiShieldStarLine } from "react-icons/ri";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {Avatar} from "@heroui/avatar";
import AlertMessage from "../components/AlertMessage";
import { useAuth } from "../context/useAuth"

function Profile() {
    const { auth } = useAuth();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '', avatar: null, removeAvatar: false });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const DEFAULT_AVATAR = user?.username;

    // Fetch user profile
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const profileResponse = await api.get('/user/profile', {
                    headers: { Authorization: `Bearer ${auth?.token}` }
                });
                setUser(profileResponse.data.data);
                setFormData({
                    username: profileResponse.data.data.username,
                    email: profileResponse.data.data.email,
                    avatar: null,
                    removeAvatar: false
                });
                setError(null);
            } catch (err) {
                const errorMessage = err.response?.data?.message || "Failed to load profile.";
                setError(errorMessage);
                console.error("Error fetching data:", errorMessage);
            } finally {
                setLoading(false);
            }
        };
        if (auth?.token) fetchData();
    }, [auth?.token]);

			// Watch avatar changes for live preview
    useEffect(() => {
        if (formData.avatar) {
            const objectUrl = URL.createObjectURL(formData.avatar);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreviewUrl(null);
        }
    }, [formData.avatar]);

    // // Clear error after 5 seconds
    // useEffect(() => {
    //     if (error) {
    //         const timer = setTimeout(() => setError(null), 5000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [error]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle avatar change
    const handleAvatarChange = (e) => {
			const file = e.target.files[0];
			if (file) {
				setFormData((prev) => ({
					...prev,
					avatar: file,
					removeAvatar: false,
				}));
			}
			e.target.value = "";
    };

    // Handle profile update
    const handleSave = async () => {
        try {
            setSaving(true);
            const data = new FormData();
            data.append('username', formData.username);
            data.append('email', formData.email);
        
            if (formData.avatar) {
                data.append('avatar', formData.avatar);
            } else if (formData.removeAvatar) {
                data.append('removeAvatar', true);
            }

            const response = await api.put('/user/profile', data, {
                headers: {
                    Authorization: `Bearer ${auth?.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUser(response.data.data);
            setIsEditing(false);

            setFormData((prev) => ({
                ...prev,
                avatar: null,
                removeAvatar: false,
            }));
            setPreviewUrl(null);
            setError(null);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to update profile.";
            setError(errorMessage);
            console.error("Error updating profile:", errorMessage);
        } finally {
            setSaving(false);
        }
    };
    // Cancel editing
    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            username: user?.username || '',
            email: user?.email || '',
            avatar: null,
            removeAvatar: false,
        });
        setPreviewUrl(null);
    };

    return (
        <main className="container mx-auto p-4 max-w-5xl">
            {/* Error Alert */}
            {error && (
              <AlertMessage message={error } onClose={() => setError(null)} />
            )}

            <div className="flex flex-col gap-6">
                {/* Profile Header Card */}
                {loading ? (
                    <Card className="bg-base-200">
                        <CardBody>
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="relative">
                                    <div className="skeleton w-32 h-32 rounded-full"></div>
                                </div>
                                <div className="flex-1 space-y-3 w-full">
                                    <div className="skeleton h-8 w-48"></div>
                                    <div className="skeleton h-5 w-64"></div>
                                    <div className="skeleton h-5 w-32"></div>
                                </div>
                                <div className="skeleton h-10 w-32"></div>
                            </div>
                        </CardBody>
                    </Card>
                ) : user ? (
                    <Card className="bg-custom-striped-light dark:bg-custom-striped">
                        <CardBody>
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                {/* Avatar Section */}
                                <div className="relative">
                                    <Avatar
                                        src={
                                            previewUrl
                                                ? previewUrl
                                                : !formData.removeAvatar && user.avatar
                                                ? user.avatar
                                                : undefined
                                        }
																				name={user.username}
                                        alt={user.username}
                                        className="w-32 h-32 text-3xl"
																				radius="full"
                                        isBordered
                                    />
                                    
                                    {/* Avatar Edit Controls */}
                                    {isEditing && (
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 px-3 py-2 rounded-full shadow-lg">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={fileInputRef}
                                                className="hidden"
                                                onChange={handleAvatarChange}
                                            />
                                            <Button
																								isIconOnly
                                                aria-label="upload"
                                                onClick={() => fileInputRef.current?.click()}
                                                // className="h-7 w-15"
																								color="primary"
																								radius="full"
																								variant="flat"
                                            >
                                                <FiUpload className="text-lg" />
                                            </Button>
                                            {(previewUrl || formData.avatar || user.avatar) && (
                                                <Button
																									isIconOnly
																									aria-label="remove"
                                                    onClick={() => {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            avatar: null,
                                                            removeAvatar: true,
                                                        }));
                                                        setPreviewUrl(null);
																												if (fileInputRef.current) {
																													fileInputRef.current.value = ""; // 🧹 clear file input
																												}
                                                    }}
																									color="danger"
																									radius="full"
																									variant="flat"
                                                >
                                                    <LuTrash2 className="text-lg" />
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* User Info */}
                                <div className="flex-1 space-y-2 text-center sm:text-left">
                                    <h2 className="text-3xl font-bold text-primary">{user.username}</h2>
                                    <p className="flex items-center justify-start gap-2 text-gray-600 dark:text-gray-400">
                                        <LuMail className="text-lg" />
                                        <span>{user.email}</span>
                                    </p>
																		{user?.role === "admin" ? (
																			<div className="flex items-center justify-center md:justify-start gap-1 text-sm text-amber-500">
																					<RiShieldStarLine className="text-lg" />
																					<span>Admin</span>
																			</div>
																	) : (
                                    <div className="flex items-center justify-center sm:justify-start gap-1">
                                        <PiCoinsFill className="text-amber-500 text-sm" /> 
                                        <span className="text-sm text-gray-600 dark:text-gray-400 tracking-tight">{user.coinBalance.toLocaleString() || 0} </span>
                                    </div>
																	)}

                                </div>

                                {/* Edit Button */}
                                {!isEditing && (
                                    <Button
                                        color="primary"
                                        variant="bordered"
                                        startContent={<FaEdit />}
                                        onPress={() => setIsEditing(true)}
                                    >
                                        Edit Profile
                                    </Button>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                ) : null}

                {/* Profile Information Card */}
                <Card className="">
                    <CardBody>
                        {loading ? (
                            <div className="space-y-6">
                                <div className="skeleton h-8 w-64"></div>
                                <div className="space-y-4">
                                    <div className="skeleton h-12 w-full"></div>
                                    <div className="skeleton h-12 w-full"></div>
                                </div>
                            </div>
                        ) : user ? (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <GoPerson className="text-3xl text-primary" />
                                    <div>
                                        <h3 className="text-2xl font-bold text-primary">Profile Information</h3>
                                        <p className="text-sm text-base-content/60">Manage your personal details</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="form-control">
                                        {isEditing ? (
                                            <Input
                                                type="text"
																								radius="full"
																								label="Username"
																								labelPlacement="outside-top"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                variant="bordered"
                                            />
                                        ) : (
                                            <Input
                                                type="text"
																								radius="full"
																								label="Username"
																								labelPlacement="outside-top"
                                                value={formData.username}
                                                disabled
                                            />
                                        )}
                                    </div>

                                    <div className="form-control">
                                        {isEditing ? (
                                            <Input
                                                type="email"
                                                name="email"
																								label="Email"
																								radius="full"
																								labelPlacement="outside-top"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                variant="bordered"
                                            />
                                        ) : (
                                            <Input
                                                type="email"
																								label="Email"
																								radius="full"
																								labelPlacement="outside-top"
                                                value={formData.email}
                                                disabled
                                            />
                                        )}
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="flex gap-3 justify-end">
                                        <Button
                                            color="danger"
                                            variant="bordered"
                                            startContent={<FaTimes />}
                                            onPress={handleCancel}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            color="primary"
                                            startContent={!saving && <FaSave />}
                                            onPress={handleSave}
                                            isLoading={saving}
                                        >
                                            {saving ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </CardBody>
                </Card>
            </div>
        </main>
    );
}

export default Profile;
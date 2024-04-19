import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { LuUpload } from 'react-icons/lu';
import { logout, updateUser } from '../../redux/authSlice';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import { updateUserProfile } from '../../service.api.js/api.service';

export default function ProfilePage() {
	const [scroll, setScroll] = useState(0);
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const fileRef = useRef(null);
	const [image, setImage] = useState(undefined);
	const [imagePercent, setImagePercent] = useState(0);
	const [formData, setFormData] = useState({});

	const logOut = () => {
		dispatch(logout());
		toast.success('Logout successfully');
		navigate('/');
	};

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setScroll(window.scrollY);
		});
		return () => {
			window.removeEventListener('scroll', () => {
				setScroll(window.scrollY);
			});
		};
	}, [scroll]);

	useEffect(() => {
		if (image) {
			handleFileUpload(image);
		}
	}, [image]);

	const handleFileUpload = async (image) => {
		try {
			const storage = getStorage(app);
			const fileName = new Date().getTime() + image.name;
			const storageRef = ref(storage, fileName);
			const uploadTask = uploadBytesResumable(storageRef, image);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setImagePercent(Math.round(progress));
				},
				(error) => {
					toast.error('Error uploading image', error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref)
						.then((downloadURL) => {
							setFormData({ ...formData, profilePicture: downloadURL });
						})
						.catch((error) => {
							console.log(error);
						});
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await updateUserProfile(user._id, formData);
		console.log(data);
		dispatch(updateUser(data));
		toast.success('Update Successfully');
		navigate('/');
	};
	return (
		<div className="home px-[100px]">
			<img
				src="/assets/aot.jpg"
				alt="Background Img"
				className="bgImg active"
			/>
			<div className="w-full min-h-[100vh] py-20 flex justify-center items-center">
				<Navbar scroll={scroll} />

				<div className="flex justify-center items-center relative z-10 w-full bg-opacity-80 bg-black h-full">
					<div className="flex flex-col gap-4 py-4 w-[500px]">
						<h1 className="text-[#DC143C] text-4xl text-center font-josefin">
							Profile
						</h1>
						<div className="relative">
							<input
								type="file"
								ref={fileRef}
								hidden
								accept="image/*"
								onChange={(e) => setImage(e.target.files[0])}
							/>
							<img
								src={
									formData.profilePicture || user?.profilePicture
									// ? user?.profilePicture
									// : "/assets/profile.jpg"
								}
								alt="User Profile"
								className="w-[250px] h-[250px] mx-auto rounded-full "
							/>
							<button
								onClick={() => fileRef.current.click()}
								className="text-xl bg-main-red w-fit rounded-full p-2 absolute bottom-0 right-0 hover:bg-black hover:text-main-red duration-200"
							>
								<LuUpload />
							</button>
						</div>
						{imagePercent > 0 && imagePercent < 100 ? (
							<span className="flex items-center justify-center text-green-600 font-josefin">
								Uploading... {imagePercent} %
							</span>
						) : imagePercent === 100 ? (
							<span className="flex items-center justify-center text-green-600 font-josefin">
								Image Uploaded Successfully
							</span>
						) : (
							''
						)}
						<form onSubmit={handleSubmit} className="flex flex-col gap-4">
							<div className="flex flex-row">
								<div className="flex flex-col items-start justify-center w-full">
									<label
										htmlFor="name"
										className="text-[#3a3e55] text-sm font-bold min-h-[40px] py-2"
									>
										Username:
									</label>
									<label
										htmlFor="password"
										className="text-[#3a3e55] text-sm font-bold min-h-[40px] py-2"
									>
										Email:
									</label>
									<label
										htmlFor="password"
										className="text-[#3a3e55] text-sm font-bold min-h-[40px] py-2"
									>
										Password:
									</label>
								</div>

								<div className="flex flex-col items-center justify-start w-full">
									<input
										type="text"
										id="name"
										defaultValue={user?.name ? user?.name : 'animeCave'}
										placeholder="Username"
										className="outline-none py-2 px-2 bg-[#070A16] border border-[#262938] w-[270px]"
										onChange={handleChange}
									/>
									<input
										type="text"
										id="email"
										defaultValue={
											user?.email ? user?.email : 'animeCave@gmail.com'
										}
										placeholder="Email"
										className="outline-none py-2 px-2 bg-[#070A16] border border-[#262938] w-[270px]"
										onChange={handleChange}
									/>
									<input
										type="password"
										id="password"
										placeholder={`Password`}
										className="outline-none py-2 px-2 bg-[#070A16] border border-[#262938] w-[270px]"
										onChange={handleChange}
									/>
								</div>
							</div>
							<button
								type="submit"
								className="bg-[#DC143C] hover:bg-[#da3354] duration-500 px-2 py-2 flex items-center gap-1 cursor-pointer justify-center"
							>
								<span className="font-josefin">Update</span>
							</button>
						</form>

						<div className="flex justify-end items-end w-full">
							<span
								className="text-sm font-josefin items-end flex cursor-pointer"
								onClick={logOut}
							>
								Log Out
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

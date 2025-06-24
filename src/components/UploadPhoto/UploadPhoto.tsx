import { useState, useCallback, ChangeEvent } from "react";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "../../utils/cropImage";
import "./UploadPhoto.scss";

interface UploadPhotoProps {
	required?: boolean;
	setUrlPath: (url: string) => void;
	urlPath: string;
	text?: string;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({
	required = false,
	setUrlPath,
	urlPath,
	text,
}) => {
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
	const [showCropper, setShowCropper] = useState(false);
	const [error, setError] = useState("");

	const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
		setCroppedAreaPixels(areaPixels);
	}, []);

	const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = () => {
				setImageSrc(reader.result as string);
				setShowCropper(true);
			};
			reader.readAsDataURL(file);
		}
	};

	const uploadToS3 = async (blob: Blob) => {
		try {
			const res = await fetch(
				"http://localhost:8080/api/s3/presign?contentType=image/jpeg",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			const { url, publicUrl } = await res.json();

			const uploadRes = await fetch(url, {
				method: "PUT",
				headers: { "Content-Type": "image/jpeg" },
				body: blob,
			});

			if (!uploadRes.ok) throw new Error("Upload failed");
			setUrlPath(publicUrl);
			setShowCropper(false);
		} catch (err) {
			console.error(err);
			setError("Image upload failed.");
		}
	};

	const handleCropSave = async () => {
		if (!imageSrc || !croppedAreaPixels) return;
		try {
			const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
			await uploadToS3(croppedImage);
		} catch (err) {
			console.error("Crop error:", err);
			setError("Crop failed.");
		}
	};

	return (
		<div className="upload-photo">
			<label className="upload-photo__label">
				{text || "Upload photo"}
				<input
					type="file"
					accept="image/*"
					onChange={handleFileInput}
					required={required && !urlPath}
					className="upload-photo__input"
				/>
			</label>

			{showCropper && (
				<div className="upload-photo__cropper">
					<div className="crop-container">
						<Cropper
							image={imageSrc!}
							crop={crop}
							zoom={zoom}
							aspect={1}
							onCropChange={setCrop}
							onZoomChange={setZoom}
							onCropComplete={onCropComplete}
						/>
					</div>
					<button onClick={handleCropSave}>Save</button>
				</div>
			)}

			{urlPath && (
				<img src={urlPath} alt="Uploaded" className="upload-photo__preview" />
			)}

			{error && <p className="upload-photo__error">{error}</p>}
		</div>
	);
};

export default UploadPhoto;

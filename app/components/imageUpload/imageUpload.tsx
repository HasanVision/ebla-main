
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean;
}







const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value,
    disabled,
    label
}) => {

    const [base64, setBase64] = useState(value);
    const handelChange = useCallback((base64: string) => {
        onChange(base64)
    }, [onChange])

    const handelDrop = useCallback((files: any) => {
        const file = files[0]
        const reader = new FileReader();

        reader.onload = (event: any) => {
            setBase64(event.target.result);
            handelChange(event.target.result);

            reader.readAsDataURL(file);
        }
    }, [handelChange])

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handelDrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }

    });

    return (
        <div {
            ...getRootProps({
                className: "checkLater"
            })
        }>

            <input {...getInputProps} />
            {
                base64 ? (
                    <div>
                        <Image
                            src={base64}
                            height={40}
                            width={40}
                            alt="Uploaded image"
                        />
                    </div>
                ) : (
                    <p>{label}</p>
                )
            }
        </div>);
}

export default ImageUpload;
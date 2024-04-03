import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function CropCoverImage({ handleImage }) {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 9 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const generateDownload = (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    } else {
      let dataURL = canvas.toDataURL();
      let file = dataURLtoFile(dataURL, 'CoverImage');
      function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
      }
      let image = [];
      image.push(file);
      handleImage(image);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);
  }, [completedCrop]);

  return (
    <div className='CroppedDiv DBlock'>
      <div>
        <input type='file' accept='image/*' onChange={onSelectFile} />
      </div>
      {upImg ? (
        <ReactCrop src={upImg} onImageLoaded={onLoad} crop={crop} onChange={(c) => setCrop(c)} onComplete={(c) => setCompletedCrop(c)} />
      ) : null}

      <div className='PreviewImg DBlock'>
        <h4>Preview Image</h4>
        {previewCanvasRef ? (
          <canvas
            ref={previewCanvasRef}
            className='mb-3 '
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
            }}
          />
        ) : null}
      </div>
      <button
        type='button'
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={() => generateDownload(previewCanvasRef.current, completedCrop)}
      >
        Upload image
      </button>
    </div>
  );
}

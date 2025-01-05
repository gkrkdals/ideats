'use client';

import {useEffect, useState} from "react";
import {client} from "@/util/axios";
import ImageInfo from "@/app/admin/components/molecule/ImageInfo";
import FormControl from "@/components/atom/FormControl";

export interface ImageFile { order: string, imageName: string, thumbnail: string }
export interface ChangedImageFile { imageName: string, file: File | null }

export default function ImageOrder() {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [title, setTitle] = useState<File | null>(null);
  const [changedFiles, setChangedFiles] = useState<ChangedImageFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleLoad() {
    setLoading(true);

    try {
      await client.post('/api/admin/copy');
      const res = await client.get('/api/admin/image');
      setFiles(res.data.thumbnails.map((data: ImageFile) => ({
        order: data.imageName.split(".").at(0),
        imageName: data.imageName,
        thumbnail: data.thumbnail,
      })));
      setChangedFiles(res.data.thumbnails.map((data: ImageFile) => ({
        imageName: data.imageName,
        file: null,
      })));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("originalImage", JSON.stringify(files.map(data => ({
        order: parseInt(data.order),
        imageName: data.imageName,
      }))));

      if (title) {
        formData.append("files", title, `title.${title.name.split(".").at(-1)}`);
      }

      changedFiles.forEach((fileObj) => {
        if (fileObj.file) {
          formData.append("files", fileObj.file, fileObj.imageName)
        }
      });

      await client.put('/api/admin/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
      await handleLoad();
    }
  }

  useEffect(() => {
    setLoading(true);
    client.post('/api/admin/copy')
      .then(() => {
        return client.get('/api/admin/image')
      })
      .then(res => {
        setFiles(res.data.thumbnails.map((data: ImageFile) => ({
          order: data.imageName.split(".").at(0),
          imageName: data.imageName,
          thumbnail: data.thumbnail,
        })));
        setChangedFiles(res.data.thumbnails.map((data: ImageFile) => ({
          imageName: data.imageName,
          file: null,
        })));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div className='text-secondary'>
          로딩 중..
        </div>
      ) : (
        <div className='pt-5'>
          <div>
            <h6>
              타이틀 이미지 바꾸기
            </h6>
            <FormControl
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setTitle(e.target.files[0]);
                }
              }}
              style={{
                width: 300
              }}
              accept="image/jpeg, image/png, image/jpg"
            />
          </div>
          <hr/>

          {files.map((file, key) => (
            <ImageInfo
              key={key}
              imageFile={file}
              setFilesAction={setFiles}
              setChangedFilesAction={setChangedFiles}
            />
          ))}
          <div className='d-flex justify-content-end mt-4 px-3' style={{ marginBottom: 50 }}>
            <button
              className='btn btn-outline-success'
              disabled={saving}
              onClick={handleSave}
            >
              {saving ? '저장 중..' : '저장'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
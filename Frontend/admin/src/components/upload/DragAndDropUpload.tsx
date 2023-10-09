import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';

const { Dragger } = Upload;

const DragAndDropUpload = (props: UploadProps) => {
  return (
    <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Chọn hoặc kéo thả file vào vùng này để đăng tải</p>
  </Dragger>
  )
}

export default DragAndDropUpload
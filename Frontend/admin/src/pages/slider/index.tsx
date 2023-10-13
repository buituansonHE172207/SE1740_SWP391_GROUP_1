import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Form, Image, Input, Modal, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import {
  ISlider,
  addSlider,
  deleteSlider,
  getAllSlider,
  updateSlider,
} from "../../services/slider.service";

const SliderPage = () => {
  const [formInstance] = Form.useForm();
  const [dataSource, setDataSource] = useState<ISlider[]>([]);
  const [isShowPopup, setShowPopup] = useState<boolean>(false);
  const [isShowConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<ISlider | undefined>();
  // const [fileList, setFileList] = useState<UploadFile[]>([]);

  const columns: ColumnsType<ISlider> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render(imageUrl, record, index) {
        return (
          <Image
            width={200}
            height={200}
            src={imageUrl}
            // fallback={}
          />
        );
      },
    },
    {
      title: "Liên kết",
      dataIndex: "backLink",
      key: "backLink",
    },

    {
      align: "right",
      dataIndex: "id",
      render(id, record, index) {
        return (
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setShowPopup(true);
                setSelectedRow(record);
                formInstance.setFieldsValue(record);
              }}
            ></Button>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => {
                setShowConfirmDelete(true);
                setSelectedRow(record);
              }}
              danger
            ></Button>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    if (!isShowPopup) {
      (async () => {
        const res = await getAllSlider();
        setDataSource(res);
      })();
    }
  }, [isShowPopup, isShowConfirmDelete]);

  const handleClose = () => {
    // setFileList([]);
    setShowPopup(false);
    setShowConfirmDelete(false);
    setSelectedRow(undefined);
    formInstance.resetFields();
  };

  const handleOK = async () => {
    try {
      await formInstance.validateFields();
      const fieldValue = formInstance.getFieldsValue();
      if (selectedRow) {
        await updateSlider({ ...fieldValue, id: selectedRow.id });
      } else {
        await addSlider(fieldValue);
      }
      formInstance.resetFields();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedRow) {
        await deleteSlider(selectedRow.id.toString());
        handleClose();
      }
    } catch (error) {}
  };

  return (
    <>
      <Card
        title={
          <Space
            direction="horizontal"
            style={{ justifyContent: "space-between", width: "100%" }}
          >
            <Button
              size="large"
              type="primary"
              onClick={() => setShowPopup(true)}
            >
              Thêm Slider
            </Button>
            {/* <Input.Search
                  placeholder="Nhập slider muốn tìm kiếm"
                  allowClear
                  enterButton="Tìm kiếm"
                  size="large"
                  // onSearch={onSearch}
                /> */}
          </Space>
        }
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={(record) => record.id}
        />
      </Card>

      <Modal
        title={`${selectedRow ? "Cập nhật" : "Thêm"} slider`}
        open={isShowPopup}
        cancelText="Hủy"
        okText={`${selectedRow ? "Cập nhật" : "Thêm"}`}
        maskClosable={false}
        onOk={handleOK}
        onCancel={handleClose}
      >
        <Form form={formInstance} layout="vertical">
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: "Hãy nhập vào tiêu đề slider" }]}
          >
            <Input
              autoComplete="false"
              size="large"
              placeholder="Nhập vào tiêu đề slider"
            />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label="Hình ảnh"
            rules={[
              {
                required: true,
                message: "Hãy nhập vào đường dẫn của ảnh slider",
                // validator(rule, value, callback) {
                //   if (fileList.length === 0) {
                //     return Promise.reject("Hãy chọn hình ảnh");
                //   }
                //   return Promise.resolve();
                // },
              },
            ]}
          >
            {/* <DragAndDropUpload
              fileList={fileList}
              multiple={false}
              beforeUpload={(newFile) => {
                setFileList([newFile]);
                return false;
              }}
              onRemove={() => {
                setFileList([]);
              }}
              accept="image/*"
            /> */}
            <Input
              autoComplete="false"
              size="large"
              placeholder="Nhập vào đường dẫn của ảnh slider"
            />
          </Form.Item>
          <Form.Item
            name="backLink"
            label="Đường dẫn"
            rules={[{ required: true, message: "Hãy nhập vào đường dẫn" }]}
          >
            <Input
              autoComplete="false"
              size="large"
              placeholder="Nhập vào đường dẫn"
            />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea
              autoComplete="false"
              size="large"
              placeholder="Nhập vào mô tả"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xoá slider"
        open={isShowConfirmDelete}
        cancelText="Hủy"
        okText="Xoá"
        okButtonProps={{ danger: true }}
        maskClosable={false}
        onOk={handleDelete}
        onCancel={handleClose}
      >
        Bạn có đồng ý xóa slider {selectedRow?.title} hay không?
      </Modal>
    </>
  );
};

export default SliderPage;

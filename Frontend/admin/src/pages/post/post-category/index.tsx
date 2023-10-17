import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import {
  IPostCategory,
  addPostCategory,
  deletePostCategory,
  getAllPostCategory,
  updatePostCategory,
} from "../../../services/post.service";

const PostCategoryPage = () => {
  const [formInstance] = Form.useForm();
  const [dataSource, setDataSource] = useState<IPostCategory[]>([]);
  const [isShowPopup, setShowPopup] = useState<boolean>(false);
  const [isShowConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<IPostCategory | undefined>();

  const columns: ColumnsType<IPostCategory> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên danh mục bài viết",
      dataIndex: "name",
      key: "name",
    },
    {
      key: "action",
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
        const res = await getAllPostCategory();
        setDataSource(res);
      })();
    }
  }, [isShowPopup, isShowConfirmDelete]);

  const handleClose = () => {
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
        await updatePostCategory({ ...fieldValue, id: selectedRow.id });
      } else {
        await addPostCategory(fieldValue);
      }
      formInstance.resetFields();
      handleClose();
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      if (selectedRow) {
        await deletePostCategory(selectedRow.id.toString());
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
              Thêm danh mục bài viết
            </Button>
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
        title={`${selectedRow ? "Cập nhật" : "Thêm"} danh mục bài viết`}
        open={isShowPopup}
        cancelText="Hủy"
        okText={`${selectedRow ? "Cập nhật" : "Thêm"}`}
        maskClosable={false}
        onOk={handleOK}
        onCancel={handleClose}
      >
        <Form form={formInstance} layout="vertical">
          <Form.Item
            name="name"
            label="Tên danh mục bài viết"
            rules={[
              { required: true, message: "Hãy nhập vào tên danh mục bài viết" },
              {
                message: "Tên danh mục bài viết không hợp lệ.",
              },
            ]}
          >
            <Input
              autoComplete="false"
              size="large"
              placeholder="Nhập vào tên danh mục bài viết"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xoá danh mục bài viết"
        open={isShowConfirmDelete}
        cancelText="Hủy"
        okText="Xoá"
        okButtonProps={{ danger: true }}
        maskClosable={false}
        onOk={handleDelete}
        onCancel={handleClose}
      >
        Bạn có đồng ý xóa danh mục bài viết {selectedRow?.name} hay không?
      </Modal>
    </>
  );
};

export default PostCategoryPage;

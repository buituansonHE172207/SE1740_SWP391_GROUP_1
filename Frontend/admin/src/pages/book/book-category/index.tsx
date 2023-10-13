import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import {
  IBookCategory,
  addBookCategory,
  deleteBookCategory,
  getAllBookCategory,
  updateBookCategory,
} from "../../../services/book.service";
import { namePattern } from "../../../utils/const.util";

const BookCategoryPage = () => {
  const [formInstance] = Form.useForm();
  const [dataSource, setDataSource] = useState<IBookCategory[]>([]);
  const [isShowPopup, setShowPopup] = useState<boolean>(false);
  const [isShowConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<IBookCategory | undefined>();

  const columns: ColumnsType<IBookCategory> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên loại sách",
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
        const res = await getAllBookCategory();
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
        await updateBookCategory({ ...fieldValue, id: selectedRow.id });
      } else {
        await addBookCategory(fieldValue);
      }
      formInstance.resetFields();
      handleClose();
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      if (selectedRow) {
        await deleteBookCategory(selectedRow.id.toString());
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
              Thêm Danh mục sách
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
        title={`${selectedRow ? "Cập nhật" : "Thêm"} danh mục sách`}
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
            label="Tên danh mục sách"
            rules={[
              { required: true, message: "Hãy nhập vào tên danh mục sách" },
              {
                pattern: namePattern,
                message: "Tên danh mục sách không hợp lệ.",
              },
            ]}
          >
            <Input
              autoComplete="false"
              size="large"
              placeholder="Nhập vào tên danh mục sách"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xoá danh mục sách"
        open={isShowConfirmDelete}
        cancelText="Hủy"
        okText="Xoá"
        okButtonProps={{ danger: true }}
        maskClosable={false}
        onOk={handleDelete}
        onCancel={handleClose}
      >
        Bạn có đồng ý xóa danh mục sách {selectedRow?.name} hay không?
      </Modal>
    </>
  );
};

export default BookCategoryPage;

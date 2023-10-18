import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import {
  IAuthor,
  addAuthor,
  deleteAuthor,
  getAllAuthor,
  updateAuthor,
} from "../../services/author.service";

const AuthorPage = () => {
  const [formInstance] = Form.useForm();
  const [dataSource, setDataSource] = useState<IAuthor[]>([]);
  const [isShowPopup, setShowPopup] = useState<boolean>(false);
  const [isShowConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<IAuthor | undefined>();

  const columns: ColumnsType<IAuthor> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên tác giả",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên công ty",
      dataIndex: "company",
      key: "company",
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
        const res = await getAllAuthor();
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
        await updateAuthor({ ...fieldValue, id: selectedRow.id });
      } else {
        await addAuthor(fieldValue);
      }
      formInstance.resetFields();
      handleClose();
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      if (selectedRow) {
        await deleteAuthor(selectedRow.id.toString());
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
              Thêm Tác giả
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
        title={`${selectedRow ? "Cập nhật" : "Thêm"} tác giả`}
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
            label="Tên tác giả"
            rules={[
              { required: true, message: "Hãy nhập vào tên tác giả" },
              {
                message: "Tên tác giả không hợp lệ.",
              },
            ]}
          >
            <Input
              autoComplete="false"
              size="large"
              placeholder="Nhập vào tên tác giả"
            />
          </Form.Item>
          <Form.Item name="company" label="Tên công ty">
            <Input
              autoComplete="false"
              size="large"
              placeholder="Nhập vào company"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xoá tác giả"
        open={isShowConfirmDelete}
        cancelText="Hủy"
        okText="Xoá"
        okButtonProps={{ danger: true }}
        maskClosable={false}
        onOk={handleDelete}
        onCancel={handleClose}
      >
        Bạn có đồng ý xóa tác giả {selectedRow?.name} hay không?
      </Modal>
    </>
  );
};

export default AuthorPage;

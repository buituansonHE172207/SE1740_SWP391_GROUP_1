import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import {
  IPublisher,
  addPublisher,
  deletePublisher,
  getAllPublisher,
  updatePublisher,
} from "../../services/publisher.service";

const PublisherPage = () => {
  const [formInstance] = Form.useForm();
  const [dataSource, setDataSource] = useState<IPublisher[]>([]);
  const [isShowPopup, setShowPopup] = useState<boolean>(false);
  const [isShowConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<IPublisher | undefined>();

  const columns: ColumnsType<IPublisher> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên NXB",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
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
        const res = await getAllPublisher();
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
        await updatePublisher({ ...fieldValue, id: selectedRow.id });
      } else {
        await addPublisher(fieldValue);
      }
      formInstance.resetFields();
      handleClose();
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      if (selectedRow) {
        await deletePublisher(selectedRow.id.toString());
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
              Thêm Nhà xuất bản
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
        title={`${selectedRow ? "Cập nhật" : "Thêm"} nhà xuất bản`}
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
            label="Tên nhà xuất bản"
            rules={[
              { required: true, message: "Hãy nhập vào tên nhà xuất bản" },
              {
                message: "Tên nhà xuất bản không hợp lệ.",
              },
            ]}
          >
            <Input
              autoComplete="false"
              size="large"
              placeholder="Nhập vào tên nhà xuất bản"
            />
          </Form.Item>
          <Form.Item name="website" label="Website">
            <Input
              autoComplete="false"
              size="large"
              placeholder="Nhập vào website"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xoá nhà xuất bản"
        open={isShowConfirmDelete}
        cancelText="Hủy"
        okText="Xoá"
        okButtonProps={{ danger: true }}
        maskClosable={false}
        onOk={handleDelete}
        onCancel={handleClose}
      >
        Bạn có đồng ý xóa nhà xuất bản {selectedRow?.name} hay không?
      </Modal>
    </>
  );
};

export default PublisherPage;

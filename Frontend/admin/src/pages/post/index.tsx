import { Button, Card, Form, Input, Modal, Select, Space, Switch } from "antd";
import { useEffect, useState } from "react";
import {
  IPost,
  IPostCategory,
  addPost,
  getAllPost,
  getAllPostCategory,
} from "../../services/post.service";
import Table, { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TableParams } from "../../services";
import { useAuth } from "../../context/AuthContext";

interface OptionType {
  label: string;
  value: number;
}

const PostPage = () => {
  const [formInstance] = Form.useForm();
  const { userInfo } = useAuth();
  const [dataSource, setDataSource] = useState<IPost[]>([]);
  const [postCategories, setPostCategories] = useState<IPostCategory[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<OptionType[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [isShowPopup, setShowPopup] = useState<boolean>(false);
  const [isShowConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<IPost | undefined>();

  const changeStatus = (checked: boolean) => {
    const status = checked ? "PUBLISHED" : "DRAFT";
    formInstance.setFieldsValue({ status: status });
  };

  const columns: ColumnsType<IPost> = [
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
        const res = await getAllPost();
        setDataSource(res.content);
        // setTableParams({
        //   ...tableParams,
        //   pagination: {
        //     ...tableParams.pagination,
        //     current: res.number,
        //     pageSize: res.size,
        //   },
        // });
      })();
    } else {
      (async () => {
        const res = await getAllPostCategory();
        setPostCategories(res);
      })();
    }
  }, [isShowPopup, isShowConfirmDelete]);

  useEffect(() => {
    if (postCategories) {
      let options = postCategories.map((item: any) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setCategoryOptions(options);
    }
  }, [postCategories]);

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
      // console.log();

      if (selectedRow) {
        // await updatePostCategory({ ...fieldValue, id: selectedRow.id });
      } else {
        await addPost({...fieldValue, status: fieldValue.status === undefined ? "PUBLISHED" : fieldValue.status});
      }
      formInstance.resetFields();
      handleClose();
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      if (selectedRow) {
        //   await deletePostCategory(selectedRow.id.toString());
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
              Thêm bài viết
            </Button>
          </Space>
        }
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={(record) => record.id}
          pagination={tableParams.pagination}
        />
      </Card>

      <Modal
        title={`${selectedRow ? "Cập nhật" : "Thêm"} bài viết`}
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
            rules={[{ required: true, message: "Hãy nhập vào tiêu đề" }]}
          >
            <Input
              autoComplete="false"
              size="large"
              placeholder="Nhập vào tiêu đề"
            />
          </Form.Item>

          <Form.Item
            name={["category", "id"]}
            label="Danh mục bài viết"
            rules={[{ required: true, message: "Hãy chọn danh mục bài viết" }]}
          >
            <Select
              showSearch
              options={categoryOptions}
              optionFilterProp="label"
            />
          </Form.Item>
          <Form.Item
            name={["user", "id"]}
            noStyle
            initialValue={userInfo?.id}
          ></Form.Item>
          <Form.Item
            name="thumbnail"
            label="Thumbnail"
            rules={[
              {
                required: true,
                message: "Hãy nhập vào đường dẫn của ảnh thumbnail",
              },
            ]}
          >
            <Input
              autoComplete="false"
              size="large"
              placeholder="Nhập vào đường dẫn của ảnh thumbnail"
            />
          </Form.Item>

          <Form.Item
            name="content"
            label="Nội dung"
            rules={[
              {
                required: true,
                message: "Hãy nhập vào nội dung bài viết",
              },
            ]}
          >
            <Input.TextArea
              autoComplete="false"
              size="large"
              placeholder="Nội dung"
            />
          </Form.Item>
          <Form.Item
            name="brief"
            label="Mô tả ngắn"
            rules={[
              {
                required: true,
                message: "Hãy nhập vào mô tả ngắn bài viết",
              },
            ]}
          >
            <Input.TextArea
              autoComplete="false"
              size="large"
              placeholder="Mô tả ngắn"
            />
          </Form.Item>
          <Form.Item
            shouldUpdate={(prevValues, curValues) =>
              prevValues.status !== curValues.status
            }
          >
            {({ getFieldValue }) => {
              const status = selectedRow ? getFieldValue("status"): "PUBLISHED";
              return (
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  name="status"
                  label="Trạng thái"
                  required
                >
                  <Switch
                    onChange={changeStatus}
                    checked={status === "PUBLISHED"}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xoá bài viết"
        open={isShowConfirmDelete}
        cancelText="Hủy"
        okText="Xoá"
        okButtonProps={{ danger: true }}
        maskClosable={false}
        onOk={handleDelete}
        onCancel={handleClose}
      >
        {/* Bạn có đồng ý xóa bài viết {selectedRow?.name} hay không? */}
      </Modal>
    </>
  );
};

export default PostPage;

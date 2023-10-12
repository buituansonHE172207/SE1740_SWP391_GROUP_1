import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Layout } from "antd";
import { Link } from "react-router-dom";
import { URL_CONFIG } from "../../config/url.config";

type FieldType = {
  email: string;
  fullName: string;
  password: string;
  rePassword: string;
  // remember?: string;
};

const RegisterPage = () => {
  const [form] = Form.useForm();
  const onFinish = (values: FieldType) => {
    console.log(values);
  };

  return (
    <Layout
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card style={{ width: 560 }}>
        <Form
          form={form}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          // initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div>
            <Form.Item<FieldType>
              name="email"
              rules={[
                { required: true, message: "Hãy nhập vào email" },
                {
                  validator(rule, value, callback) {
                    const emailRegex =
                      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

                    if (!value || emailRegex.test(value)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("Email không đúng định dạng");
                    }
                  },
                },
              ]}
            >
              <Input
                addonBefore={<UserOutlined />}
                placeholder="example@gmail.com"
                size="large"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="fullName"
              rules={[{ required: true, message: "Hãy nhập họ và tên" }]}
            >
              <Input 
              addonBefore={<UserOutlined />}
              placeholder="Họ và tên" size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
            >
              <Input.Password
                addonBefore={<LockOutlined />}
                placeholder="Mật khẩu"
                size="large"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="rePassword"
              rules={[
                { required: true, message: "Hãy nhập lại mật khẩu" },
                {
                  validator(rule, value, callback) {
                    const password = form.getFieldValue("password");
                    if (value && value !== password) {
                      return Promise.reject("Mật khẩu nhập lại không đúng");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password
                addonBefore={<LockOutlined />}
                placeholder="Nhập lại mật khẩu"
                size="large"
              />
            </Form.Item>
            {/* <Form.Item<FieldType> name="remember" valuePropName="checked" style={{marginBottom: 0}}>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item> */}
          </div>

          <Form.Item<FieldType>>
            <Button type="primary" htmlType="submit" size="large">
              Đăng ký
            </Button>
          </Form.Item>
          <Link to={URL_CONFIG.LOGIN}>Đăng nhập</Link>
        </Form>
      </Card>
    </Layout>
  );
};

export default RegisterPage;

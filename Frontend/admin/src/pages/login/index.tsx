import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Layout, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { URL_CONFIG } from "../../config/url.config";
import { useAuth } from "../../context/AuthContext";
import { TOKEN } from "../../http";
import { login } from "../../services/auth.service";
import { getUserByEmail } from "../../services/user.service";

type FieldType = {
  email: string;
  password: string;
  // remember?: string;
};

const LoginPage = () => {
  const { setUserInfo } = useAuth();
  const [form] = useForm();
  const navigate = useNavigate();
  const onFinish = async (values: FieldType) => {
    try {
      const res = await login(values);
      localStorage.setItem(TOKEN, res.token);
      const userInfo = await getUserByEmail(values.email);
      await setUserInfo(userInfo);
      notification.success({
        message: "Đăng nhập thành công",
      });
      navigate(URL_CONFIG.HOME);
    } catch (error: any) {
      if (error.status === 404) {
        form.setFields([
          {
            name: "email",
            value: values.email,
            errors: [error.data],
          },
        ]);
      } else if (error.status === 403) {
        form.setFields([
          {
            name: "email",
            value: values.email,
          },
          {
            name: "password",
            value: "",
            errors: ["Mật khẩu không đúng"],
          },
        ]);
      } else {
        console.log("Error when login: ", error);
      }
    }
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
              name="password"
              rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
            >
              <Input.Password
                addonBefore={<LockOutlined />}
                placeholder="Mật khẩu"
                size="large"
              />
            </Form.Item>

            {/* <Form.Item<FieldType> name="remember" valuePropName="checked" style={{marginBottom: 0}}>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item> */}
          </div>

          <Form.Item<FieldType>>
            <Button type="primary" htmlType="submit" size="large">
              Đăng nhập
            </Button>
          </Form.Item>
          {/* <Link to={URL_CONFIG.REGISTER}>Đăng ký</Link> */}
        </Form>
      </Card>
    </Layout>
  );
};

export default LoginPage;

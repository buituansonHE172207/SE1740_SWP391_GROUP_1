import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Layout } from "antd";
import decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { URL_CONFIG } from "../../config/url.config";
import { useAuth } from "../../context/AuthContext";
import { TOKEN } from "../../http";
import { login } from "../../services/auth.service";

type FieldType = {
  email: string;
  password: string;
  // remember?: string;
};

type Authority = {
  authority: string;
};

type TokenType = {
  authorities: Authority[];
  sub: string;
  iat: number;
  exp: number;
};

const LoginPage = () => {
  const { login: setLogin } = useAuth();
  const navigate = useNavigate();
  const onFinish = async (values: FieldType) => {
    try {
      const res = await login(values);
      localStorage.setItem(TOKEN, res.token);
      const decodedToken = await decode(res.token) as TokenType;
      const role = decodedToken.authorities[0].authority;
      await setLogin(role);
      navigate(URL_CONFIG.BOOK_CATEGORY);
    } catch (error) {
      console.log("Error decoding JWT: ", error);
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
          <Link to={URL_CONFIG.REGISTER}>Đăng ký</Link>
        </Form>
      </Card>
    </Layout>
  );
};

export default LoginPage;

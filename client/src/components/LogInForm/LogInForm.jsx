import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { setLoggStatus } from "../../store/loggSlice";
import { useMutation } from "react-query";
import { InfoService } from "../../service/info.service";
import { useState } from "react";

const LogInForm = () => {
  const { mutateAsync } = useMutation(InfoService.logIn, {
    mutationKey: "mutate",
  });
  const [isCodeSent, getIsCodeSent] = useState(false);
  const [isCorrectCode, setIsCorrectCode] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  const { mutateAsync: sendCode } = useMutation(InfoService.checkCode, {
    mutationKey: "checking Code",
  });
  const onFinish = async (values) => {
    console.log(values);
    const data = await mutateAsync(values);
    if (data.message) {
      getIsCodeSent((prev) => !prev);
    } else {
      dispatch(setLoggStatus(false));
      messageApi.open({
        type: "error",
        content: "Неверный email или пароль",
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = async (e) => {
    console.log(e.target.value);
    if (e.target.value.length === 3) {
      const res = await sendCode(e.target.value);
      if (res === "ok") {
        dispatch(setLoggStatus(true));
      } else {
        setIsCorrectCode((prev) => !prev);
        messageApi.open({
          type: "error",
          content: "Неверный код",
        });
      }
    }
  };
  return (
    <div className="flex justify-center my-60">
      {contextHolder}
      <Form
        name="basic"
        initialValues={{
          email: "",
          password: "",
          code: "",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}>
          <Input.Password />
        </Form.Item>
        {isCodeSent && (
          <Input
            status={isCorrectCode ? "" : "error"}
            placeholder="Введите код отправленный вам на email"
            className="mb-3"
            onChange={handleChange}
          />
        )}
        <Form.Item>
          <Button htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LogInForm;

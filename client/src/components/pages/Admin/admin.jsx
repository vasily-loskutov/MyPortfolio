import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Space, Input, Divider, Form, Button, message, Upload } from "antd";
import config from "@config";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { InfoService } from "@service/info.service";

const Admin = () => {
  const { isLoading, data, error } = useQuery(
    "skills list",
    InfoService.getAll
  );
  const [updateProjectId, setUpdateProjectId] = useState(0);
  const [updateSocial, setUpdateSocial] = useState(0);
  const client = useQueryClient();
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileSocial, setSelectedFileSocial] = useState();
  console.log(selectedFileSocial);
  const { mutateAsync: deleteProject } = useMutation(
    InfoService.deleteProject,
    {
      mutationKey: "delete Project",
      onSuccess: () => {
        client.invalidateQueries({ queryKey: "getProjectInfo" });
      },
    }
  );
  const handleDelete = async (values) => {
    await deleteProject(values);
  };
  const { mutateAsync } = useMutation(InfoService.updateInfo, {
    mutationKey: "info update",
  });

  const { data: dataProject, isLoading: projectIsLoading } = useQuery(
    "getProjectInfo",
    InfoService.getProjectInfo
  );

  const { mutateAsync: saveDoc } = useMutation(InfoService.saveDoc, {
    mutationKey: "saveDoc",
    onSuccess: () => {
      client.invalidateQueries({ queryKey: "getProjectInfo" });
    },
  });
  const { mutateAsync: updateProject } = useMutation(
    InfoService.updateProject,
    {
      mutationKey: "update project info",
    }
  );
  const onFinishUpdate = async (values) => {
    values.id = updateProjectId;
    await updateProject(values);
  };
  const onFinishUpLoad = async (values) => {
    const formData = new FormData();
    console.log(selectedFile);
    formData.append("file", selectedFile);
    formData.append("link", values.link);
    formData.append("name", values.name);
    formData.append("skills", values.skills);

    await saveDoc(formData);
  };
  const onFinish = async (values) => {
    await mutateAsync(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Данные не отправлены");
    console.log("Failed:", errorInfo);
  };

  const handleChange = async (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleChangeSocial = async (e) => {
    setSelectedFileSocial(e.target.files[0]);
  };
  const { mutateAsync: createSocial } = useMutation(InfoService.createSocial, {
    mutationKey: "social Create",
    onSuccess: () => client.invalidateQueries("get Socials"),
  });
  const { data: socials, isLoading: isLoadSocial } = useQuery(
    "get Socials",
    InfoService.getSocial
  );
  const onFinishSocial = async (values) => {
    const formData = new FormData();
    formData.append("file", selectedFileSocial);
    formData.append("link", values.linkSocial);
    await createSocial(formData);
  };
  const { mutateAsync: socialDelete } = useMutation(InfoService.deleteSocial, {
    mutationKey: "delete Social",
    onSuccess: () => client.invalidateQueries("get Socials"),
  });
  const onSocialDelete = async (id) => {
    console.log(id);
    await socialDelete(id);
  };
  const { mutateAsync: socialUpdate } = useMutation(InfoService.updateSocial, {
    mutationKey: "update social",
    onSuccess: () =>
      client.invalidateQueries(["get Socials", "get social in footer"]),
  });
  const onFinishSocialUpdate = async (values) => {
    values.id = updateSocial;
    await socialUpdate(values);
  };
  console.log(socials);
  if (isLoading) return "loading";
  return (
    <div className="flex justify-center my-20 grow shrink-0 basis-auto">
      <div className="flex justify-center gap-x-6 ">
        <Space direction="vertical" className="w-60 flex mb-7 flex-col">
          <Divider>Skills</Divider>
          <Form
            className="flex justify-center flex-col gap-y-2"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              frontendSkills: data[0].frontendSkills,
              backendSkills: data[0].backendSkills,
              email: data[0].email,
              phone: data[0].phone,
            }}>
            <Form.Item
              name="frontendSkills"
              rules={[
                {
                  required: true,
                  message: "Please input your FrontendSkills!",
                },
              ]}>
              <Input placeholder="Enter your skills Frontend" />
            </Form.Item>
            <Form.Item
              name="backendSkills"
              rules={[
                {
                  required: true,
                  message: "Please input your BackendSkills!",
                },
              ]}>
              <Input placeholder="Enter your skills Backend" />
            </Form.Item>

            <Divider>Contacts</Divider>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}>
              <Input placeholder="Phone Number" />
            </Form.Item>
            <Button htmlType="submit">Send</Button>
          </Form>
        </Space>

        <Space direction="vertical" className="w-60 flex mb-7 flex-col">
          <Divider>Projects</Divider>

          {projectIsLoading
            ? "Loading"
            : dataProject?.map((project) => (
                <Form
                  onFinish={onFinishUpdate}
                  onFinishFailed={onFinishFailed}
                  initialValues={{
                    link: project.link,
                    name: project.name,
                    skills: project.skills,
                  }}
                  key={project.id}>
                  <img
                    src={`upload/${project.path}`}
                    className={`w-45 h-45  bg-cover mb-3 `}
                  />
                  <Form.Item
                    name={"name"}
                    rules={[
                      {
                        required: true,
                        message: "Please input name projects!",
                      },
                    ]}>
                    <Input placeholder="name projects" />
                  </Form.Item>
                  <Form.Item
                    name="link"
                    rules={[
                      {
                        required: true,
                        message: "Please input link projects!!",
                      },
                    ]}>
                    <Input placeholder="name projects" />
                  </Form.Item>
                  <Form.Item
                    name="skills"
                    rules={[
                      {
                        required: true,
                        message: "Please input skills projects!",
                      },
                    ]}>
                    <Input placeholder="projects skills" />
                  </Form.Item>
                  <Button
                    htmlType="submit"
                    className="w-full"
                    onClick={() => setUpdateProjectId(project.id)}>
                    Send
                  </Button>
                  <Button
                    danger
                    className="mt-3 w-full"
                    onClick={() =>
                      handleDelete({ id: project.id, path: project.path })
                    }>
                    Delete this project
                  </Button>

                  <Divider></Divider>
                </Form>
              ))}
          <Form
            className="flex justify-center flex-col gap-y-2"
            onFinish={onFinishUpLoad}
            onFinishFailed={onFinishFailed}
            encType="multipart/form-data">
            <Form.Item
              name="upload"
              rules={[
                {
                  required: true,
                  message: "Please change upLoad!",
                },
              ]}>
              <input type="file" onChange={handleChange} />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input name projects!",
                },
              ]}>
              <Input placeholder="name projects" />
            </Form.Item>
            <Form.Item
              name="link"
              rules={[
                {
                  required: true,
                  message: "Please input link projects!",
                },
              ]}>
              <Input placeholder="link to gitHub" />
            </Form.Item>
            <Form.Item
              name="skills"
              rules={[
                {
                  required: true,
                  message: "Please input skills projects!",
                },
              ]}>
              <Input placeholder="projects skills" />
            </Form.Item>
            <Button htmlType="submit">Send</Button>
          </Form>
        </Space>
        <Space direction="vertical" className="w-60 flex mb-7 flex-col">
          <Divider>Social</Divider>
          {isLoadSocial
            ? "Loading"
            : socials.map((social) => {
                return (
                  <Form
                    onFinish={onFinishSocialUpdate}
                    onFinishFailed={onFinishFailed}
                    initialValues={{
                      linkSocial: social.linkSocial,
                    }}>
                    <img
                      src={`upload/${social.filename}`}
                      className={`w-20 h-20  bg-cover mb-3 `}
                    />

                    <Form.Item
                      name="linkSocial"
                      rules={[
                        {
                          required: true,
                          message: "Please input social ",
                        },
                      ]}>
                      <Input placeholder="link to social" />
                    </Form.Item>
                    <Button
                      danger
                      className="mt-3 w-full"
                      onClick={() =>
                        onSocialDelete({
                          filename: social.filename,
                          id: social.id,
                        })
                      }>
                      Delete this project
                    </Button>
                    <Button
                      htmlType="submit"
                      className=" mt-3 w-full"
                      onClick={() => setUpdateSocial(social.id)}>
                      Send
                    </Button>
                  </Form>
                );
              })}
          <Divider></Divider>
          <Form onFinish={onFinishSocial} onFinishFailed={onFinishFailed}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please change social ico",
                },
              ]}>
              <input type="file" onChange={handleChangeSocial} />
            </Form.Item>
            <Form.Item
              name="linkSocial"
              rules={[
                {
                  required: true,
                  message: "Please input social ",
                },
              ]}>
              <Input placeholder="link to social" />
            </Form.Item>
            <Button htmlType="submit" className=" w-full">
              Send
            </Button>
          </Form>
        </Space>
      </div>
    </div>
  );
};

export default Admin;

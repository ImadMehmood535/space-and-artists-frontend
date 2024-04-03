import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import {
  headers,
  notificationError,
  notificationSuccess,
} from "../../../common/admin/constants";

import axios from "axios";
import { Editor as TinyMceEditor } from "@tinymce/tinymce-react";

import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditBlog = ({ location: { state: id } }) => {
  // get blog by id
  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState({});
  const getBlog = (idd) => {
    setIsLoading(true);
    axios
      .get("blogs/" + idd?.id, {
        headers: headers.simple,
      })
      .then(({ data }) => {
        setBlog(data);
        setIsLoading(false);
        notificationSuccess("Blog", "Blog loaded successfully!");
      })
      .catch((err) => {
        console.error(err.response);
        setIsLoading(false);
        notificationError("Blog", "Something went wrong please try again!");
      });
  };
  useEffect(() => {
    console.log(id);
    getBlog(id);
    return () => {
      setIsLoading(false);
      setBlog({});
    };
  }, []);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log({
      ...values,
      coverImage: fileList[0],
      image: image[0],
      date: new Date().toTimeString(),
      description: JSON.stringify(description),
    });
  };
  const { Item } = Form;
  const { TextArea } = Input;
  // Cover Image
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => setFileList(newFileList);
  // Image
  const [image, setImage] = useState([]);
  const onChangeImage = ({ fileList: newFileList }) => setImage(newFileList);
  // editor
  const [description, setDescription] = useState("asdasd");
  const initialValue = "<p>Enter Blog Details... </p>";

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <>
      <div className="DBlock h-auto">
        <h2>Edit Blog</h2>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          style={{ marginTop: 24 }}
          size="large"
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Item
            label="Blog Title"
            name="title"
            rules={[{ required: true, message: "Please input Blog Title!" }]}
          >
            <Input placeholder="Enter Blog Title" />
          </Item>
          <Item
            label="Blog Sub Title"
            name="subtitle"
            rules={[
              { required: true, message: "Please input Blog Sub Title!" },
            ]}
          >
            <TextArea rows={3} placeholder="Enter Blog Subtitle" />
          </Item>
          {/* Cover Image */}

          <Item
            name="coverImage"
            label="Upload Cover Image"
            getValueFromEvent={({ file }) => file.originFileObj}
          >
            <ImgCrop rotate>
              <Upload
                maxCount={1}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length === 1 ? "" : "Upload"}
              </Upload>
            </ImgCrop>
          </Item>
          {/* Image */}
          <Item
            name="image"
            label="Upload Image"
            getValueFromEvent={({ file }) => file.originFileObj}
          >
            <ImgCrop rotate>
              <Upload
                maxCount={1}
                listType="picture-card"
                fileList={image}
                onChange={onChangeImage}
                onPreview={onPreview}
              >
                {image.length === 1 ? "" : "Upload"}
              </Upload>
            </ImgCrop>
          </Item>
          {/* Name */}
          <Item label="Name (optional)" name="name">
            <Input placeholder="Enter Name" />
          </Item>
          {/* Published By */}
          <Item
            label="Author"
            name="publishedBy"
            rules={[{ required: true, message: "Please input Author Name!" }]}
          >
            <Input placeholder="Enter Author Name" />
          </Item>
          <Item
            name="description"
            label="Blog Description "
            rules={[{ message: "Enter Description!" }]}
          >
            {
              <div>
                <TinyMceEditor
                  apiKey="b8iftvzjcst8bb04avbrfsnhoho9husalwzfnxxo1njzzwit"
                  initialValue={initialValue}
                  init={{
                    height: 500,
                    // menubar: false,
                    menubar: "edit view insert format tools ",
                    plugins:
                      "print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable",
                    // "link image code emoticons fullscreen imagetools insertdatetime media wordcount preview visualblocks",
                    toolbar1:
                      "undo redo| visualblocks | bold italic underline strikethrough | fontselect fontsizeselect formatselect | insertdatetime |alignleft aligncenter alignright alignjustify |",
                    toolbar2:
                      " numlist | bullist | forecolor | backcolor | casechange | removeformat|  code | image media emoticons | fullscreen preview | a11ycheck",
                  }}
                  value={description}
                  onEditorChange={(e) => setDescription(e)}
                />
              </div>
            }
          </Item>
          <Item style={{ float: "right" }}>
            <Button type="primary" htmlType="submit">
              Update Blog
            </Button>
          </Item>
        </Form>
      </div>
    </>
  );
};

export default EditBlog;

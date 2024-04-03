import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Editor as TinyMceEditor } from "@tinymce/tinymce-react";

// import draftToHtml from 'draftjs-to-html';

import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const AddBlog = () => {
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

  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );
  // const updateTextDescription = async (state) => {
  //   await setEditorState(state);
  //   const data = convertToRaw(editorState.getCurrentContent());
  //   // console.log(data);
  // };

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
  // function uploadImageCallBack(file) {
  //   return new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
  //     xhr.open("POST", "https://api.imgur.com/3/image");
  //     xhr.setRequestHeader("Authorization", "Client-ID 8d26ccd12712fca");
  //     const data = new FormData(); // eslint-disable-line no-undef
  //     data.append("image", file);
  //     xhr.send(data);
  //     xhr.addEventListener("load", () => {
  //       const response = JSON.parse(xhr.responseText);
  //       resolve(response);
  //     });
  //     xhr.addEventListener("error", () => {
  //       const error = JSON.parse(xhr.responseText);
  //       reject(error);
  //     });
  //   });
  // }
  return (
    <>
      {/* <TinyMceEditor
        apiKey="b8iftvzjcst8bb04avbrfsnhoho9husalwzfnxxo1njzzwit"
        initialValue="<p>Enter Blog Description</p>"
        init={{
          height: 500,
          // menubar: false,
          plugins: "link image code emoticons fullscreen imagetools insertdatetime media wordcount preview visualblocks",
          toolbar:
            "undo redo| visualblocks | bold italic underline | insertdatetime |alignleft aligncenter alignright | code| image media emoticons | fullscreen preview",
        }}
        onChange={() => {}}
      /> */}
      {/* <TinyMceEditor
          apiKey="b8iftvzjcst8bb04avbrfsnhoho9husalwzfnxxo1njzzwit"
          initialValue="<p>Initial content</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: ["advlist autolink lists link anchor paste image"],
            
            toolbar:
              "bold italic | \
				       alignleft aligncenter alignright alignjustify  \
				       bullist numlist image removeformat",
          }}
          onChange={() => {}}
        /> */}
      <div className="DBlock h-auto">
        <h2>Add Blog</h2>
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
              // <Editor
              //   toolbar={{
              //     image: {
              //       uploadCallback: uploadImageCallBack,
              //       alt: { present: true, mandatory: false },
              //     },
              //   }}
              //   editorState={editorState}
              //   toolbarClassName="toolbarClassName"
              //   wrapperClassName="wrapperClassName"
              //   editorClassName="editorClassName"
              //   onEditorStateChange={updateTextDescription}
              // />
            }
          </Item>
          <Item style={{ float: "right" }}>
            <Button type="primary" htmlType="submit">
              Add Blog
            </Button>
          </Item>
        </Form>
      </div>
    </>
  );
};

export default AddBlog;

// title;
// subtitle;
// coverImage;
// image;
// name;
// date;
// publishedBy;
// description;

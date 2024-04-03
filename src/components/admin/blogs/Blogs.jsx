import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  headers,
  notificationError,
  notificationSuccess,
} from "../../../common/admin/constants";

import { useHistory } from "react-router-dom";
import axios from "axios";

const Blogs = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const getBlogs = () => {
    setIsLoading(true);
    axios
      .get(`blogs`, {
        headers: headers.simple,
      })
      .then(({ data }) => {
        setBlogs(data);
        setIsLoading(false);
        notificationSuccess("Blog", "Blog loaded successfully!");
      })
      .catch((err) => {
        console.error(err.response);
        setIsLoading(false);
        notificationError("Blog", "Something went wrong please try again!");
      });
  };
  useEffect(getBlogs, []);

  const handleDelete = (id) => {
    axios
      .delete(`blogs/${id}`, {
        headers: headers.simple,
      })
      .then(() => {
        getBlogs();
      })
      .catch((err) => {
        console.error(err.response);
        notificationError("Blog", "Something went wrong please try again!");
      });
  };

  const data = [
    {
      id: 1,
      title: "First Blog",
      createdOn: new Date().toLocaleDateString(),
      author: "John Doe",
    },
    {
      id: 2,
      title: "Second Blog",
      createdOn: new Date().toLocaleDateString(),
      author: "John Doe",
    },
    {
      id: 3,
      title: "Third Blog",
      createdOn: new Date().toLocaleDateString(),
      author: "John Doe",
    },
  ];
  const columns = [
    {
      key: "title",
      dataIndex: "title",
      title: "Blog Title",
      width: "25%",
    },
    {
      key: "author",
      dataIndex: "author",
      title: "Author",
      width: "25%",
    },
    {
      key: "createdOn",
      dataIndex: "createdOn",
      title: "Created On",
      width: "25%",
    },
    {
      key: "actions",
      title: "Actions",
      width: "25%",
      render: (entry, record) => (
        <Space>
          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            icon={<EditOutlined />}
            shape="circle"
            type="primary"
            onClick={() => {
              history.push("/admin/edit-blog", { id: entry.id });
            }}
          />
          <Popconfirm
            title="Are you sure ?"
            onConfirm={() => handleDelete(entry.id)}
            onCancel={() => {}}
            placement="left"
            okText="Yes"
            cancelText="No"
          >
            <Button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              icon={<DeleteOutlined />}
              shape="circle"
              type="primary"
              danger
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <Fragment>
      <div className="MainAdminWrapper">
        <div className="UserTableDiv DBlock">
          <Fragment>
            <div className="UserTableDiv DBlock">
              <div className="TableTitle DFlex">
                <h2>Blogs</h2>
                <Link to="/admin/add-blog" className="AddBtn">
                  Add Blog
                </Link>
              </div>
            </div>
          </Fragment>
          <Table
            style={{ marginTop: 24 }}
            columns={columns}
            dataSource={data}
            loading={isLoading}
            rowKey={(id) => id}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Blogs;

import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, message, Table } from "antd";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);

  // table data
  const columns = [
    {
      title: "Item",
      dataIndex: "item",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Notes",
      dataIndex: "note",
    },
    {
      title: "Actions",
    },
  ];

  // getAll Transactions
  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post("/transactions/get-transaction", {
        userid: user._id,
      });
      setLoading(false);
      setAllTransaction(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      message.error("Fetch Issue with Loading Expenses");
    }
  };

  // userEffect Hook
  useEffect(() => {
    getAllTransactions();
  }, []);

  //form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      await axios.post("/transactions/add-transaction", {
        ...values,
        userid: user._id,
        key: user._id,
      });
      message.success("Expense Added Successfully");
      setLoading(false);
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add expense");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>range filters</div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        <Table columns={columns} dataSource={allTransaction} />
      </div>
      <Modal
        title="Add Expense"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Item Name" name="item">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Amount" name="amount">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Transportation">
                Transportation
              </Select.Option>
              <Select.Option value="Utilities">Utilities</Select.Option>
              <Select.Option value="Housing">Housing</Select.Option>
              <Select.Option value="Insurance">Insurance</Select.Option>
              <Select.Option value="Medical & Healthcare">
                Medical & Healthcare
              </Select.Option>
              <Select.Option value="Bank payments">Bank payments</Select.Option>
              <Select.Option value="Personal Spending">
                Personal Spending
              </Select.Option>
              <Select.Option value="Entertainment">Entertainment</Select.Option>
              <Select.Option value="Miscellaneous">Miscellaneous</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Notes" name="note">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;

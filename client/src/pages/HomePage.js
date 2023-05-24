import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import Layout from "../components/Layout/Layout";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  //form handling
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Layout>
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
      <div className="content"></div>
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

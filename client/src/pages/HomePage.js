import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
// import { icons } from "antd/es/image/PreviewGroup";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("30");
  const [selectedDate, setSelectedDate] = useState([]);
  const [viewData, setViewData] = useState("table");
  // const [category, setCategory] = useState("all");
  const [editable, setEditable] = useState(null);

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
      render: (text) => <span>{moment(text).format("Do MMM, YYYY")}</span>,
    },
    {
      title: "Notes",
      dataIndex: "note",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  // userEffect Hook
  useEffect(() => {
    // getAll Transactions
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/api/v1/transactions/get-transaction", {
          userid: user._id,
          frequency,
          selectedDate,
        });
        setLoading(false);
        setAllTransaction(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Fetch Issue with Loading Expenses");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate]);

  // delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/transactions/delete-transaction", {
        transactionId: record._id,
      });
      setLoading(false);
      message.success("Transaction Deleted");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable to Delete");
    }
  };

  //form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/api/v1/transactions/edit-transaction", {
          payload: {
            ...values,
            userId: user._id,
            key: Math.random(),
          },
          transactionId: editable._id,
        });
        setLoading(false);
        message.success("Expense Added Successfully");
      } else {
        await axios.post("/api/v1/transactions/add-transaction", {
          ...values,
          userid: user._id,
          key: Math.random(),
        });
        setLoading(false);
        message.success("Expense Added Successfully");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add expense");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Range</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <center>
          <div>
            <center>
              <div className="text">
                <h2>Expenditure Report</h2>
              </div>
            </center>
            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <UnorderedListOutlined
                    className={`mx-2 ${
                      viewData === "table" ? "active-icon" : "inactive-icon"
                    }`}
                    onClick={() => setViewData("table")}
                  />
                  <h6
                    className={`mx-2 ${
                      viewData === "table" ? "active-icon" : "inactive-icon"
                    }`}
                  >
                    List
                  </h6>
                </div>
                <div className="col-sm">
                  <AreaChartOutlined
                    className={`mx-2 ${
                      viewData === "analytics" ? "active-icon" : "inactive-icon"
                    }`}
                    onClick={() => setViewData("analytics")}
                  />
                  <h6
                    className={`mx-2 ${
                      viewData === "analytics" ? "active-icon" : "inactive-icon"
                    }`}
                  >
                    Pie Chart
                  </h6>
                </div>
                <div className="col-sm">
                  <BarChartOutlined
                    className={`mx-2 ${
                      viewData === "forecast" ? "active-icon" : "inactive-icon"
                    }`}
                    onClick={() => setViewData("forecast")}
                  />
                  <h6
                    className={`mx-2 ${
                      viewData === "forecast" ? "active-icon" : "inactive-icon"
                    }`}
                  >
                    Forecast
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </center>

        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
        {/* category filter */}
        {/* <div>
          <h6>Select category:</h6>
          <Select value={category} onChange={(values) => setCategory(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="Food">Food</Select.Option>
            <Select.Option value="Transportation">Transportation</Select.Option>
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
        </div> */}
      </div>
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransaction} />
        ) : (
          <Analytics allTransaction={allTransaction} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Expense" : "Add Expense"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
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

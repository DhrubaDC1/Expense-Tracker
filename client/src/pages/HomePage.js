import React, { useState, useEffect, useReducer } from "react";
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "../components/Layout/Layout"; // importing Layout.js for home ui
import axios from "axios"; // Axios is a promised-based HTTP client for JavaScript.
import Spinner from "../components/Spinner"; // importing Spinner element from Ant Design
import moment from "moment"; // for formatting date & time
import Analytics from "../components/Analytics"; // importing Analytics page

const { RangePicker } = DatePicker; // for including datepicker

const HomePage = () => {
  const [showModal, setShowModal] = useState(false); // for modal
  const [loading, setLoading] = useState(false); // for spinner
  const [allTransaction, setAllTransaction] = useState([]); // for getting transactions
  const [frequency, setFrequency] = useState("30"); // for range picker
  const [selectedDate, setSelectedDate] = useState([]); // for range picker custom
  const [viewData, setViewData] = useState("table"); // for table/analytics/forecast
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0); // for auto ui update
  const [editable, setEditable] = useState(null); // for updating using modal

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
        const user = JSON.parse(localStorage.getItem("user")); // getting data from browser local storage by userid
        setLoading(true); // for turning on spinner
        const res = await axios.post("/api/v1/transactions/get-transaction", {
          userid: user._id,
          frequency,
          selectedDate,
        });
        setLoading(false); // for turning off spinner
        setAllTransaction(res.data); // for getting all transaction
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Fetch Issue with Loading Expenses");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, reducerValue]);

  // delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true); // for turning on spinner
      await axios.post("/api/v1/transactions/delete-transaction", {
        transactionId: record._id, // deleting by id
      });
      setLoading(false); // for turning off spinner
      message.success("Transaction Deleted");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable to Delete");
    }
    forceUpdate(); // auto updating ui
  };

  //form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // getting data from browser local storage by userid
      setLoading(true); // for turning on spinner
      if (editable) {
        // editing by id
        await axios.post("/api/v1/transactions/edit-transaction", {
          payload: {
            ...values,
            userId: user._id,
            key: Math.random(),
          },
          transactionId: editable._id,
        });
        setLoading(false); // for turning off spinner
        message.success("Expense Added Successfully");
      } else {
        // for adding transaction with id
        await axios.post("/api/v1/transactions/add-transaction", {
          ...values,
          userid: user._id,
          key: Math.random(),
        });
        setLoading(false); // for turning off spinner
        message.success("Expense Added Successfully");
      }
      setShowModal(false); // close modal
      setEditable(null); // close edit mode
    } catch (error) {
      setLoading(false);
      message.error("Failed to add expense");
    }
    forceUpdate(); // auto updating ui
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
              value={selectedDate} // set range
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
                    // if selected list
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
                    // if selected analytics
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
                    // if selected forecast
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
          <button // add new button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
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

// exporting homepage functions
export default HomePage;

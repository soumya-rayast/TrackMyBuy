import './App.css'
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { publicRequest } from "./requestMethod";
function App() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [updatedId, setUpdatedID] = useState('');
  const [updateLabel, setUpdatedLabel] = useState('');
  const [updateValue, setUpdatedValue] = useState('');
  const [updateDate, setUpdatedDate] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const handleAddExpense = () => {
    setShowAddExpense(!showAddExpense)
  }
  const handleShowReport = () => {
    setShowReport(!showReport)
  }
  const handleShowEdit = (id) => {
    setShowEdit(!showEdit)
    setUpdatedID(id);
  }
  const handleUpdateExpense = async () => {
    if (updatedId) {
      try {
        await publicRequest.put(`/expenses/${updatedId}`, {
          value: updateValue,
          label: updateLabel,
          date: updateDate
        })
        setExpenses(expenses.map(expense => expense._id === updatedId ? { ...expense, label: updateLabel, value: updateValue, date: updateDate } : expense));
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleExpense = async () => {
    try {
      const res = await publicRequest.post('/expenses', {
        label,
        date,
        value: amount
      });
      setExpenses([...expenses, res.data]);
      setLabel('');
      setAmount(0);
      setDate('');
      setShowAddExpense(false)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const getExpenses = async () => {
      try {
        const res = await publicRequest.get("expenses");
        setExpenses(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getExpenses();
  }, [])
  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/expenses/${id}`)
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
  const filteredExpenses = expenses.filter((expense) =>
    expense.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSum = filteredExpenses.reduce((acc, curr) => acc + curr.value, 0);
  return (
    <>
      <div className='flex flex-col justify-center items-center mt-[3%] w-[90%] mr-[5%] ml-[5%]'>
        <h1 className='text-3xl font-medium text-blue-500'>TrackMyBuy </h1>
        <p className='text-xl font-medium text-blue-500'>| Expense Tracking Web Application |</p>
        <div className='relative flex items-center justify-between mt-5 w-[100%]'>
          <div className='relative flex justify-between w-[300px]'>
            <button className='bg-green-500 text-white p-4 outline-none cursor-pointer hover:bg-green-400 border-none text-medium rounded-md' onClick={handleAddExpense}>Add expense</button>
            <button className='bg-blue-500 text-white p-4 outline-none cursor-pointer hover:bg-blue-400 border-none text-medium rounded-md' onClick={handleShowReport}>Expense Report</button>
          </div>

          {/* add expense */}
          {
            showAddExpense && (<div className='absolute z-[999] flex flex-col p-[10px] top-[40px] left-[30px] h-[380px] w-[500px] bg-white shadow-xl'>
              <IoIosCloseCircle className='flex justify-end text-2xl text-red-500 cursor-pointer' onClick={handleAddExpense} />
              <label
                htmlFor=""
                className='mt-[10px] font-semibold text-[18px]'>
                Expense Name
              </label>
              <input
                onChange={(e) => setLabel(e.target.value)}
                type="text"
                placeholder='Car Rent'
                className='border-blue-500 outline-none border-2 p-[10px]' />

              <label
                htmlFor=""
                className='mt-[10px] font-semibold text-[18px]'>
                Expense Date
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                placeholder=''
                className='border-blue-500 outline-none border-2 p-[10px]' />

              <label
                htmlFor=""
                className='mt-[10px] font-semibold text-[18px]'>
                Expense Amount
              </label>
              <input
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                placeholder='50'
                className='border-blue-500 outline-none border-2 p-[10px]' />
              <button className='bg-green-500 text-white p-[10px] cursor-pointer my-[10px]' onClick={handleExpense}>
                Add Expense
              </button>
            </div>)
          }
          {/* show pie report */}
          {
            showReport && (
              <div className='absolute z-[999] flex flex-col p-[10px] top-[40px] left-[100px] h-[380px] w-[500px] bg-white shadow-xl'>
                <IoIosCloseCircle className='flex justify-end text-2xl text-red-500 cursor-pointer' onClick={handleShowReport} />
                <PieChart
                  series={[
                    {
                      data: expenses,
                      innerRadius: 30,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -90,
                      endAngle: 180,
                      cx: 150,
                      cy: 150,
                    }
                  ]}
                />
                <div>
                  <strong>Total Expenses:</strong> ₹{totalSum}
                </div>
              </div>)
          }
          <div>
            <input type="text" placeholder='Search...' value={searchTerm} className='p-[10px] w-[200px] border-2 border-[#69a3d8] rounded-md' onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        {/* display data */}
        <div className='flex flex-col '>
          {
            filteredExpenses.map((expense, index) => (
              <div className='relative flex justify-between items-center w-[80vw] h-[100px] bg-blue-300 my-[20px] py-[10px] rounded-lg' key={index}>
                <h2 className='m-[20px] text-black text-[18px] font-medium'>{expense.label}</h2>
                <span className='m-[20px] text-black text-[18px] font-medium'>{expense.date}</span>
                <span className='m-[20px] text-[18px] font-medium'>{expense.value}</span>
                <div className='m-[20px] '>
                  <MdOutlineDeleteForever className='text-red-500 font-bold mb-[5px] cursor-pointer text-[25px]' onClick={() => handleDelete(expense._id)} />
                  <MdEditNote className='text-white font-bold mb-[5px] cursor-pointer text-[25px]' onClick={() => handleShowEdit(expense._id)} />
                </div>
              </div>
            ))
          }

          {/* updating  */}
          {
            showEdit && (
              <div className='absolute z-[999] flex flex-col p-[10px] top-[25%] right-10 h-[380px] w-[500px] bg-white shadow-xl'>
                <IoIosCloseCircle className='flex justify-end text-2xl text-red-500 cursor-pointer' onClick={handleShowEdit} />
                <label
                  htmlFor=""
                  className='mt-[10px] font-semibold text-[18px]'>
                  Expense Name
                </label>
                <input
                  type="text"
                  placeholder='Car Rent'
                  className='border-blue-500 outline-none border-2 p-[10px]'
                  onChange={(e) => setUpdatedLabel(e.target.value)} />
                <label
                  htmlFor=""
                  className='mt-[10px] font-semibold text-[18px]'>
                  Expense Date
                </label>
                <input
                  type="date"
                  placeholder=''
                  className='border-blue-500 outline-none border-2 p-[10px]'
                  onChange={(e) => setUpdatedDate(e.target.value)} />
                <label
                  htmlFor=""
                  className='mt-[10px] font-semibold text-[18px]'>
                  Expense Amount
                </label>
                <input
                  type="text"
                  placeholder='50'
                  className='border-blue-500 outline-none border-2 p-[10px]'
                  onChange={(e) => setUpdatedValue(e.target.value)} />
                <button className='bg-green-500 text-white p-[10px] cursor-pointer my-[10px]' onClick={handleUpdateExpense}>
                  Update Expense
                </button>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App 
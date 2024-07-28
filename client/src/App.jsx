import './App.css'
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from 'react';
import {PieChart} from '@mui/x-charts/PieChart';
function App() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleAddExpense = () => {
    setShowAddExpense(!showAddExpense)
  }
  const handleShowReport = () => {
    setShowReport(!showReport)
  }
  const handleShowEdit =()=>{
    setShowEdit(!showEdit)
  }
  return (
    <>
      <div className='flex flex-col justify-center items-center mt-[3%] w-[80%] mr-[5%] ml-[5%]'>
        <h1 className='text-3xl font-medium text-blue-500'>TrackMyBuy </h1>
        <p className='text-xl font-medium text-blue-500'>| Expense Tracking Web Application |</p>
        <div className='relative flex items-center justify-between mt-5 w-[100%]'>
          <div className='relative flex justify-between w-[300px]'>
            <button className='bg-blue-500 text-white p-4 outline-none cursor-pointer hover:bg-blue-400 border-none text-medium' onClick={handleAddExpense}>Add expense</button>
            <button className='bg-blue-500 text-white p-4 outline-none cursor-pointer hover:bg-blue-400 border-none text-medium' onClick={handleShowReport}>Expense Report</button>
          </div>

          {/* add expense */}
          {
            showAddExpense && (<div className='absolute z-[999] flex flex-col p-[10px] top-[40px] left-[30px] h-[380px] w-[500px] bg-white shadow-xl'>
              <IoIosCloseCircle className='flex justify-end text-2xl text-red-500 cursor-pointer' onClick={handleAddExpense} />
              <label htmlFor="" className='mt-[10px] font-semibold text-[18px]'>Expense Name</label>
              <input type="text" placeholder='Car Rent' className='border-blue-500 outline-none border-2 p-[10px]' />
              <label htmlFor="" className='mt-[10px] font-semibold text-[18px]'>Expense Date</label>
              <input type="date" placeholder='' className='border-blue-500 outline-none border-2 p-[10px]' />
              <label htmlFor="" className='mt-[10px] font-semibold text-[18px]'>Expense Amount</label>
              <input type="text" placeholder='50' className='border-blue-500 outline-none border-2 p-[10px]' />
              <button className='bg-green-500 text-white p-[10px] cursor-pointer my-[10px]'>Add Expense</button>
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
                      data: [],
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
              </div>)
          }
          <div>
            <input type="text" placeholder='Search...' className='p-[10px] w-[150px] border-2 border-[#69a3d8]' />
          </div>
        </div>

        <div className='flex flex-col '>
          <div className='relative flex justify-between items-center w-[80vw] h-[100px] bg-blue-300 my-[20px] py-[10px]'>
            <h2 className='m-[20px] text-black text-[18px] font-medium'>Snacks</h2>
            <span className='m-[20px] text-black text-[18px] font-medium'>12/3/1002</span>
            <span className='m-[20px] text-[18px] font-medium'>20</span>
            <div className='m-[20px] '>
              <MdOutlineDeleteForever className='text-red-500 font-bold mb-[5px] cursor-pointer text-[25px]' />
              <MdEditNote className='text-white font-bold mb-[5px] cursor-pointer text-[25px]' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

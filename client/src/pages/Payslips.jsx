import React, { useCallback, useEffect, useState } from 'react'
import { dummyEmployeeData, dummyPayslipData } from '../assets/assets'
import{Loading} from "../components/Loading"
import { PayslipsList } from '../components/payslips/PayslipsList'
import { GenratePaySlipsForm } from '../components/payslips/GenratePaySlipsForm'
export const Payslips = () => {
  const [payslips,setPayslips]=useState([])
  const[employees,setEmployees]=useState([])
  const[loading,setLoading]=useState(true);
  const isAdmin=true;

  const fetchPayslips=useCallback(async()=>{

    setPayslips(dummyPayslipData)
    setTimeout(()=>{

      setLoading(false)
    },1000)

  },[])
 
  useEffect(()=>{
    fetchPayslips()
  },[fetchPayslips])

    useEffect(()=>{
   if(isAdmin) setEmployees(dummyEmployeeData)
  },[isAdmin])
  if(loading) return <Loading/>
return (
  <div className="animate-fade-in space-y-6">
    {/* Header */}
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Payslips</h1>
        <p className="text-gray-500 mt-1">
          {isAdmin
            ? "Generate and manage employee payslips"
            : "Your payslips history"}
        </p>
      </div>

      {isAdmin && (
        <GenratePaySlipsForm
          emoloyees={employees}
          onSuccess={fetchPayslips}
        />
      )}
    </div>

    {/* Table */}
    <PayslipsList payslips={payslips} isAdmin={isAdmin} />
  </div>
);
}



import React, { useEffect, useState } from "react";
import { dummyPayslipData } from "../assets/assets";
import { Loading } from "../components/Loading";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

export const Printpayslips = () => {
  const { id } = useParams();

  const [payslip, setPayslip] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setPayslip(dummyPayslipData.find((p) => p._id === id));
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, [id]);

  if (loading) return <Loading />;
  if (!payslip) return <p className="p-6">Payslip not found</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow print:shadow-none print:p-0">
      {/* Header */}
      <div className="text-center border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold tracking-wide">PAYSLIP</h1>
        <p className="text-slate-500">
          {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
        </p>
      </div>

      {/* Employee Info */}
      <div className="grid grid-cols-2 gap-6 text-sm mb-8">
        <div>
          <p className="text-slate-500">Employee Name</p>
          <p className="font-medium">
            {payslip.employee?.firstName} {payslip.employee?.lastName}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Employee Position</p>
          <p className="font-medium">{payslip.employee?.position}</p>
        </div>

        <div>
          <p className="text-slate-500">Email</p>
          <p className="font-medium">{payslip.employee?.email}</p>
        </div>

        <div>
          <p className="text-slate-500">Period</p>
          <p className="font-medium">
            {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
          </p>
        </div>
      </div>

      {/* Salary Table */}
      <div className="mb-8">
        <table className="w-full border border-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-3 border-b">Description</th>
              <th className="text-right p-3 border-b">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-3 border-b">Basic Salary</td>
              <td className="p-3 border-b text-right">
                ₹{payslip.basicSalary?.toLocaleString()}
              </td>
            </tr>

            <tr>
              <td className="p-3 border-b">Allowance</td>
              <td className="p-3 border-b text-right text-emerald-600">
                +₹{payslip.allowances?.toLocaleString()}
              </td>
            </tr>

            <tr>
              <td className="p-3 border-b">Deduction</td>
              <td className="p-3 border-b text-right text-rose-600">
                -₹{payslip.deductions?.toLocaleString()}
              </td>
            </tr>

            <tr className="bg-slate-50 font-semibold">
              <td className="p-3">Net Salary</td>
              <td className="p-3 text-right">
                ₹{payslip.netSalary?.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Print Button */}
      <div className="text-right print:hidden">
        <button
          onClick={() => window.print()}
          className="px-5 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800"
        >
          Print Payslip
        </button>
      </div>
    </div>
  );
};
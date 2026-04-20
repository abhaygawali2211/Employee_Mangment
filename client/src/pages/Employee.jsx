import React, { useCallback, useEffect, useState } from "react";
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";
import { Plus, Search } from "lucide-react";
import { EmployeeCard } from "../components/EmployeeCard";
import { Loading } from "../components/Loading";
import { Employeefrom } from "../components/Employeefrom";

export const Employee = () => {
  const [employee, setemployee] = useState([]);
  const [loading, setloading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [editEmployee, seteditemployee] = useState(null);
  const [showCreateModal, setShowCreateMoadal] = useState(false);

  const fetchEmoloyee = useCallback(async () => {
    setloading(true);
    setemployee(
      dummyEmployeeData.filter((emp) =>
        selectedDept ? emp.department === selectedDept : emp
      )
    );
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, [selectedDept]);

  useEffect(() => {
    fetchEmoloyee();
  }, [fetchEmoloyee]);

  const filtered = employee.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="text-slate-500">Manage your team members</p>
        </div>

        <button
          onClick={() => setShowCreateMoadal(true)}
          className="flex items-center justify-center gap-2 w-full md:w-auto mt-4 md:mt-0 bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 active:scale-[0.98] transition text-sm font-medium"
        >
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search employees..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        <div>
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((deptName) => (
              <option key={deptName} value={deptName}>
                {deptName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-slate-500">
          <Loading />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <p>No employee found</p>
          ) : (
            filtered.map((emp) => (
              <EmployeeCard
                key={emp._id}
                employee={emp}
                onDelete={fetchEmoloyee}
                onEdit={(e) => seteditemployee(e)}
              />
            ))
          )}
        </div>
      )}

      {/* Create Employee Modal */}
      {showCreateModal && (
        <div
          onClick={() => setShowCreateMoadal(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold">Add New Employee</h2>
                <p className="text-sm text-slate-500">
                  Create a new employee account
                </p>
              </div>

              <button
                onClick={() => setShowCreateMoadal(false)}
                className="text-slate-400 hover:text-red-500 text-lg"
              >
                ✕
              </button>
            </div>

            <Employeefrom 
             onSuccess={()=>{setShowCreateMoadal(false);

              fetchEmoloyee();

             }} onCancel={()=>setShowCreateMoadal(false)}/>
           
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {editEmployee && (
        <div
          onClick={() => seteditemployee(null)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold">Edit Employee</h2>
                <p className="text-sm text-slate-500">
                  Update employee information
                </p>
              </div>

              <button
                onClick={() => seteditemployee(null)}
                className="text-slate-400 hover:text-red-500 text-lg"
              >
                ✕
              </button>
            </div>

            <Employeefrom inisialData={editEmployee}
             onSuccess={()=>{seteditemployee(null);

              fetchEmoloyee();

             }} onCancel={()=>seteditemployee(null)}/>
          </div>
        </div>
      )}
    </div>
  );
};
import { PencilIcon, Trash2Icon } from "lucide-react";
import React from "react";

export const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this?")) return;
    onDelete(employee);
  };

  return (
    <div className="group relative bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition text-center">

      {/* Department — top left */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
          {employee.department || "Remote"}
        </span>

        {employee.isDeleted && (
          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-md">
            DELETED
          </span>
        )}
      </div>

      {/* Action buttons */}
      {!employee.isDeleted && (
        <div className="absolute top-3 right-3 flex gap-2 md:hidden md:group-hover:flex">
          <button
            onClick={() => onEdit(employee)}
            className="p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
          >
            <PencilIcon className="w-4 h-4" />
          </button>

          <button
            onClick={handleDelete}
            className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Big Center Logo */}
      <div className="w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-3xl mb-4">
        {employee.firstName[0]}
        {employee.lastName[0]}
      </div>

      {/* Name & Position */}
      <h3 className="text-lg font-semibold">
        {employee.firstName} {employee.lastName}
      </h3>
      <p className="text-slate-500 text-sm">{employee.position}</p>
    </div>
  );
};
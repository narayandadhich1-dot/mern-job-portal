import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobsTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <Table>
        <TableCaption className="pb-4">A list of your recent job applications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-50">Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                You haven't applied for any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            (allAppliedJobs || []).map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell className="font-medium">
                  {appliedJob.job?.title || "N/A"}
                </TableCell>
               <TableCell>
  {/* Changed .name to .companyName */}
  {appliedJob.job?.company?.companyName || "N/A"} 
</TableCell>
                <TableCell>
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Badge 
                    className={`${
                      appliedJob.status === "rejected" 
                        ? "bg-red-500 hover:bg-red-600" 
                        : appliedJob.status === "pending" 
                        ? "bg-gray-500 hover:bg-gray-600" 
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {appliedJob.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTable;
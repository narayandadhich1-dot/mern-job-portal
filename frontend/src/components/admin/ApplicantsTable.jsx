import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingStatus = ["rejected", "offered"];

const ApplicantsTable = ({ applicants }) => {
  const [openId, setOpenId] = useState(null);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>List of Applied Applicants</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No applicants found
              </TableCell>
            </TableRow>
          ) : (
            applicants.map((application) => (
              <TableRow key={application._id}>
                <TableCell>{application?.applicant?.fullname}</TableCell>
                <TableCell>{application?.applicant?.email}</TableCell>
                <TableCell>{application?.applicant?.phoneNumber}</TableCell>

                <TableCell>
                  {application?.resume ? (
                    <a
                      href={application.resume}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  ) : (
                    "N/A"
                  )}
                </TableCell>

                <TableCell>{application?.createdAt?.split("T")[0]}</TableCell>

                <TableCell className="text-right">
                  <Popover
                    open={openId === application._id}
                    onOpenChange={(open) =>
                      setOpenId(open ? application._id : null)
                    }
                  >
                    <PopoverTrigger asChild>
                      <MoreHorizontal className="cursor-pointer inline-block" />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status) => (
                        <div
                          onClick={() => {
                            statusHandler(status, application._id);
                            setOpenId(null); 
                          }}
                          className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 capitalize"
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;

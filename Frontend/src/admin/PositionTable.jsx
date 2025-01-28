import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PositionTable() {
  const { companies = [], searchCompanyByText } = useSelector(
    (store) => store.company
  ); // Ensure default array to avoid errors

  const navigate = useNavigate();
  const [filteredCompanies, setFilteredCompanies] = useState(companies || []);

  // Filter companies based on search input
  useEffect(() => {
    if (Array.isArray(companies)) {
      const filtered = companies.filter((company) => {
        if (!searchCompanyByText) return true; // If no search text, return all companies
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
      setFilteredCompanies(filtered);
    } else {
      console.error("companies is not an array:", companies);
      setFilteredCompanies([]); // Default to empty array
    }
  }, [companies, searchCompanyByText]);

  return (
    <Table>
      <TableCaption>A list of your recent posted Vacancies</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(filteredCompanies) && filteredCompanies.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              You haven't registered any companies yet.
            </TableCell>
          </TableRow>
        ) : (
          Array.isArray(filteredCompanies) &&
          filteredCompanies.map((company) => (
            <TableRow key={company._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={
                      company?.logo ||
                      "https://yt3.googleusercontent.com/DP2DnSf8hIhdjThIsFyCqktfSgvrLeXfWA0xbPOo8I3n-P2_7c4otmLi6SwbUp1tXcWodn10=s900-c-k-c0x00ffffff-no-rj"
                    }
                  />
                </Avatar>
              </TableCell>
              <TableCell>{company?.name || "N/A"}</TableCell>

              <TableCell>
                {company?.createdAt
                  ? company.createdAt
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")
                  : "N/A"}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-15">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export default PositionTable;

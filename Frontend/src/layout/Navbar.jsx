import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const user = false;
  return (
    <div className="bg-[rgba(224,221,221,0.08)]">
      <div className="flex items-center justify-between max-w-7xl h-16 mx-auto">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-red-500">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex items-center gap-6 font-medium cursor-pointer">
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/jobs'}>Jobs</Link></li>
            <li><Link to={'/browse'}>Browse</Link></li>
          </ul>
          {!user ? (
            <div className="flex gap-1">
              <Link to='/login'><Button variant="outline">Login</Button></Link>
              <Link to='/signup'><Button className='bg-[#6A38C2] hover:bg-[#5b30a6]'>Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-1">
                  <Avatar className="cursor-pointer ">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">Suryansh Kushwaha</h4>
                    <p className="text-sm text-muted-foreground">
                      lore njjkbk kjbjkbk kbjkjbjkb kjbkb{" "}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex w-fit items-center gap-1 cursor-pointer">
                    <User2 />
                    <Button variant="link">View Profile!</Button>
                  </div>
                  <div className="flex w-fit items-center gap-1 cursor-pointer">
                    <LogOut />
                    <Button variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

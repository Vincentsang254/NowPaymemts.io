/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { AlignJustify, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminHeader({ setOpen }) {
  const navigate = useNavigate();
  const { name } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <Button
          onClick={() => setOpen(true)}
          variant="ghost"
          size="icon"
          className="lg:hidden hover:bg-accent"
        >
          <AlignJustify className="w-5 h-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        {/* Home Button */}
        <Button
          onClick={() => navigate("/admin/dashboard")}
          variant="ghost"
          size="icon"
          className="hidden sm:flex hover:bg-accent"
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground">
          {name || "Admin"}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;

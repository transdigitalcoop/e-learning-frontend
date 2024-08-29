import { Navbar } from "../ui/Navbar";
import { Toaster } from "sonner";
import PropTypes from "prop-types";
export default function Mainlayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Toaster />
    </>
  );
}
Mainlayout.propTypes = {
  children: PropTypes.node.isRequired,
};

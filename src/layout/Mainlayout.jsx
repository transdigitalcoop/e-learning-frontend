import { Navbar } from "../ui/Navbar";
import { Toaster } from "sonner";
import PropTypes from "prop-types";
import { Footer } from "../ui/Footer";
export default function Mainlayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Toaster />
      <Footer />
    </>
  );
}
Mainlayout.propTypes = {
  children: PropTypes.node.isRequired,
};

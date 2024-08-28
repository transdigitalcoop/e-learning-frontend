import { Navbar } from "../ui/Navbar";
import PropTypes from "prop-types";
export default function Mainlayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
Mainlayout.propTypes = {
  children: PropTypes.node.isRequired,
};

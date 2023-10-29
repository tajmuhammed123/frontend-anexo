import logo from "/Logo/AX BLACK.png";
function Spinner() {
  return (
    <div className="flex justify-center items-center align-middle h-screen w-screen">
      <img src={logo} alt="" className="animate-pulse w-24 h-24" />
    </div>
  );
}

export default Spinner;


const Footer = () => {
  return (
    <footer>
      <div className="flex items-center align-middle justify-around mt-20 pb-10 border-t-2 border-slate-700 bg-black bg-opacity-10">
        
        {/* First Column */}
        <div className="flex flex-col space-y-4 mt-4">
          <h3 className="font-semibold text-lg">Support</h3>
          <p>Help Center</p>
          <p>FAQs</p>
          <p>Customer Service</p>
        </div>


        {/* Third Column */}
        <div className="flex flex-col space-y-4 mt-4">
          <h3 className="font-semibold text-lg">Info</h3>
          <p>About Us</p>
          <p>Careers</p>
          <p>Blog</p>
        </div>

        {/* Fourth Column */}
        <div className="flex flex-col space-y-4 mt-4">
          <h3 className="font-semibold text-lg">Company</h3>
          <p>About Developer</p>
          <p>Our Mission</p>
          <p>Press</p>
        </div>

       
      </div>
    </footer>
  );
};

export default Footer;

const NavBar = () => {
  return (
    <div className="flex justify-between items-center bg-pink-500 text-white p-4">
      <a href="#home" className="text-lg font-['DynaPuff']">ItGirlCloset</a>
      <div className="flex space-x-4">
        <a href="/closet">Closet</a>
        <a href="/bin">Bin</a>
        <a href="/exchange">Exchange</a>
      </div>

      <div className="flex space-x-4">
        <a href="#login" className="bg-blue-800 text-white px-4 py-2 rounded">Login</a>
        <a href="#signup" className="bg-blue-800 text-white px-4 py-2 rounded">Sign Up</a>
      </div>
    </div>
  )
}

export default NavBar;
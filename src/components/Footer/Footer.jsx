function Footer() {
  return (
    <footer className="w-full border-t border-black bg-[#feaf0d] px-8 py-4 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Texto izquierdo */}
        <p className="text-sm font-light">
          © 2026 Recetario App
        </p>

        {/* Texto central */}
        <p className="text-sm font-medium">
         +549
        </p>

        {/* Texto derecho */}
        <p className="text-sm font-light">
          Proyecto PWA
        </p>

      </div>
    </footer>
  );
}

export default Footer;
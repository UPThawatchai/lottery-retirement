export default function Footer() {
  return (
    <footer className="no-print mt-12 border-t border-white/10 text-center py-8 px-4">
      <div className="max-w-sm mx-auto">
        <p className="text-white/70 text-sm font-semibold mb-1">พัฒนาโดย UP-Thawatchai</p>
        <p className="text-white/40 text-xs mb-4">
          ถ้าเห็นว่ามีประโยชน์ต่อท่าน สามารถเลี้ยงกาแฟผมได้ที่ QR Code นี้ ☕
        </p>
        <div className="flex justify-center">
          <img
            src="/qrcode.png"
            alt="QR Code เลี้ยงกาแฟ"
            className="w-36 h-auto rounded-xl border-2 border-yellow-400/40 shadow-lg"
          />
        </div>
      </div>
    </footer>
  )
}

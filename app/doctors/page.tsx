export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-[#0b1b55] text-white p-5">

      <div className="bg-white/10 rounded-3xl p-6 mb-6">
        <h1 className="text-4xl font-bold mb-2">
          👨‍⚕️ الأطباء
        </h1>

        <p className="text-gray-300">
          إدارة أطباء العيادة
        </p>
      </div>

      <div className="bg-white/10 rounded-3xl p-5">
        <p className="text-xl">
          لا يوجد أطباء حاليًا
        </p>
      </div>

    </main>
  );
}
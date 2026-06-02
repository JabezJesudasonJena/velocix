import DashboardLayout from '@/components/layout/DashboardLayout';

export default function DashboardPage() {
  return (
    <DashboardLayout role="Store Admin">
      {/* You just write minimal HTML here to display your backend data!
        The layout handles all the navigation, headers, and CSS structure.
      */}
      <div className="p-8 bg-white rounded-2xl shadow-sm border border-[#e6e8ea]">
        <h3 className="text-lg font-semibold mb-4">Backend Data Test</h3>
        <p className="text-[#565e74]">My API response will go here.</p>
      </div>
    </DashboardLayout>
  );
}
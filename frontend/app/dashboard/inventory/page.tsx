import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import InventoryTable from '@/components/inventory/InventoryTable';

export default function InventoryPage() {
  return (
    // We pass role="Store Admin" so the sidebar displays the correct user type
    <DashboardLayout role="Store Admin">
      <InventoryTable />
    </DashboardLayout>
  );
}
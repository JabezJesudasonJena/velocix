import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CreateProductForm from '@/components/inventory/CreateProductForm';

export default function CreateProductPage() {
  return (
    <DashboardLayout role="Store Admin">
      <CreateProductForm />
    </DashboardLayout>
  );
}
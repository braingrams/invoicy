import PageLayout from '@/components/page-layout';
import Template from '@/components/utilities/Template';
import React from 'react';

function templates() {
  return (
    <PageLayout title='Templates' description='Choose a template'>
      <Template />
    </PageLayout>
  );
}

export default templates;

import PageLayout from '@/components/page-layout';
import SingleTemplate from '@/components/utilities/SingleTemplate';
import React from 'react';

function singleTemplate() {
  return (
    <PageLayout title='Templates' description='Choose a template'>
      <SingleTemplate />
    </PageLayout>
  );
}

export default singleTemplate;

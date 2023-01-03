import PageLayout from '@/components/page-layout';
import SingleTemplate from '@/components/utilities/SingleTemplate';
import { GetServerSideProps } from 'next';
import React from 'react';

function singleTemplate({ id }) {
  return (
    <PageLayout title='Templates' description='Choose a template'>
      <SingleTemplate template={id} />
    </PageLayout>
  );
}

export default singleTemplate;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  return {
    props: {
      id,
    },
  };
};

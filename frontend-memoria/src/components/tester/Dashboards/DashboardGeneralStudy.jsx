import React, { useState } from 'react';
import { Grid } from "@tremor/react";
import MetricCardCategoryBar from '../../charts/MetricCardCategoryBar';

export default function DashboardGeneralStudy(props) {
  const { content } = props;
  return (
    <div>
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        <MetricCardCategoryBar />
        <MetricCardCategoryBar />
        <MetricCardCategoryBar />
      </Grid>
    </div>
  );
}
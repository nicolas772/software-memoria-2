import React, { useState } from 'react';
import MetricCardList from '../../charts/MetricCardList';
import MetricCardCategoryBar from '../../charts/MetricCardCategoryBar';

export default function DashboardGeneralStudy(props) {
    const { content } = props;
    return (
        <div>
          <MetricCardCategoryBar />
        </div>
      );
}
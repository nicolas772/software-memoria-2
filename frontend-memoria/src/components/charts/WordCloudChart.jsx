import React from 'react'
import { TagCloud } from 'react-tagcloud'
import { Card, Title } from '@tremor/react'
import './css/wordCloud.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const customRenderer = (tag, size, color) => (
  <OverlayTrigger key={tag.value} overlay={<Tooltip id="tooltip-disabled">Cantidad: {tag.count}</Tooltip>}>
    <span
      key={tag.value}
      className="zoomable-tag"
      style={{
        animation: 'blinker 3s linear infinite',
        animationDelay: `${Math.random() * 2}s`,
        fontSize: `${size / 2}em`,
        margin: '3px',
        padding: '3px',
        display: 'inline-block',
        fontFamily: "sans-serif",
        color: "#435F7A"
      }}
    >
      {tag.value}
    </span >
  </OverlayTrigger>
)

const WordCloudChart = (props) => {
  const { content, title } = props
  return (
    <Card>
      <Title>{title}</Title>
      <div style={{ margin: "4%" }}></div>
      <TagCloud
        tags={content}
        minSize={2}
        maxSize={8}
        renderer={customRenderer} />
    </Card>
  )
}

export default WordCloudChart
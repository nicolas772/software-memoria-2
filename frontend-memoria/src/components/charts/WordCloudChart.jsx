import React from 'react'
import { TagCloud } from 'react-tagcloud'
import { Card, Title } from '@tremor/react'
import './css/wordCloud.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const data = [
  { value: 'jQuery', count: 200 },
  { value: 'MongoDB', count: 18 },
  { value: 'JavaScript', count: 38 },
  { value: 'React', count: 30 },
  { value: 'Nodejs', count: 28 },
  { value: 'Express.js', count: 25 },
  { value: 'HTML5', count: 33 },
  { value: 'CSS3', count: 20 },
  { value: 'Webpack', count: 22 },
  { value: 'Babel.js', count: 7 },
  { value: 'ECMAScript', count: 25 },
  { value: 'Jest', count: 15 },
  { value: 'Mocha', count: 17 },
  { value: 'React Native', count: 27 },
  { value: 'Angular.js', count: 30 },
  { value: 'TypeScript', count: 15 },
  { value: 'Flow', count: 30 },
  { value: 'NPM', count: 11 },
]

// custom random color options
// see randomColor package: https://github.com/davidmerfield/randomColor
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

const WordCloudChart = () => {
  return (
    <Card>
      <Title>Tags Opiniones</Title>
      <div style={{ margin: "4%" }}></div>
      <TagCloud
        tags={data}
        minSize={2}
        maxSize={8}
        renderer={customRenderer} />
    </Card>
  )
}

export default WordCloudChart
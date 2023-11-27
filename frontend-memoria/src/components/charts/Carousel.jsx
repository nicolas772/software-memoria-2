import { Carousel } from 'flowbite-react';
import { Card, Title } from "@tremor/react";

export default function SimpleCarousel(props) {
  const { content, title } = props
  return (
    <Card
      className='pl-0 pr-0'
      decoration="top"
      decorationColor="cyan">
      <Title className='pl-4'>{title}</Title>
      <div className="h-56">
        <Carousel indicators={false} leftControl rightControl>
          {content.map((item, index) => (
            <div key={index} className="flex h-full pl-12 pr-12 items-center text-center justify-center bg-white dark:bg-white text-gray-700">
            "{item}"
          </div>
          ))}
        </Carousel>
      </div>
    </Card>
  );
}

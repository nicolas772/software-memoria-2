import { Carousel } from 'flowbite-react';
import { Card, Title } from "@tremor/react";

export default function SimpleCarousel(props) {
  const { content, title } = props
  return (
    <Card
      
      decoration="top"
      decorationColor="cyan">
      <Title className='pb-2'>{title}</Title>
      <div className="h-56">
        <Carousel  leftControl rightControl>
          {content.map((item, index) => (
            <div key={index} className="flex h-full pl-4 pr-4 items-center text-center justify-center bg-gray-200 dark:bg-gray-200 text-gray-700">
            "{item}"
          </div>
          ))}
        </Carousel>
      </div>
    </Card>
  );
}

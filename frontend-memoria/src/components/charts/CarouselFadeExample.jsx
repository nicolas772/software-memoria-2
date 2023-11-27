import { Carousel } from 'flowbite-react';
import { Card, Title } from "@tremor/react";

export default function CarouselFadeExample() {
  return (
    <Card
      className='pl-0 pr-0'
      decoration="top"
      decorationColor="cyan">
        <Title className='pl-4'>Opiniones </Title>
      <div className="h-56 dark">
        <Carousel indicators={false} leftControl rightControl>
          <div className="flex h-full pl-12 pr-12 items-center text-center justify-center bg-gray-400 dark:bg-white text-gray-700">
          "Me parecio un excelente software."
          </div>
          <div className="flex h-full pl-12 pr-12 items-center text-center justify-center bg-gray-400 dark:bg-white text-gray-700">
          "No me gusto mucho, pienso que puede mejorar mucho la interfaz."
          </div>
          <div className="flex h-full pl-12 pr-12 items-center text-center justify-center bg-gray-400 dark:bg-white text-gray-700">
          "Expectacular, nada que decir. Los colores y las animaciones me parecieron impecables, el tamaño de la letra super bien."
          </div>
        </Carousel>
      </div>
    </Card>
  );
}

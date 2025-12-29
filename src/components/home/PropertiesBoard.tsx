import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Property {
  id: number;
  title: string;
  type: 'sale' | 'rent';
  price: number;
  area: number;
  rooms: number;
  floor: number;
  totalFloors: number;
  address: string;
  description: string;
  image: string;
  phone: string;
}

export default function PropertiesBoard() {
  const [properties] = useState<Property[]>([
    {
      id: 1,
      title: '2-комнатная квартира в центре',
      type: 'sale',
      price: 5500000,
      area: 52,
      rooms: 2,
      floor: 5,
      totalFloors: 9,
      address: 'ул. Кольцовская, 35',
      description: 'Квартира в хорошем состоянии, развитая инфраструктура',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      phone: '+7 980 555 75 80'
    },
    {
      id: 2,
      title: '1-комнатная квартира',
      type: 'rent',
      price: 25000,
      area: 38,
      rooms: 1,
      floor: 3,
      totalFloors: 12,
      address: 'ул. Ленина, 90',
      description: 'Новая квартира с ремонтом и мебелью',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      phone: '+7 980 555 75 80'
    },
    {
      id: 3,
      title: '3-комнатная квартира',
      type: 'sale',
      price: 7200000,
      area: 78,
      rooms: 3,
      floor: 8,
      totalFloors: 16,
      address: 'пр-т Революции, 12',
      description: 'Просторная квартира с отличным видом',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      phone: '+7 980 555 75 80'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'sale' | 'rent'>('all');

  const filteredProperties = properties.filter(p => 
    filter === 'all' ? true : p.type === filter
  );

  const formatPrice = (price: number, type: string) => {
    if (type === 'rent') {
      return `${price.toLocaleString('ru-RU')} ₽/мес`;
    }
    return `${(price / 1000000).toFixed(1)} млн ₽`;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 animate-on-scroll">
          Доска объявлений
        </h2>
        <p className="text-center text-gray-600 mb-8 animate-on-scroll">
          Актуальные предложения по продаже и аренде недвижимости
        </p>

        <Tabs defaultValue="all" className="w-full" onValueChange={(v) => setFilter(v as any)}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="sale">Продажа</TabsTrigger>
            <TabsTrigger value="rent">Аренда</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <PropertyGrid properties={filteredProperties} formatPrice={formatPrice} />
          </TabsContent>
          <TabsContent value="sale" className="mt-0">
            <PropertyGrid properties={filteredProperties} formatPrice={formatPrice} />
          </TabsContent>
          <TabsContent value="rent" className="mt-0">
            <PropertyGrid properties={filteredProperties} formatPrice={formatPrice} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function PropertyGrid({ 
  properties, 
  formatPrice 
}: { 
  properties: Property[], 
  formatPrice: (price: number, type: string) => string 
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Card key={property.id} className="hover:shadow-xl transition-shadow animate-on-scroll overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={property.image} 
              alt={property.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <Badge 
              className="absolute top-3 right-3"
              variant={property.type === 'sale' ? 'default' : 'secondary'}
            >
              {property.type === 'sale' ? 'Продажа' : 'Аренда'}
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-xl">{property.title}</CardTitle>
            <div className="text-2xl font-bold text-primary">
              {formatPrice(property.price, property.type)}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Icon name="MapPin" size={18} />
              <span className="text-sm">{property.address}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Icon name="Maximize" size={16} className="text-gray-500" />
                <span>{property.area} м²</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Home" size={16} className="text-gray-500" />
                <span>{property.rooms}-комн</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Building" size={16} className="text-gray-500" />
                <span>{property.floor}/{property.totalFloors}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600">{property.description}</p>

            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => window.location.href = `tel:${property.phone}`}
            >
              <Icon name="Phone" size={18} className="mr-2" />
              Позвонить
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

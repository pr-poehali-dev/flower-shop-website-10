import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: 'Букет "Нежность"', price: 3500, category: 'bouquet', image: 'https://cdn.poehali.dev/projects/963cb966-7f27-4904-9108-308f054c9907/files/834b0776-f532-4546-8348-3c2ce9f27bbd.jpg', description: 'Романтичный букет из роз и эустом в пастельных тонах' },
  { id: 2, name: 'Букет "Весна"', price: 2800, category: 'bouquet', image: 'https://cdn.poehali.dev/projects/963cb966-7f27-4904-9108-308f054c9907/files/ddeabc33-bad9-4dd7-bad3-9876f2af9a92.jpg', description: 'Свежие тюльпаны и фрезии в нежных оттенках' },
  { id: 3, name: 'Композиция "Утро"', price: 4200, category: 'composition', image: 'https://cdn.poehali.dev/projects/963cb966-7f27-4904-9108-308f054c9907/files/d37fdf41-647b-45d6-808d-b60d2e9f220e.jpg', description: 'Изысканная композиция в деревянном ящике' },
  { id: 4, name: 'Монобукет роз', price: 5500, category: 'bouquet', image: 'https://cdn.poehali.dev/projects/963cb966-7f27-4904-9108-308f054c9907/files/834b0776-f532-4546-8348-3c2ce9f27bbd.jpg', description: '25 нежно-розовых роз высшего качества' },
  { id: 5, name: 'Композиция "Сад"', price: 3900, category: 'composition', image: 'https://cdn.poehali.dev/projects/963cb966-7f27-4904-9108-308f054c9907/files/d37fdf41-647b-45d6-808d-b60d2e9f220e.jpg', description: 'Композиция из садовых цветов в корзине' },
  { id: 6, name: 'Букет "Лаванда"', price: 3200, category: 'bouquet', image: 'https://cdn.poehali.dev/projects/963cb966-7f27-4904-9108-308f054c9907/files/ddeabc33-bad9-4dd7-bad3-9876f2af9a92.jpg', description: 'Лаванда, эвкалипт и розы в лавандовой гамме' },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(prev => prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Flower2" className="text-primary" size={32} />
            <h1 className="text-3xl font-bold text-primary">Цветочная Лавка</h1>
          </div>
          
          <div className="hidden md:flex gap-6">
            {['home', 'catalog', 'compositions', 'delivery', 'about', 'care', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === section ? 'text-primary border-b-2 border-primary' : 'text-foreground/70'
                }`}
              >
                {section === 'home' ? 'Главная' : 
                 section === 'catalog' ? 'Каталог' :
                 section === 'compositions' ? 'Композиции' :
                 section === 'delivery' ? 'Доставка' :
                 section === 'about' ? 'О нас' :
                 section === 'care' ? 'Уход' : 'Контакты'}
              </button>
            ))}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <Icon name="ShoppingCart" size={64} className="mb-4 opacity-20" />
                  <p>Корзина пуста</p>
                </div>
              ) : (
                <div className="space-y-6 mt-6">
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="flex gap-4 p-4">
                          <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{item.name}</h4>
                            <p className="text-primary font-semibold mt-1">{item.price} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7 ml-auto text-destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold mb-4">
                      <span>Итого:</span>
                      <span className="text-primary">{cartTotal} ₽</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Имя</Label>
                        <Input
                          id="name"
                          placeholder="Ваше имя"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Адрес доставки</Label>
                        <Textarea
                          id="address"
                          placeholder="Улица, дом, квартира"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="delivery-time">Время доставки</Label>
                        <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                          <SelectTrigger id="delivery-time">
                            <SelectValue placeholder="Выберите время" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="09-12">09:00 - 12:00</SelectItem>
                            <SelectItem value="12-15">12:00 - 15:00</SelectItem>
                            <SelectItem value="15-18">15:00 - 18:00</SelectItem>
                            <SelectItem value="18-21">18:00 - 21:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button className="w-full mt-6" size="lg">
                      Оформить заказ
                    </Button>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <section className="text-center py-20 px-4">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-primary">
                Цветы, которые дарят радость
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Создаём букеты с любовью и доставляем свежесть прямо к вашей двери
              </p>
              <Button size="lg" className="text-lg" onClick={() => setActiveSection('catalog')}>
                Смотреть каталог
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </section>

            <section>
              <h3 className="text-4xl font-bold text-center mb-12">Популярные букеты</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {products.slice(0, 3).map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-scale-in">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                    <CardHeader>
                      <CardTitle className="text-2xl">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{product.description}</p>
                      <p className="text-2xl font-bold text-primary mt-4">{product.price} ₽</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => addToCart(product)}>
                        <Icon name="ShoppingCart" className="mr-2" size={18} />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-4">Каталог цветов</h2>
              <p className="text-xl text-muted-foreground">Выберите идеальный букет для любого случая</p>
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="bouquet">Букеты</TabsTrigger>
                <TabsTrigger value="composition">Композиции</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <Badge variant="secondary">
                        {product.category === 'bouquet' ? 'Букет' : 'Композиция'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{product.description}</p>
                    <p className="text-2xl font-bold text-primary mt-4">{product.price} ₽</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => addToCart(product)}>
                      <Icon name="ShoppingCart" className="mr-2" size={18} />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'compositions' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-4">Флористические композиции</h2>
              <p className="text-xl text-muted-foreground">Уникальные композиции для особых случаев</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {products.filter(p => p.category === 'composition').map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <img src={product.image} alt={product.name} className="w-full h-80 object-cover" />
                  <CardHeader>
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{product.description}</p>
                    <p className="text-3xl font-bold text-primary mt-4">{product.price} ₽</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" size="lg" onClick={() => addToCart(product)}>
                      <Icon name="ShoppingCart" className="mr-2" size={20} />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'delivery' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-4">Доставка</h2>
              <p className="text-xl text-muted-foreground">Мы доставляем свежесть прямо к вашей двери</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <Icon name="Clock" className="mx-auto mb-4 text-primary" size={48} />
                <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
                <p className="text-muted-foreground">В течение 2-4 часов по городу</p>
              </Card>
              <Card className="text-center p-6">
                <Icon name="MapPin" className="mx-auto mb-4 text-primary" size={48} />
                <h3 className="text-xl font-semibold mb-2">По всему городу</h3>
                <p className="text-muted-foreground">Доставка в любую точку</p>
              </Card>
              <Card className="text-center p-6">
                <Icon name="Heart" className="mx-auto mb-4 text-primary" size={48} />
                <h3 className="text-xl font-semibold mb-2">С заботой</h3>
                <p className="text-muted-foreground">Бережная упаковка и транспортировка</p>
              </Card>
            </div>

            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Условия доставки</h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <p>Бесплатная доставка при заказе от 3000 ₽</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <p>Доставка в течение 2-4 часов с момента оформления заказа</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <p>Возможность выбора времени доставки</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" className="text-primary mt-1" size={20} />
                  <p>Курьер свяжется с вами за 30 минут до доставки</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-4">О нас</h2>
              <p className="text-xl text-muted-foreground">Флористы с душой и любовью к цветам</p>
            </div>

            <Card className="p-8">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Цветочная Лавка — это семейный бизнес, основанный более 10 лет назад. 
                  Мы создаём букеты с любовью и вниманием к каждой детали.
                </p>
                <p>
                  Наша команда профессиональных флористов работает только со свежими цветами 
                  от проверенных поставщиков. Мы следим за качеством каждого бутона.
                </p>
                <p>
                  Для нас важно не просто продать букет, а подарить эмоции и создать 
                  особенную атмосферу праздника в каждом заказе.
                </p>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="text-center p-6">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <p className="text-muted-foreground">лет опыта</p>
              </Card>
              <Card className="text-center p-6">
                <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                <p className="text-muted-foreground">счастливых клиентов</p>
              </Card>
              <Card className="text-center p-6">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground">свежие цветы</p>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'care' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">Уход за цветами</h2>
              <p className="text-xl text-muted-foreground">Как сохранить свежесть букета надолго</p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl">Подготовка букета</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  <div className="space-y-3 pt-2">
                    <p>• Срежьте стебли под углом 45° острым ножом или секатором</p>
                    <p>• Удалите листья, которые будут находиться в воде</p>
                    <p>• Используйте чистую вазу и свежую прохладную воду</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl">Уход в первые дни</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  <div className="space-y-3 pt-2">
                    <p>• Меняйте воду каждый день</p>
                    <p>• Подрезайте стебли на 1-2 см при каждой смене воды</p>
                    <p>• Держите букет вдали от прямых солнечных лучей и батарей</p>
                    <p>• Оптимальная температура — 18-22°C</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl">Продление свежести</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  <div className="space-y-3 pt-2">
                    <p>• Добавьте в воду специальную подкормку для цветов</p>
                    <p>• Можно добавить 1 чайную ложку сахара и каплю лимонного сока</p>
                    <p>• Опрыскивайте цветы водой комнатной температуры</p>
                    <p>• Удаляйте увядшие бутоны и листья</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-xl">Особенности разных цветов</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  <div className="space-y-3 pt-2">
                    <p><strong>Розы:</strong> любят прохладную воду, срезайте шипы в месте контакта с водой</p>
                    <p><strong>Тюльпаны:</strong> продолжают расти в вазе, подрезайте стебли регулярно</p>
                    <p><strong>Лилии:</strong> удаляйте тычинки, чтобы цветы дольше сохранялись</p>
                    <p><strong>Хризантемы:</strong> ломайте стебли руками, а не режьте</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-4">Контакты</h2>
              <p className="text-xl text-muted-foreground">Мы всегда на связи</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <Icon name="Phone" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">Телефон</h3>
                <p className="text-2xl font-bold text-primary">+7 (495) 123-45-67</p>
                <p className="text-muted-foreground mt-2">Ежедневно с 9:00 до 21:00</p>
              </Card>

              <Card className="p-6">
                <Icon name="Mail" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-xl font-semibold text-primary">info@flowers.ru</p>
                <p className="text-muted-foreground mt-2">Ответим в течение часа</p>
              </Card>

              <Card className="p-6">
                <Icon name="MapPin" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">Адрес</h3>
                <p className="text-muted-foreground">г. Москва, ул. Цветочная, д. 15</p>
                <p className="text-muted-foreground mt-2">Работаем ежедневно</p>
              </Card>

              <Card className="p-6">
                <Icon name="Clock" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">Режим работы</h3>
                <p className="text-muted-foreground">Пн-Вс: 9:00 - 21:00</p>
                <p className="text-muted-foreground mt-2">Без выходных</p>
              </Card>
            </div>

            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Напишите нам</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="contact-name">Имя</Label>
                  <Input id="contact-name" placeholder="Ваше имя" />
                </div>
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="contact-message">Сообщение</Label>
                  <Textarea id="contact-message" placeholder="Ваше сообщение..." rows={5} />
                </div>
                <Button className="w-full" size="lg">
                  Отправить сообщение
                </Button>
              </form>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-primary/5 border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Flower2" className="text-primary" size={28} />
                <h3 className="text-xl font-bold">Цветочная Лавка</h3>
              </div>
              <p className="text-muted-foreground">Свежие цветы с любовью для вас</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Разделы</h4>
              <div className="space-y-2">
                <button onClick={() => setActiveSection('catalog')} className="block text-muted-foreground hover:text-primary transition-colors">
                  Каталог
                </button>
                <button onClick={() => setActiveSection('delivery')} className="block text-muted-foreground hover:text-primary transition-colors">
                  Доставка
                </button>
                <button onClick={() => setActiveSection('about')} className="block text-muted-foreground hover:text-primary transition-colors">
                  О нас
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Помощь</h4>
              <div className="space-y-2">
                <button onClick={() => setActiveSection('care')} className="block text-muted-foreground hover:text-primary transition-colors">
                  Уход за цветами
                </button>
                <button onClick={() => setActiveSection('contact')} className="block text-muted-foreground hover:text-primary transition-colors">
                  Контакты
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Связь</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>+7 (495) 123-45-67</p>
                <p>info@flowers.ru</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Цветочная Лавка. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
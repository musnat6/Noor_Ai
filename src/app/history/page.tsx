import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { History } from 'lucide-react';

export default function HistoryPage() {
  const prophets = [
    {
      name: 'Prophet Muhammad (ﷺ)',
      bio: "The final prophet in Islam, who received the Qur'an. His life, documented in the Sunnah, is the primary model for Muslims to follow. Born in Mecca, he united Arabia under Islam.",
    },
    {
      name: 'Prophet Isa (Jesus, عليه السلام)',
      bio: 'A prominent prophet in Islam, considered the Messiah. Muslims believe he was born of the Virgin Mary, performed miracles, and will return before the Day of Judgment. He was sent to guide the Children of Israel with the Injeel (Gospel).',
    },
    {
      name: 'Prophet Musa (Moses, عليه السلام)',
      bio: "A prophet and messenger who led the Israelites out of Egypt and received the Tawrat (Torah) from Allah on Mount Sinai. He is the most frequently mentioned prophet in the Qur'an.",
    },
    {
      name: 'Prophet Ibrahim (Abraham, عليه السلام)',
      bio: "A key patriarch of the Abrahamic religions. Known for his unwavering monotheism, he is called 'Khalilullah' (the friend of Allah). He rebuilt the Kaaba in Mecca with his son, Ismail.",
    },
  ];

  const events = [
    {
      name: 'The Hijra (Migration to Medina)',
      description:
        'In 622 CE, Prophet Muhammad and his followers migrated from Mecca to Medina to escape persecution. This event marks the beginning of the Islamic calendar.',
    },
    {
      name: 'The Battle of Badr',
      description:
        'The first major battle between the Muslims of Medina and the Quraysh of Mecca in 624 CE. Despite being outnumbered, the Muslims achieved a decisive victory, marking a significant turning point.',
    },
    {
      name: 'The Conquest of Mecca',
      description:
        'In 630 CE, Prophet Muhammad and his army entered Mecca peacefully. He forgave his former enemies, and the city converted to Islam, solidifying its place as the spiritual center of the faith.',
    },
    {
      name: 'The Golden Age of Islam',
      description:
        'A period from the 8th to the 14th century when the Islamic world experienced a scientific, cultural, and economic flourishing. Scholars made significant advances in fields like mathematics, medicine, astronomy, and philosophy.',
    },
  ];

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="font-headline text-4xl flex items-center justify-center gap-3">
            <History className="text-accent" />
            Islamic History
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Explore the lives of the prophets and key events in Islamic history.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Biographies of the Prophets
            </CardTitle>
            <CardDescription className="text-base">
              Learn about the lives and missions of some of the most revered
              prophets in Islam.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {prophets.map((prophet) => (
                <AccordionItem value={prophet.name} key={prophet.name}>
                  <AccordionTrigger className="font-headline text-lg">
                    {prophet.name}
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    {prophet.bio}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Key Historical Events
            </CardTitle>
            <CardDescription className="text-base">
              Discover pivotal moments that shaped the course of Islamic
              civilization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {events.map((event) => (
                <AccordionItem value={event.name} key={event.name}>
                  <AccordionTrigger className="font-headline text-lg">
                    {event.name}
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    {event.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

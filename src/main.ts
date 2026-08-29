import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const dbPath = join(process.cwd(), 'prisma', 'dev.db');
  if (!existsSync(dbPath)) {
    console.log('Database not found. Running migrations and seed...');
    try {
      execSync('npx prisma migrate deploy', { stdio: 'inherit' });
      execSync('npx prisma db seed', { stdio: 'inherit' });
    } catch (e) {
      console.warn('Migration/seed via CLI failed, trying alternative...', e);
    }
  }

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const prismaService = app.get(PrismaService);
  await prismaService.$connect();

  const count = await prismaService.profile.count();
  if (count === 0) {
    console.log('No profile found. Seeding database...');
    await prismaService.profile.create({
      data: {
        name: 'Шувалов Никита',
        description:
          'Технически ориентированный специалист с опытом backend- и web-разработки. Работал с Python, Django, REST API, PostgreSQL, Linux и Git, участвовал более чем в 10 проектах, в том числе командных.',
        github: 'https://github.com/NikitaShuvalov',
        skills: {
          create: [
            { name: 'TypeScript', level: 'Intermediate' },
            { name: 'Node.js', level: 'Intermediate' },
            { name: 'NestJS', level: 'Intermediate' },
            { name: 'GraphQL', level: 'Intermediate' },
            { name: 'Prisma', level: 'Intermediate' },
            { name: 'PostgreSQL', level: 'Intermediate' },
            { name: 'Docker', level: 'Intermediate' },
            { name: 'Redis', level: 'Intermediate' },
            { name: 'Git', level: 'Intermediate' },
            { name: 'Python', level: 'Intermediate' },
            { name: 'Django / Django REST Framework', level: 'Intermediate' },
            { name: 'Flask', level: 'Intermediate' },
            { name: 'React.js / Vue.js', level: 'Intermediate' },
            { name: 'WebSocket', level: 'Intermediate' },
          ],
        },
        experience: {
          create: [
            {
              company: 'ByteClouds',
              position: 'Junior PHP Developer',
              startDate: '2023-09',
              endDate: '2024-05',
              achievements:
                'Разработка административной панели для футбольной платформы на Laravel.Проектирование структуры базы данных. Работа с backend-логикой и пользовательскими сценариями. Работа с базой данных и проверка корректности работы приложения. Разработка адаптивного интерфейса с использованием Tabler.',
            },
            {
              company: 'Веб-студия CodeList',
              position: 'Frontend Developer',
              startDate: '2022-05',
              endDate: '2022-06',
              achievements:
                'Разработка международного сайта поддержки мигрантов на WordPress. Верстка и работа с контентом. Настройка базы данных. Проверка корректности работы отдельных элементов сайта.',
            },
            {
              company: 'Онлайн-школа программирования Bebrainee',
              position: 'Python Backend Developer',
              startDate: '2021-08',
              endDate: '2022-01',
              achievements:
                'Разработка социальной сети Memefeed на Python, Flask и PostgreSQL. Разработка сайта с кейсами Bulldrop на Django, DRF и PostgreSQL. Оптимизация SQL-запросов. Разработка социальной сети Places на Flask. Интеграция с API OpenStreetMap для конвертации адресов в координаты. Командная разработка нового сайта школы.',
            },
          ],
        },
        projects: {
          create: [
            {
              name: 'nikita-portfolio-api',
              description: 'Backend цифровой визитки на NestJS + GraphQL + Prisma',
              url: 'https://github.com/NikitaShuvalov/nikita-portfolio-api',
            },
            {
              name: 'Bebrainee.com',
              description: 'Командная разработка нового сайта школы на Python + Flask',
              url: 'https://github.com/bebrainee/bebrainee.com (private)',
            },
          ],
        },
      },
    });
    console.log('Seed completed.');
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/graphql`);
}

bootstrap();

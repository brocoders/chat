# Chat

## Цель
Создание простого в интеграции и развертывании чата

## Технические требования к проекту:
### Обязательно:
+ наличие бесплатного плана, низкая стоимость масштабирования
+ чат 1 на 1
+ груповой чат
+ статус сообщения (набирается, отправлен, доставлено, прочитано)
+ обмен файлами
+ Push notifications

### Желательно:
+ редактирование своих сообщений
+ удаление своих сообщений
+ офлайн доставка сообщений
+ SDK для мобильных платформ (React Nativ)

## Кого рассматривали:

### Низкоуровневые BaaS
- [Firebase](#firebase)
- [CloudBoost](#cloudboost)

### Высокоуровневые BaaS
- [Rocket Chat](#rocket-chat)
- [SendBird](#sendbird)
- [QuickBlox](#quickblox)
- [Twilio](#twilio)
- [Live Chat](#live-chat)
- [Kustomer](#kustomer)
- [TalkJS](#talkjs)
- [Zendesk Chat](#zendesk-chat)
- [Rave Chat](#rave-chat)

## Firebase
[Домашняя страница](https://firebase.google.com/)
+ Есть бесплатный тарифный план
+ Authentication
+ Real time database
+ Data storage

## CloudBoost
[Домашняя страница](https://cloudboost.io/)
+ План стартует от $79 в месяц
+ Authentication
+ Real time database
+ Data storage
+ Search
+ Relations

## Rocket Chat
[Домашняя страница](https://rocket.chat/)

## SendBird
[Домашняя страница](https://sendbird.com)
+ Есть бесплатный тарифный план до 25 открытых сессий, далее цена не прозрачна
+ чат 1 на 1
+ груповой чат
+ статус сообщения (набирается, отправлен, доставлено, прочитано)
+ обмен файлами
+ Push notifications
+ REST API
+ SDK для iOS, Android

[JS SDK](https://docs.sendbird.com/javascript)

## QuickBlox
[Домашняя страница](https://quickblox.com)<br/>
[Отчет](./doc/quickblox.md)
+ есть бесплатный тарифный план до 1000 пользователей;
+ чат 1 на 1;
+ груповой чат;
+ статус сообщения (набирается, отправлен, доставлено, прочитано);
+ редактирование и удаление своих сообщений;
+ Push notifications;
+ REST API;
+ SDK для iOS, Android, React Native, Flutter;
+ документация по React Native SDK, Flutter SDK;
+ [JavaScript SDK](https://github.com/QuickBlox/quickblox-javascript-sdk) с открытым исходным кодом (License Apache 2.0);
- пользователей нада создавать в сервисе ([QuickBlox dashboard](https://admin.quickblox.com/) or via API), проверка связки логин пароль происходин на строне сервиса;
- [нет TypeScript Definition и пока не планируются](https://github.com/QuickBlox/quickblox-javascript-sdk/issues/299)

[JS SDK](https://docs.quickblox.com/docs/js-quick-start)

## Twilio
[Домашняя страница](https://www.twilio.com)
[Guides](./doc/twilio.md)
+ есть бесплатный тарифный план до 200 клиентов каждый следующий $0.03;
+ чат 1 на 1;
+ груповой чат;
+ статус сообщения (набирается, отправлен, доставлено, прочитано);
+ обмен файлами;
+ Push notifications;
+ редактирование и удаление своих сообщений;
+ офлайн доставка сообщений;
+ REST API;
+ SDK для iOS, Android;
+ есть TypeScript Definition;
+ Пользователи создаются на лету (не нада регистрировать в сервисе, связку логин пароль сервис не контролирует);

[Features](https://www.twilio.com/chat/features);<br/>
[JS SDK](http://media.twiliocdn.com/sdk/js/chat/releases/3.3.4/docs/)<br/>

## Live Chat
[Домашняя страница](https://www.livechatinc.com/ru/)
+ План стартует от $19 за агента в месяц при ежемесячной оплате и $16 при годовой

## Kustomer
[Домашняя страница](https://www.kustomer.com)
+ План стартует от $99 за клиента в месяц

## TalkJS
[Домашняя страница](https://talkjs.com/)
+ План стартует от $59 в месяц
В наличии готовый виджеты кторые можно кастомизировать стилями

## Zendesk Chat
[Домашняя страница](https://www.zendesk.com/chat/)
+ План стартует от $5 в месяц за агента

## Rave Chat
[Домашняя страница](https://www.revechat.com/)
+ План стартует от $13.5 за агента в месяц
+ чат 1 на 1
+ Есть возможность совместной работы
  + навигации агента вместе с клиетом
  + подсветка и рисование
  + голосовой и видео чат

## Сыылки и дополнительные материалы
- [What is the best BaaS for a chat-based app?](https://www.quora.com/What-is-the-best-BaaS-for-a-chat-based-app)